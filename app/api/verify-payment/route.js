/**
 * CRITICAL SECURITY: Verify Stripe payment session with Stripe API
 * 
 * This endpoint validates that:
 * 1. session_id is a real Stripe checkout session
 * 2. Payment status is 'paid' (not 'unpaid' or 'no_payment_required')
 * 3. Payment amount is exactly £30 (3000 pence)
 * 4. Session was created recently (within 24 hours)
 * 
 * Without this verification, users could bypass payment by:
 * - Manually editing the URL to add ?session_id=fake_xxx
 * - Replaying old session IDs
 * - Modifying the payment amount
 */

import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const PRICE_PENCE = 3000; // £30.00 in pence
const SESSION_MAX_AGE_HOURS = 24;

// Lazy initialize Stripe client (only when needed, not at build time)
let stripe = null;

function getStripeClient() {
  if (!stripe) {
    if (!STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set!');
    }
    stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    });
  }
  return stripe;
}

/**
 * Verify the session with Stripe API
 * Returns { verified: boolean, reason?: string }
 */
async function verifyStripeSession(sessionId) {
  try {
    // 1. Check session ID format (Stripe session IDs start with 'cs_')
    if (!sessionId || typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
      console.warn(`Invalid session format: ${sessionId}`);
      return { verified: false, reason: 'Invalid session format' };
    }

    // 2. Retrieve session from Stripe API
    console.log(`Verifying Stripe session: ${sessionId}`);
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // 3. Check if payment was successful
    if (session.payment_status !== 'paid') {
      console.warn(`Payment not completed for session ${sessionId}: status = ${session.payment_status}`);
      return { verified: false, reason: `Payment status: ${session.payment_status}` };
    }

    // 4. Check payment amount is correct (£30 = 3000 pence)
    if (session.amount_total !== PRICE_PENCE) {
      console.error(`Wrong amount for session ${sessionId}: ${session.amount_total} pence (expected ${PRICE_PENCE})`);
      return { verified: false, reason: 'Payment amount incorrect' };
    }

    // 5. Check session is recent (within 24 hours)
    const sessionAge = (Date.now() / 1000) - session.created;
    const maxAge = SESSION_MAX_AGE_HOURS * 60 * 60;
    if (sessionAge > maxAge) {
      console.warn(`Session ${sessionId} is too old: ${Math.floor(sessionAge / 3600)} hours`);
      return { verified: false, reason: 'Session expired' };
    }

    // 6. All checks passed - payment is verified
    console.log(`✓ Payment verified for session ${sessionId}`);
    return { 
      verified: true,
      sessionData: {
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_email,
        payment_status: session.payment_status,
        created: session.created,
      }
    };
  } catch (error) {
    if (error.type === 'StripeInvalidRequestError') {
      console.warn(`Session not found: ${sessionId}`);
      return { verified: false, reason: 'Session not found' };
    }
    console.error('Stripe API error during verification:', error);
    return { verified: false, reason: 'Verification error' };
  }
}

/**
 * POST /api/verify-payment
 * Body: { sessionId: string }
 * Response: { verified: boolean, reason?: string, sessionData?: object }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return Response.json(
        { verified: false, reason: 'Missing session_id' },
        { status: 400 }
      );
    }

    const result = await verifyStripeSession(sessionId);

    if (!result.verified) {
      // Payment verification failed - deny access
      return Response.json(
        { verified: false, reason: result.reason },
        { status: 403 }
      );
    }

    // Payment verified - allow access
    return Response.json({ 
      verified: true, 
      sessionId,
      ...result.sessionData
    });
  } catch (error) {
    console.error('Payment verification endpoint error:', error);
    return Response.json(
      { verified: false, reason: 'Server error during verification' },
      { status: 500 }
    );
  }
}
