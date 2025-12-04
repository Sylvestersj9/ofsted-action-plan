/**
 * Stripe Webhook Endpoint
 * POST /api/webhooks/stripe
 * 
 * Receives events from Stripe and processes them
 * Requires STRIPE_WEBHOOK_SECRET to be set in environment
 */

import { verifyWebhookSignature, handleStripeWebhook } from '@/lib/stripe-webhooks';

export async function POST(request) {
  try {
    // Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('Webhook request missing stripe-signature header');
      return Response.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const event = verifyWebhookSignature(body, signature);
    
    if (!event) {
      console.error('Webhook signature verification failed');
      return Response.json(
        { error: 'Webhook signature verification failed' },
        { status: 403 }
      );
    }

    console.log(`Processing webhook: ${event.type}`);

    // Handle the webhook event
    const result = await handleStripeWebhook(event);

    // Always return 200 to acknowledge receipt (per Stripe docs)
    return Response.json({
      received: true,
      eventType: event.type,
      result
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    // Still return 200 but log the error
    // This prevents Stripe from retrying indefinitely
    return Response.json(
      { error: 'Webhook processing failed', details: error.message },
      { status: 200 } // Important: still 200
    );
  }
}

/**
 * GET endpoint for testing
 * Returns webhook configuration status
 */
export async function GET() {
  const hasSecret = !!process.env.STRIPE_WEBHOOK_SECRET;
  
  return Response.json({
    webhook: 'Stripe',
    url: '/api/webhooks/stripe',
    configured: hasSecret,
    status: hasSecret ? 'Ready' : 'Not configured - STRIPE_WEBHOOK_SECRET missing',
  });
}
