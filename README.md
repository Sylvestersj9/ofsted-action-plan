# OFSTED Action Plan Generator

A Next.js application that converts OFSTED inspection reports into actionable task lists. **Production-ready with hardened security, freemium pricing, and payment verification.**

---

## 🚀 Status: Production-Ready

### ✅ Implemented
- ✅ **Security Hardened:** Server-side Stripe verification, PDF validation, webhook signing, session reuse prevention
- ✅ **Freemium Model:** First report free, subsequent reports £15 (Stripe payment required)
- ✅ **Database:** Postgres with migrations (in-memory fallback for dev)
- ✅ **Rate Limiting:** Vercel KV in production, Map fallback in dev
- ✅ **Deployment Ready:** Build passes, dev server runs, all routes working

### 📋 Next Steps
1. **[URGENT]** Rotate exposed API keys — see `SECURITY-KEY-ROTATION.md`
2. **Set up Postgres + KV** — see `PRODUCTION-DEPLOYMENT.md`
3. **Deploy to Vercel** — follow step-by-step guide
4. **Test end-to-end** — use `PRE-DEPLOYMENT-CHECKLIST.md`

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| `SECURITY-KEY-ROTATION.md` | 🔒 **URGENT** — How to rotate exposed Gemini & Resend API keys |
| `PRODUCTION-DEPLOYMENT.md` | 🚀 Complete step-by-step deployment guide (Vercel + Postgres + KV) |
| `PRE-DEPLOYMENT-CHECKLIST.md` | ✅ Final verification checklist before production |
| `TESTING-GUIDE.md` | 🧪 Manual testing procedures (existing) |

---

## Features

- ✅ Clean, professional landing page
- ✅ Stripe Checkout integration (£15 per report, first free)
- ✅ Post-payment secure upload form
- ✅ Server-side Stripe payment verification
- ✅ PDF content validation (prevents AI credit waste)
- ✅ Postgres database with migrations
- ✅ Webhook signature verification
- ✅ Rate limiting (Vercel KV in prod)
- ✅ GDPR-compliant data handling

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Postgres (production) / In-memory (dev)
- **Payments:** Stripe Checkout + Webhooks
- **Rate Limiting:** Vercel KV (production) / Map (dev)
- **AI:** Google Gemini API
- **Email:** Resend API
- **File Processing:** PDF extraction + text analysis

## Getting Started

### Development

1. **Clone and install:**
   ```bash
   npm install
   ```

2. **Set up environment** (`.env.local`):
   ```dotenv
   GEMINI_API_KEY=<your_key>
   RESEND_API_KEY=<your_key>
   FROM_EMAIL=reports@ziantra.co.uk
   ```

3. **Run dev server:**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

### Production

Follow the **`PRODUCTION-DEPLOYMENT.md`** guide for:
- Vercel Postgres setup
- Vercel KV rate limiting
- Environment variable configuration
- Stripe webhook configuration
- Deployment and monitoring

## Project Structure

```
ofsted-action-plan/
├── app/
│   ├── page.js                    # Landing page
│   ├── layout.js                  # Root layout
│   ├── globals.css                # Global styles
│   ├── upload/
│   │   └── page.js                # Upload form page
│   ├── success/
│   │   └── page.js                # Success page
│   ├── demo/
│   │   └── page.js                # Demo page
│   └── api/
│       ├── upload/
│       │   └── route.js           # Upload & analysis endpoint
│       ├── verify-payment/
│       │   └── route.js           # Payment verification endpoint
│       └── webhooks/
│           └── stripe/
│               └── route.js       # Stripe webhook handler
├── lib/
│   ├── db.js                      # Database abstraction (Postgres + in-memory)
│   ├── extract-pdf.js             # PDF text extraction
│   ├── analyze-report.js          # AI analysis router
│   ├── analyze-report-gemini.js   # Gemini implementation
│   ├── validate-pdf.js            # OFSTED content validation
│   ├── validate-env.js            # Environment variable validation
│   ├── stripe-webhooks.js         # Webhook signature verification
│   ├── rate-limit.js              # Vercel KV + Map fallback rate limiting
│   └── send-email.js              # Email delivery (Resend)
├── migrations/
│   ├── 001_init.sql               # Initial DB schema
│   └── 002_add_is_free.sql        # Free report tracking
├── scripts/
│   └── migrate.js                 # Migration runner
├── public/
├── package.json
├── tailwind.config.js
├── next.config.js
├── jsconfig.json
└── .gitignore
```

---

## Security Features

✅ **Server-side Stripe verification** — Prevents fake payments  
✅ **Session reuse prevention** — One payment = one report  
✅ **PDF validation** — Confirms OFSTED report before AI processing  
✅ **Webhook signature verification** — Validates Stripe events  
✅ **Fail-secure errors** — Denies access on verification failures  
✅ **Rate limiting** — Prevents abuse (5 uploads/minute per email)  
✅ **Environment validation** — Checks all required keys at startup  

---

## Freemium Model

- **First Report:** FREE
- **Subsequent Reports:** £15 (Stripe payment required)
- **Payment Tracking:** Recorded in Postgres (`payments` table)
- **Upload Tracking:** `uploads` table with `is_free` flag

### Flow

1. User uploads first OFSTED PDF → **FREE** → email sent
2. User tries to upload second PDF → **PAYMENT REQUIRED**
3. User completes Stripe Checkout → payment recorded
4. Upload processed → `is_free = false` recorded
5. Email sent with action plan

---

## API Endpoints

### `POST /api/upload`
Handles file upload, validation, AI analysis, and email delivery.

**Request:**
```json
{
  "file": "<PDF file>",
  "email": "user@example.com",
  "homeName": "Sunny Meadows",
  "session_id": "<Stripe checkout session ID>" // omit for first report
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your action plan has been sent to your email.",
  "summary": {
    "action_items": 14,
    "pages_analyzed": 8,
    "email_sent": true
  }
}
```

### `POST /api/verify-payment`
Verifies Stripe Checkout session before accepting paid uploads.

**Request:**
```json
{
  "sessionId": "cs_test_..."
}
```

**Response:**
```json
{
  "verified": true,
  "status": "complete",
  "email": "user@example.com",
  "amount": 1500
}
```

### `POST /api/webhooks/stripe`
Receives and processes Stripe webhook events (payment completion, refunds, etc.).

---

## Environment Variables

**Required for all environments:**
```dotenv
GEMINI_API_KEY=           # Google Cloud API key (for Gemini)
RESEND_API_KEY=           # Resend.com API key (for email)
FROM_EMAIL=               # Sender email (e.g., reports@ziantra.co.uk)
```

**Required for production:**
```dotenv
DATABASE_URL=             # Postgres connection string
STRIPE_SECRET_KEY=        # Stripe secret API key
STRIPE_WEBHOOK_SECRET=    # Stripe webhook signing secret
```

**Automatically set by Vercel (KV):**
```dotenv
KV_URL=                   # Vercel KV REST API URL
KV_REST_API_URL=          # Vercel KV URL
KV_REST_API_TOKEN=        # Vercel KV token
```

---

## Deployment

### Quick Deploy to Vercel

1. **Follow** `PRODUCTION-DEPLOYMENT.md` for detailed steps
2. **Or quick summary:**
   ```bash
   # 1. Create Vercel Postgres database
   # 2. Create Vercel KV database
   # 3. Set environment variables in Vercel
   # 4. Push code to GitHub
   # 5. Import project in Vercel
   # 6. Run migrations
   ```

### Pre-Deployment

Before going live, complete the **`PRE-DEPLOYMENT-CHECKLIST.md`**:
- API keys rotated ✓
- Build passes ✓
- Database ready ✓
- Webhooks configured ✓
- Testing passed ✓

---

## Testing

### Local Testing

```bash
# Dev server
npm run dev

# Build
npm run build

# Run migrations (with DATABASE_URL set)
npm run migrate
```

### Manual Testing Procedures

See `TESTING-GUIDE.md` for:
- Homepage flow
- Free upload flow
- Payment flow
- Webhook processing
- Error handling

---

## Monitoring & Maintenance

### Production Checks

- **Vercel Logs:** Check for runtime errors
- **Postgres:** Monitor query performance and storage
- **KV Usage:** Ensure rate limiting is working
- **Stripe:** Review payment success rates
- **Email:** Check delivery status and bounces

### Common Issues

| Issue | Solution |
|-------|----------|
| **Rate limiting not working** | Check KV is provisioned in Vercel; verify `KV_*` env vars |
| **Database connection fails** | Verify `DATABASE_URL` and Postgres is running |
| **Payment verification fails** | Check `STRIPE_SECRET_KEY` is correct in Vercel |
| **Emails not delivered** | Check `RESEND_API_KEY` and `FROM_EMAIL` in Resend dashboard |
| **Build fails on Vercel** | Check logs; verify all dependencies installed locally |

---

## Support

- **Documentation:** See files in root directory (PRODUCTION-DEPLOYMENT.md, etc.)
- **Email:** support@ziantra.co.uk
- **Issues:** Check GitHub issues or contact above email

---

**Last updated:** 4 December 2025  
**Status:** ✅ Production-Ready


### Next Steps (Phase 2)
- [ ] Set up Stripe Payment Link
- [ ] Implement file upload storage
- [ ] Add PDF processing logic
- [ ] Integrate AI for action plan generation
- [ ] Set up email delivery
- [ ] Implement 24-hour file deletion

### Testing
Test the success page by visiting: `http://localhost:3000/success?session_id=test`
