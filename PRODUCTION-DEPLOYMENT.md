# 🚀 Production Deployment Guide

**Status:** App is production-ready. Follow these steps to deploy to Vercel with full security hardening.

---

## Prerequisites

- ✅ API keys rotated (see `SECURITY-KEY-ROTATION.md`)
- ✅ Build passes locally (`npm run build`)
- ✅ Dev server works (`npm run dev`)
- ✅ GitHub repository up to date

---

## Step 1: Provision Vercel Postgres

### 1.1 Create Vercel Account (if needed)

Go to [vercel.com](https://vercel.com) and sign up.

### 1.2 Create Storage: Postgres

1. Go to **Vercel Dashboard** → your project (or create new).
2. Click **Storage** tab.
3. Click **Create Database** → **Postgres**.
4. Choose:
   - **Name:** `ofsted_action_plan`
   - **Region:** Closest to your users
5. Click **Create**.

### 1.3 Copy Connection String

1. After creation, you'll see a `.env.local` snippet like:
   ```
   POSTGRES_PRISMA_URL=postgresql://user:pass@host:5432/dbname?sslmode=require&schema=...
   POSTGRES_URL_NON_POOLING=postgresql://user:pass@host:5432/dbname?sslmode=require
   ```
2. Copy the **`POSTGRES_PRISMA_URL`** value.
3. Add to your `.env.local` as:
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/dbname?sslmode=require&schema=...
   ```

### 1.4 Run Migrations Locally

```bash
export DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"
npm run migrate
```

**Expected output:**
```
✓ Running migration: migrations/001_init.sql
✓ Running migration: migrations/002_add_is_free.sql
✓ Migrations complete
```

---

## Step 2: Provision Vercel KV (Rate Limiting)

### 2.1 Create KV Database

1. Go to **Vercel Dashboard** → **Storage** → **Create Database** → **KV**.
2. Name it: `ofsted-rate-limit`
3. Choose **Region:** same as Postgres (for latency).
4. Click **Create**.

### 2.2 Auto-linked to Project

Vercel automatically adds `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` to your project environment. These are used by `@vercel/kv` client automatically.

✅ **No additional setup needed** — `lib/rate-limit.js` will detect and use KV in production.

---

## Step 3: Set Environment Variables in Vercel

### 3.1 Go to Project Settings

1. **Vercel Dashboard** → Select your project.
2. Click **Settings** → **Environment Variables**.

### 3.2 Add Required Variables

| Variable | Value | Source |
|----------|-------|--------|
| `DATABASE_URL` | From Postgres setup | Vercel Storage |
| `GEMINI_API_KEY` | Your new Google API key | Google Cloud Console |
| `RESEND_API_KEY` | Your new Resend API key | Resend Dashboard |
| `FROM_EMAIL` | `reports@ziantra.co.uk` | Your email provider |
| `STRIPE_SECRET_KEY` | Your Stripe secret key | Stripe Dashboard |
| `STRIPE_WEBHOOK_SECRET` | Your Stripe webhook secret | Stripe Dashboard (Webhooks) |
| `NODE_ENV` | `production` | (Optional, Vercel sets this) |

**Steps for each variable:**

1. Click **Add New** → **Add New Environment Variable**.
2. Paste the key name and value.
3. Select scopes: **Production**, **Preview**, **Development** (as needed).
4. Click **Save**.

### 3.3 Verify All Variables

Click **Environment Variables** again to confirm all are set. Green checkmarks = ✓ set.

---

## Step 4: Deploy to Vercel

### 4.1 Push Code to GitHub

```bash
cd /Users/sylvesterjanve/ofsted-action-plan
git add -A
git commit -m "Production: hardened Stripe verification, freemium flow, rate limiting with KV"
git push origin main
```

### 4.2 Connect GitHub to Vercel

1. **Vercel Dashboard** → **New Project** → **Import Git Repository**.
2. Select your `ofsted-action-plan` repository.
3. Configure project:
   - **Framework:** Next.js (auto-detected)
   - **Root Directory:** `.` (default)
   - **Build Command:** `npm run build` (default)
4. Click **Deploy**.

**Vercel will:**
- Detect environment variables you set.
- Run `npm run build`.
- Deploy to `https://<your-project>.vercel.app`.

### 4.3 Monitor Deployment

- Wait for build to complete (usually 2–5 minutes).
- If build fails, check **Deployments** tab for logs.

---

## Step 5: Run Migrations on Production DB

Once deployed:

```bash
# Export production DATABASE_URL (from Vercel)
export DATABASE_URL="postgresql://user:pass@prod-host:5432/dbname?sslmode=require"

# Run migrations
npm run migrate
```

**Output should show:**
```
✓ Running migration: migrations/001_init.sql
✓ Running migration: migrations/002_add_is_free.sql
✓ Migrations complete
```

---

## Step 6: Verify Production Deployment

### 6.1 Test Homepage

Visit `https://<your-project>.vercel.app` — you should see the OFSTED Action Plan homepage.

### 6.2 Test Upload (First Free Report)

1. Go to **/upload** page.
2. Upload a test OFSTED PDF:
   - **Email:** test@example.com
   - **Home Name:** Test Home
   - **File:** any OFSTED PDF
3. You should receive an email (check spam folder).
4. Upload should show as **free** in Postgres (`is_free = true`).

### 6.3 Test Payment (Second Report)

1. Go back to **/upload**.
2. Try uploading again with the same email → should ask for payment.
3. Complete Stripe payment (test mode).
4. Upload should succeed with `is_free = false`.

### 6.4 Check Logs

- **Vercel** → **Deployments** → **Latest** → **Logs** → search for "Upload API called" to verify requests.

---

## Step 7: Set Up Stripe Webhooks (if not done)

### 7.1 Go to Stripe Dashboard

1. Navigate to [dashboard.stripe.com](https://dashboard.stripe.com).
2. Go to **Developers** → **Webhooks**.

### 7.2 Add Endpoint

1. Click **Add endpoint**.
2. **URL:** `https://<your-project>.vercel.app/api/webhooks/stripe`
3. **Events to send:** Select:
   - `checkout.session.completed`
   - `charge.failed`
   - `charge.refunded`
4. Click **Add endpoint**.

### 7.3 Copy Signing Secret

1. Find the webhook you just created.
2. Click **Reveal** to show the signing secret.
3. Copy it (format: `whsec_...`).
4. Add to Vercel environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

---

## Step 8: Monitor & Maintain

### 8.1 Check Logs

- **Vercel Logs:** Deployments → Logs (runtime errors).
- **Postgres:** Vercel Dashboard → Storage → Postgres → Query stats.
- **KV Usage:** Vercel Dashboard → Storage → KV → Overview.

### 8.2 Track Payments & Uploads

```sql
-- Check uploaded reports
SELECT email, is_free, created_at FROM uploads ORDER BY created_at DESC LIMIT 10;

-- Check payment records
SELECT * FROM payments WHERE status = 'completed' ORDER BY created_at DESC LIMIT 10;
```

### 8.3 Enable Email Alerts (Optional)

In Vercel, go to **Settings** → **Notifications** → enable alerts for failed deployments and runtime errors.

---

## Troubleshooting

### Build Fails

1. Check **Deployments** → **Latest** → **Logs**.
2. Common issues:
   - Missing environment variables → add to Vercel Settings.
   - `@vercel/kv` not installed → run `npm install @vercel/kv`.
   - TypeScript errors → check `app/api/upload/route.js` for syntax.

### Rate Limiting Not Working

- Check KV is created in Vercel Storage.
- Verify environment variables are set in Vercel.
- Check logs for KV connection errors.

### Uploads Failing

1. Check email is being received (check spam folder).
2. Verify Gemini API key is valid.
3. Verify Stripe webhook is configured.
4. Check Postgres connection: run `npm run migrate` to test DB access.

### Payment Verification Failing

1. Verify `STRIPE_SECRET_KEY` is set in Vercel.
2. Check Stripe webhook secret is correct.
3. View logs: look for "Payment verification failed".

---

## Rollback Plan

If production has critical issues:

1. **Vercel** → **Deployments** → click previous working deployment → **Redeploy**.
2. Or, revert Git commit and push: `git revert <commit-hash> && git push`.

---

## Security Checklist

- [ ] Database URL rotated and set in Vercel (not in `.env.local`).
- [ ] All API keys rotated (see `SECURITY-KEY-ROTATION.md`).
- [ ] Stripe webhook secret configured.
- [ ] Rate limiting enabled (Vercel KV).
- [ ] Payment verification working (test with payment).
- [ ] Logs enabled and monitored.
- [ ] HTTPS enforced (Vercel default).

---

## Next Steps

1. ✅ Set up Postgres + KV.
2. ✅ Deploy to Vercel.
3. ✅ Test end-to-end flow.
4. ✅ Monitor for 24 hours (check logs, payment processing).
5. ✅ Scale: monitor KV and Postgres usage; upgrade if needed.

---

**Last updated:** 4 December 2025
