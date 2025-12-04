# 🚨 IMMEDIATE ACTIONS REQUIRED BEFORE LAUNCH

## Priority 1: API Keys Revocation (CRITICAL - DO NOW)

### Step 1: Revoke GEMINI_API_KEY
1. Go to https://console.cloud.google.com/
2. Search for "API credentials" or go to project settings
3. Find and DELETE the API key: `AIzaSyCIIsgPtiGlS_6btg6RYKcgfUd-AYSpiGM`
4. Create a new API key
5. Copy the new key
6. Update `.env.local`: Replace GEMINI_API_KEY value with new key

### Step 2: Revoke RESEND_API_KEY  
1. Go to https://resend.com/api-keys
2. Find and DELETE the API key: `re_i9EYY36q_3h51se7ULyetXn2kL5wySD45`
3. Create a new API key
4. Copy the new key
5. Update `.env.local`: Replace RESEND_API_KEY value with new key

### Step 3: Verify .env.local is Updated
```bash
cat .env.local
```

Should show NEW keys, not the exposed ones above.

---

## Priority 2: Configure Stripe Webhook (REQUIRED)

### In Stripe Dashboard:
1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add an endpoint"
3. Endpoint URL: `https://your-vercel-domain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `charge.failed`
   - `charge.refunded`
5. Copy the "Signing secret" (starts with `whsec_`)
6. In Vercel project settings → Environment Variables → Add new:
   - Name: `STRIPE_WEBHOOK_SECRET`
   - Value: (paste the signing secret)
7. Redeploy

---

## Priority 3: Test the Payment Flow

### Local Testing:
1. Server running: `npm run dev` (should already be running)
2. Open http://localhost:3000 in browser
3. Click "Buy Now" or pricing button
4. Complete Stripe payment (use test card: 4242 4242 4242 4242)
5. Should redirect to /upload page
6. Upload a PDF (can be any PDF)
7. Check email inbox for report
8. Verify payment was recorded (check server logs)

### What Should Happen:
- ✅ Payment verified with Stripe API
- ✅ Payment recorded to database
- ✅ PDF validated as OFSTED report
- ✅ AI analysis generated
- ✅ Email sent to user
- ✅ Payment marked as used
- ✅ Second upload attempt should fail (session reused)

---

## Priority 4: Database Migration (BEFORE GOING TO PRODUCTION)

### Current State:
- Using in-memory JavaScript Map (resets on every deployment)
- Will lose all payment/upload records on redeploy

### For Production:
**Option A: Vercel Postgres (Recommended)**
1. In Vercel Dashboard → Storage → Create Database → Postgres
2. Copy the connection string
3. Run migration script in `/lib/db.js` (SQL schema in comments)
4. Update `/lib/db.js` to use `@vercel/postgres` instead of Map

**Option B: Supabase**
1. Go to https://supabase.com
2. Create new project
3. Run SQL schema from `/lib/db.js` comments
4. Get connection string
5. Update `/lib/db.js`

---

## Priority 5: Rate Limiting Migration (BEFORE GOING TO PRODUCTION)

### Current State:
- In-memory Map (resets per request on Vercel's serverless)
- Only works during development

### For Production:
**Option A: Vercel KV (Easiest)**
```bash
npm install @vercel/kv
```
Then in Vercel Dashboard: Storage → Create KV Database

**Option B: Upstash**
1. Go to https://upstash.com
2. Create Redis database
3. Copy connection details
4. Install: `npm install @upstash/redis`
5. Update rate limiting in `/app/api/upload/route.js`

---

## Verification Checklist

- [ ] GEMINI_API_KEY revoked and new key in `.env.local`
- [ ] RESEND_API_KEY revoked and new key in `.env.local`
- [ ] STRIPE_WEBHOOK_SECRET set in Vercel environment
- [ ] Payment flow tested end-to-end
- [ ] Database migration plan completed
- [ ] Rate limiting migration plan completed
- [ ] Server logs show no errors on startup
- [ ] Build succeeds: `npm run build`
- [ ] All pages load: http://localhost:3000

---

## Launch Readiness

### ✅ DONE (Security Fixes)
- Real Stripe payment verification
- Payment session validation (prevents reuse)
- PDF content validation
- Database audit trail
- Webhook infrastructure
- Environment validation system

### ⚠️ IN PROGRESS (Your Action)
- API keys revocation
- Stripe webhook configuration
- Database setup
- Rate limiting replacement

### ❌ NOT DONE (Nice to have)
- Email retry logic
- Error monitoring (Sentry)
- Analytics dashboard

---

## Questions?

If something doesn't work:
1. Check server logs: Look at terminal where you ran `npm run dev`
2. Check browser console: Press F12 in browser, click Console tab
3. Check .env.local: Verify all keys are present
4. Verify Stripe account: Log in and check webhook status
5. Test with simple PDF: Not all PDFs are valid OFSTED reports

---

**Current Status:** 🟡 SECURITY READY - Awaiting environment configuration and testing

Last updated: This session
