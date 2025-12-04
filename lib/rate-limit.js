// Rate limiting utility with Vercel KV in production, Map fallback in dev

const isProduction = process.env.NODE_ENV === 'production';
let kvClient = null;

// In-memory fallback for development
const inMemoryStore = new Map();

async function initKV() {
  if (!isProduction || kvClient) return;
  
  try {
    const { kv } = await import('@vercel/kv');
    kvClient = kv;
    console.log('✓ Vercel KV initialized for rate limiting');
  } catch (error) {
    console.warn('⚠️ Vercel KV not available — using in-memory fallback for rate limiting');
    kvClient = null;
  }
}

// Initialize KV once at startup
initKV().catch(err => console.error('Failed to initialize KV:', err));

/**
 * Check rate limit for an identifier (email, IP, etc.)
 * Returns true if under limit, false if rate limited
 * 
 * Limits: 5 uploads per minute per email
 */
export async function checkRateLimit(identifier) {
  if (!identifier) {
    console.warn('Rate limit check called with no identifier');
    return false;
  }

  const now = Date.now();
  const key = `rate-limit:${identifier}`;
  const windowSeconds = 60;
  const maxAttempts = 5;

  try {
    if (kvClient) {
      // Production: use Vercel KV
      const attempts = await kvClient.get(key);
      let recentAttempts = [];

      if (attempts) {
        // Filter out attempts outside the window
        recentAttempts = attempts.filter(time => now - time < windowSeconds * 1000);
      }

      if (recentAttempts.length >= maxAttempts) {
        console.warn(`⚠️ Rate limit exceeded for ${identifier}: ${recentAttempts.length}/${maxAttempts} attempts`);
        return false;
      }

      recentAttempts.push(now);
      
      // Store with expiration (window + 1 second buffer)
      await kvClient.setex(key, windowSeconds + 1, recentAttempts);
      
      return true;
    } else {
      // Development: use in-memory Map
      if (!inMemoryStore.has(key)) {
        inMemoryStore.set(key, []);
      }

      const attempts = inMemoryStore.get(key);
      const recentAttempts = attempts.filter(time => now - time < windowSeconds * 1000);

      if (recentAttempts.length >= maxAttempts) {
        console.warn(`⚠️ Rate limit exceeded (dev) for ${identifier}: ${recentAttempts.length}/${maxAttempts} attempts`);
        return false;
      }

      recentAttempts.push(now);
      inMemoryStore.set(key, recentAttempts);

      return true;
    }
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // Fail open: if rate limiting service fails, allow request (prefer availability over perfect rate limiting)
    console.warn('⚠️ Rate limiting service failed — allowing request (fail-open)');
    return true;
  }
}

/**
 * Reset rate limit for an identifier (useful for testing or manual override)
 */
export async function resetRateLimit(identifier) {
  const key = `rate-limit:${identifier}`;

  try {
    if (kvClient) {
      await kvClient.del(key);
    } else {
      inMemoryStore.delete(key);
    }
    console.log(`✓ Rate limit reset for ${identifier}`);
  } catch (error) {
    console.error('Failed to reset rate limit:', error);
  }
}

/**
 * Get current attempt count for an identifier (useful for debugging)
 */
export async function getRateLimitStatus(identifier) {
  const key = `rate-limit:${identifier}`;
  const now = Date.now();
  const windowSeconds = 60;

  try {
    if (kvClient) {
      const attempts = await kvClient.get(key);
      if (!attempts) return { current: 0, max: 5, resetIn: 0 };

      const recentAttempts = attempts.filter(time => now - time < windowSeconds * 1000);
      return {
        current: recentAttempts.length,
        max: 5,
        resetIn: recentAttempts.length > 0 ? Math.ceil((windowSeconds * 1000 - (now - Math.min(...recentAttempts))) / 1000) : 0
      };
    } else {
      const attempts = inMemoryStore.get(key) || [];
      const recentAttempts = attempts.filter(time => now - time < windowSeconds * 1000);
      return {
        current: recentAttempts.length,
        max: 5,
        resetIn: recentAttempts.length > 0 ? Math.ceil((windowSeconds * 1000 - (now - Math.min(...recentAttempts))) / 1000) : 0
      };
    }
  } catch (error) {
    console.error('Failed to get rate limit status:', error);
    return { current: 0, max: 5, resetIn: 0, error: error.message };
  }
}
