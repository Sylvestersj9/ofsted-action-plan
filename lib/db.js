/**
 * Database service for tracking payments and uploads
 * Supports two modes:
 * 1) If `process.env.DATABASE_URL` is present, uses Postgres via `pg`.
 * 2) Fallback to in-memory Maps for development.
 *
 * This lets local dev continue to work while production uses a real DB.
 */

let pgPool = null;
let usePostgres = false;

if (process.env.DATABASE_URL) {
  try {
    // Lazy require to avoid adding pg at build time if not needed
    const { Pool } = require('pg');
    pgPool = new Pool({ connectionString: process.env.DATABASE_URL });
    usePostgres = true;
    console.log('DB: Using Postgres via DATABASE_URL');
  } catch (err) {
    console.warn('DB: Could not initialize pg Pool, falling back to in-memory store', err.message);
    usePostgres = false;
  }
}

// In-memory fallback
const payments = new Map();
const uploads = new Map();

async function query(text, params) {
  if (!usePostgres || !pgPool) {
    throw new Error('Postgres not configured');
  }
  const res = await pgPool.query(text, params);
  return res;
}

/**
 * Record a payment verification
 */
export async function recordPayment(sessionId, email) {
  if (usePostgres) {
    // Upsert payment record
    const sql = `INSERT INTO payments(session_id, email, verified_at)
                 VALUES ($1, $2, NOW())
                 ON CONFLICT (session_id) DO UPDATE SET email = EXCLUDED.email RETURNING session_id`; 
    await query(sql, [sessionId, email]);
    return { success: true, sessionId };
  }

  // In-memory
  if (payments.has(sessionId)) {
    const existing = payments.get(sessionId);
    if (existing.uploadedAt) {
      return { success: false, error: 'This payment session has already been used for an upload', reason: 'SESSION_ALREADY_USED' };
    }
  }
  payments.set(sessionId, { sessionId, email, verifiedAt: new Date().toISOString(), uploadedAt: null, reportSentAt: null });
  return { success: true, sessionId };
}

/**
 * Mark payment as used (after successful upload)
 */
export async function markPaymentAsUsed(sessionId) {
  if (usePostgres) {
    await query('UPDATE payments SET uploaded_at = NOW() WHERE session_id = $1', [sessionId]);
    return { success: true };
  }
  if (!payments.has(sessionId)) return { success: false, error: 'Payment not found' };
  const payment = payments.get(sessionId);
  payment.uploadedAt = new Date().toISOString();
  return { success: true };
}

/**
 * Mark payment as complete (after email sent)
 */
export async function markPaymentComplete(sessionId) {
  if (usePostgres) {
    await query('UPDATE payments SET report_sent_at = NOW() WHERE session_id = $1', [sessionId]);
    return { success: true };
  }
  if (!payments.has(sessionId)) return { success: false, error: 'Payment not found' };
  const payment = payments.get(sessionId);
  payment.reportSentAt = new Date().toISOString();
  return { success: true };
}

export async function getPaymentRecord(sessionId) {
  if (usePostgres) {
    const res = await query('SELECT * FROM payments WHERE session_id = $1', [sessionId]);
    return res.rows[0] || null;
  }
  return payments.get(sessionId) || null;
}

/**
 * Record an upload attempt
 */
export async function recordUpload(sessionId, email, filename, fileSize) {
  // accept optional isFree parameter via last arg if provided
  const args = Array.from(arguments);
  let isFree = false;
  if (args.length >= 5) isFree = !!args[4];

  if (usePostgres) {
    const id = `upload_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;
    await query(`INSERT INTO uploads(id, session_id, email, filename, file_size, status, is_free, created_at)
                 VALUES($1,$2,$3,$4,$5,'processing',$6,NOW())`, [id, sessionId, email, filename, fileSize, isFree]);
    return id;
  }
  const id = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  uploads.set(id, { id, sessionId, email, filename, fileSize, createdAt: new Date().toISOString(), status: 'processing', error: null, isFree });
  return id;
}

/**
 * Count uploads by email (used to determine first-time free eligibility)
 */
export async function countUploadsByEmail(email) {
  if (usePostgres) {
    const res = await query('SELECT COUNT(1) as cnt FROM uploads WHERE email = $1', [email]);
    return parseInt(res.rows[0]?.cnt || '0', 10);
  }
  let count = 0;
  for (const [, up] of uploads) {
    if (up.email === email) count++;
  }
  return count;
}

export async function updateUploadStatus(uploadId, status, error = null) {
  if (usePostgres) {
    await query('UPDATE uploads SET status = $1, error = $2, updated_at = NOW() WHERE id = $3', [status, error, uploadId]);
    return { success: true };
  }
  if (!uploads.has(uploadId)) return { success: false, error: 'Upload not found' };
  const upload = uploads.get(uploadId);
  upload.status = status; upload.error = error; upload.updatedAt = new Date().toISOString();
  return { success: true };
}

export async function getUploadRecord(uploadId) {
  if (usePostgres) {
    const res = await query('SELECT * FROM uploads WHERE id = $1', [uploadId]);
    return res.rows[0] || null;
  }
  return uploads.get(uploadId) || null;
}

export async function validatePaymentUsage(sessionId, email) {
  if (usePostgres) {
    const res = await query('SELECT * FROM payments WHERE session_id = $1', [sessionId]);
    const payment = res.rows[0];
    if (!payment) return { valid: false, reason: 'Payment not found', code: 'PAYMENT_NOT_FOUND' };
    if (payment.email !== email) return { valid: false, reason: 'Payment email does not match upload email', code: 'EMAIL_MISMATCH' };
    if (payment.uploaded_at) return { valid: false, reason: 'This payment has already been used for an upload', code: 'PAYMENT_ALREADY_USED' };
    return { valid: true, payment };
  }

  const payment = payments.get(sessionId);
  if (!payment) return { valid: false, reason: 'Payment not found in records', code: 'PAYMENT_NOT_FOUND' };
  if (payment.email !== email) return { valid: false, reason: 'Payment email does not match upload email', code: 'EMAIL_MISMATCH' };
  if (payment.uploadedAt) return { valid: false, reason: 'This payment has already been used for an upload', code: 'PAYMENT_ALREADY_USED' };
  return { valid: true, payment };
}

/**
 * Production migration notes (Postgres schema)
 *
 * CREATE TABLE payments (
 *   session_id TEXT PRIMARY KEY,
 *   email TEXT NOT NULL,
 *   verified_at TIMESTAMP NOT NULL,
 *   uploaded_at TIMESTAMP,
 *   report_sent_at TIMESTAMP,
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 *
 * CREATE TABLE uploads (
 *   id TEXT PRIMARY KEY,
 *   session_id TEXT REFERENCES payments(session_id),
 *   email TEXT NOT NULL,
 *   filename TEXT NOT NULL,
 *   file_size INT NOT NULL,
 *   status TEXT DEFAULT 'processing',
 *   error TEXT,
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   updated_at TIMESTAMP
 * );
 */
