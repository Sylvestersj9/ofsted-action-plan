# ✅ Pre-Deployment Checklist

Use this checklist before deploying to production.

---

## 🔐 Security (CRITICAL)

- [ ] **API Keys Rotated**
  - [ ] Revoked old `GEMINI_API_KEY` in Google Cloud Console
  - [ ] Created new Gemini API key and added to `.env.local`
  - [ ] Revoked old `RESEND_API_KEY` in Resend Dashboard
  - [ ] Created new Resend API key and added to `.env.local`
  - [ ] Verified `STRIPE_SECRET_KEY` is not exposed
  - [ ] Verified `.env.local` is in `.gitignore` (never commit secrets)

- [ ] **Database Security**
  - [ ] Postgres database created in Vercel
  - [ ] `DATABASE_URL` connection string added to `.env.local`
  - [ ] Migrations run locally: `npm run migrate` ✓
  - [ ] Verified tables exist: `payments`, `uploads`, `migrations`
  - [ ] Database user has minimal required permissions (not admin)

- [ ] **Stripe Security**
  - [ ] `STRIPE_SECRET_KEY` is set in Vercel environment
  - [ ] `STRIPE_WEBHOOK_SECRET` is set in Vercel environment
  - [ ] Webhook endpoint configured: `/api/webhooks/stripe`
  - [ ] Webhook signing verified in code: `lib/stripe-webhooks.js`
  - [ ] Test mode keys are in use (not live keys yet)

- [ ] **Rate Limiting**
  - [ ] Vercel KV database created
  - [ ] `@vercel/kv` package installed: `npm ls @vercel/kv` ✓
  - [ ] `lib/rate-limit.js` implemented
  - [ ] Upload route uses `checkRateLimit` with async/await

---

## 🏗️ Code Quality

- [ ] **Build Passes**
  - [ ] `npm run build` succeeds locally
  - [ ] No TypeScript errors
  - [ ] No ESLint errors or warnings
  - [ ] All imports resolve correctly

- [ ] **Tests Pass** (if applicable)
  - [ ] Unit tests: `npm run test` (if set up)
  - [ ] No console errors in dev server: `npm run dev` ✓

- [ ] **Code Review**
  - [ ] Payment verification is server-side (not client-side)
  - [ ] Session reuse prevention implemented: `validatePaymentUsage`
  - [ ] PDF validation before AI: `validateOFSTEDReport` ✓
  - [ ] Error handling and logging present
  - [ ] No hardcoded secrets or API keys in code

---

## 📋 Feature Completeness

- [ ] **Freemium Flow**
  - [ ] First report is free: `countUploadsByEmail` logic ✓
  - [ ] Subsequent reports require payment
  - [ ] `is_free` flag recorded in database

- [ ] **Payment Processing**
  - [ ] Stripe Checkout creates sessions
  - [ ] `/api/verify-payment` validates session status
  - [ ] Payment recorded to database
  - [ ] Session marked as used after successful upload

- [ ] **Email Delivery**
  - [ ] Resend API key is valid
  - [ ] Action plan generated and formatted
  - [ ] Email template sends successfully
  - [ ] `FROM_EMAIL` is verified with Resend

- [ ] **API Endpoints**
  - [ ] `/api/upload` — handles file upload and analysis
  - [ ] `/api/verify-payment` — validates Stripe payment
  - [ ] `/api/webhooks/stripe` — processes Stripe events
  - [ ] All endpoints return proper HTTP status codes

---

## 🌐 Vercel Configuration

- [ ] **Project Created**
  - [ ] GitHub repository connected
  - [ ] Project name set correctly
  - [ ] Vercel account has billing enabled (for future scaling)

- [ ] **Environment Variables Set**
  - [ ] `DATABASE_URL` ✓
  - [ ] `GEMINI_API_KEY` ✓
  - [ ] `RESEND_API_KEY` ✓
  - [ ] `FROM_EMAIL` ✓
  - [ ] `STRIPE_SECRET_KEY` ✓
  - [ ] `STRIPE_WEBHOOK_SECRET` ✓
  - [ ] All variables set for **Production** scope

- [ ] **Git Repository**
  - [ ] All changes committed: `git status` shows clean
  - [ ] Latest code pushed: `git push origin main` ✓
  - [ ] No uncommitted secrets in `.env.local`

---

## 🧪 Pre-Deployment Testing (Local)

- [ ] **Homepage Test**
  - [ ] `npm run dev` starts server without errors
  - [ ] Homepage loads: `http://localhost:3000`
  - [ ] Navigation works (links, buttons, demo)

- [ ] **Upload Flow Test (Dev)**
  - [ ] Go to `/upload` page
  - [ ] Upload first OFSTED PDF with test email
  - [ ] Check email received (mark as free)
  - [ ] Try uploading second PDF (should ask for payment)

- [ ] **Error Handling**
  - [ ] Invalid file rejection works (not PDF, too small, etc.)
  - [ ] Rate limiting works (submit 6 uploads rapidly → 429 error)
  - [ ] Missing fields validation works

---

## 📊 Post-Deployment Testing

- [ ] **Deployment Successful**
  - [ ] Vercel deployment completed without errors
  - [ ] Production URL: `https://<project>.vercel.app` loads

- [ ] **Production Smoke Tests**
  - [ ] Homepage loads at production URL
  - [ ] `/upload` page accessible
  - [ ] `/api/upload` endpoint reachable
  - [ ] Logs visible in Vercel dashboard

- [ ] **Database Connection**
  - [ ] Run migrations on production DB: `npm run migrate`
  - [ ] Verify tables created: query Postgres

- [ ] **Payment Flow Test (Test Mode)**
  - [ ] Create Stripe test payment in Stripe Dashboard
  - [ ] Upload first report (free) — verify `is_free = true` in DB
  - [ ] Upload second report (paid) — verify payment recorded
  - [ ] Webhook processed correctly (check logs)

- [ ] **Email Delivery Test**
  - [ ] Verify email received after first upload
  - [ ] Check email contains action plan
  - [ ] Check email sender is `reports@ziantra.co.uk`

---

## 🔍 Monitoring & Alerts

- [ ] **Vercel Logs**
  - [ ] Check Deployments → Logs for errors
  - [ ] Enable notifications for failed deployments

- [ ] **Database Monitoring**
  - [ ] Check Postgres usage in Vercel Storage
  - [ ] Verify no slow queries

- [ ] **KV Monitoring**
  - [ ] Check KV usage in Vercel Storage
  - [ ] Verify rate limiting is working

- [ ] **Error Tracking** (Optional)
  - [ ] Set up Sentry or similar for error monitoring
  - [ ] Configure alerts for critical errors

---

## 🎯 Go-Live Checklist

- [ ] All boxes above are checked ✓
- [ ] Team has been notified of deployment
- [ ] Backup plan exists (rollback procedure known)
- [ ] Support contact info visible on site (support@ziantra.co.uk)
- [ ] Documentation shared with team (PRODUCTION-DEPLOYMENT.md, SECURITY-KEY-ROTATION.md)

---

## 📝 Sign-Off

- **Deployer Name:** ___________________
- **Deployment Date/Time:** ___________________
- **Production URL:** ___________________
- **Notes:** ___________________

---

**Last updated:** 4 December 2025
