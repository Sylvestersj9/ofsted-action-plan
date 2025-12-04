/**
 * Database service for tracking payments and uploads
 * This prevents:
 * - Payment session reuse (one payment = one upload)
 * - Duplicate billing
 * - Lost payment records
 * 
 * In production, replace with Vercel Postgres or Supabase
 * For now, using in-memory with persistence notes
 */

// In-memory store (replace with real database in production)
const payments = new Map();
const uploads = new Map();

/**
 * Record a payment verification in database
 * Call this BEFORE processing upload
 */
export async function recordPayment(sessionId, email) {
  // Check if session was already used
  if (payments.has(sessionId)) {
    const existing = payments.get(sessionId);
    if (existing.uploadedAt) {
      return {
        success: false,
        error: 'This payment session has already been used for an upload',
        reason: 'SESSION_ALREADY_USED'
      };
    }
  }

  // Record payment
  payments.set(sessionId, {
    sessionId,
    email,
    verifiedAt: new Date().toISOString(),
    uploadedAt: null,
    reportSentAt: null,
  });

  return {
    success: true,
    message: 'Payment recorded',
    sessionId
  };
}

/**
 * Mark payment as used (after successful upload)
 */
export async function markPaymentAsUsed(sessionId) {
  if (!payments.has(sessionId)) {
    return { success: false, error: 'Payment not found' };
  }

  const payment = payments.get(sessionId);
  payment.uploadedAt = new Date().toISOString();
  
  return { success: true };
}

/**
 * Mark payment as complete (after email sent)
 */
export async function markPaymentComplete(sessionId) {
  if (!payments.has(sessionId)) {
    return { success: false, error: 'Payment not found' };
  }

  const payment = payments.get(sessionId);
  payment.reportSentAt = new Date().toISOString();
  
  return { success: true };
}

/**
 * Get payment record
 */
export async function getPaymentRecord(sessionId) {
  return payments.get(sessionId) || null;
}

/**
 * Record an upload attempt
 */
export async function recordUpload(sessionId, email, filename, fileSize) {
  const id = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  uploads.set(id, {
    id,
    sessionId,
    email,
    filename,
    fileSize,
    createdAt: new Date().toISOString(),
    status: 'processing', // processing, success, failed
    error: null,
  });

  return id;
}

/**
 * Update upload status
 */
export async function updateUploadStatus(uploadId, status, error = null) {
  if (!uploads.has(uploadId)) {
    return { success: false, error: 'Upload not found' };
  }

  const upload = uploads.get(uploadId);
  upload.status = status;
  upload.error = error;
  upload.updatedAt = new Date().toISOString();

  return { success: true };
}

/**
 * Get upload record
 */
export async function getUploadRecord(uploadId) {
  return uploads.get(uploadId) || null;
}

/**
 * Validate payment can be used
 */
export async function validatePaymentUsage(sessionId, email) {
  const payment = payments.get(sessionId);

  if (!payment) {
    return {
      valid: false,
      reason: 'Payment not found in records',
      code: 'PAYMENT_NOT_FOUND'
    };
  }

  if (payment.email !== email) {
    return {
      valid: false,
      reason: 'Payment email does not match upload email',
      code: 'EMAIL_MISMATCH'
    };
  }

  if (payment.uploadedAt) {
    return {
      valid: false,
      reason: 'This payment has already been used for an upload',
      code: 'PAYMENT_ALREADY_USED'
    };
  }

  return {
    valid: true,
    payment
  };
}

/**
 * IMPORTANT: In production, replace this with real database
 * 
 * Recommended: Vercel Postgres
 * Schema:
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
 *
 * CREATE INDEX idx_payments_email ON payments(email);
 * CREATE INDEX idx_uploads_session_id ON uploads(session_id);
 */
