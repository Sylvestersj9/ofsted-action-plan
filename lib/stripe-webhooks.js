/**
 * Stripe Webhook Handler
 * 
 * Listens for Stripe events and records them
 * Currently logs events - in production, should:
 * 1. Store in database
 * 2. Send confirmation emails
 * 3. Handle failed payments
 * 4. Reconcile with upload records
 */

import Stripe from 'stripe';

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!STRIPE_WEBHOOK_SECRET) {
  console.warn('STRIPE_WEBHOOK_SECRET not configured. Webhooks will not be verified.');
}

// Lazy-load Stripe client to avoid initialization errors at build time
let stripe = null;

function getStripeClient() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    });
  }
  return stripe;
}

/**
 * Verify webhook signature from Stripe
 */
export function verifyWebhookSignature(body, signature) {
  if (!STRIPE_WEBHOOK_SECRET) {
    console.warn('Cannot verify webhook - STRIPE_WEBHOOK_SECRET not set');
    return null;
  }

  try {
    const stripeClient = getStripeClient();
    if (!stripeClient) {
      console.error('Stripe client not initialized - STRIPE_SECRET_KEY missing');
      return null;
    }
    return stripeClient.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return null;
  }
}

/**
 * Handle checkout.session.completed event
 * User paid and was redirected to /upload
 */
export async function handleCheckoutComplete(event) {
  const session = event.data.object;

  console.log(`✓ Payment completed: ${session.id}`);
  console.log(`  Amount: ${session.amount_total / 100} ${session.currency.toUpperCase()}`);
  console.log(`  Customer: ${session.customer_email}`);

  // In production:
  // 1. Store in database: { session_id, email, amount, timestamp, status: 'paid' }
  // 2. Send confirmation email to customer
  // 3. Create payment record
  // 4. Set payment as "available for use"

  return {
    processed: true,
    sessionId: session.id,
    email: session.customer_email,
    amount: session.amount_total,
  };
}

/**
 * Handle charge.failed event
 * Payment was declined/failed
 */
export async function handleChargeFailed(event) {
  const charge = event.data.object;

  console.error(`❌ Payment failed: ${charge.id}`);
  console.error(`  Amount: ${charge.amount / 100} ${charge.currency.toUpperCase()}`);
  console.error(`  Reason: ${charge.failure_message}`);
  console.error(`  Email: ${charge.billing_details?.email}`);

  // In production:
  // 1. Log failure in database
  // 2. Send failure notification to customer
  // 3. Trigger admin alert if pattern detected

  return {
    processed: true,
    chargeId: charge.id,
    failureReason: charge.failure_message,
  };
}

/**
 * Handle charge.refunded event
 * Customer requested refund
 */
export async function handleChargeRefunded(event) {
  const charge = event.data.object;

  console.log(`⚠️  Charge refunded: ${charge.id}`);
  console.log(`  Amount refunded: ${charge.amount_refunded / 100} ${charge.currency.toUpperCase()}`);

  // In production:
  // 1. Update payment status: 'refunded'
  // 2. Disable any pending uploads from this payment
  // 3. Send refund confirmation to customer
  // 4. Log for accounting

  return {
    processed: true,
    chargeId: charge.id,
    amountRefunded: charge.amount_refunded,
  };
}

/**
 * Main webhook handler
 * POST /api/webhooks/stripe
 */
export async function handleStripeWebhook(event) {
  console.log(`Webhook received: ${event.type}`);

  switch (event.type) {
    case 'checkout.session.completed':
      return await handleCheckoutComplete(event);

    case 'charge.failed':
      return await handleChargeFailed(event);

    case 'charge.refunded':
      return await handleChargeRefunded(event);

    default:
      console.log(`Unhandled event type: ${event.type}`);
      return { processed: false, reason: 'Unhandled event type' };
  }
}
