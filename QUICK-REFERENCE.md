# ⚡ Quick Reference Card

**Print this or keep it open while deploying.**

---

## 🚨 URGENT (Do This First)

### Step 1: Rotate API Keys (30 min)
```
1. Go to Google Cloud Console
   → Revoke: AIzaSyCIIsgPtiGlS_6btg6RYKcgfUd-AYSpiGM
   → Create new Gemini key
   
2. Go to Resend Dashboard
   → Revoke: re_i9EYY36q_3h51se7ULyetXn2kL5wySD45
   → Create new Resend key
   
3. Update .env.local with new keys
```

📖 **Full guide:** `SECURITY-KEY-ROTATION.md`

---

## 📋 Deploy to Vercel (2 hours)

### Step 2: Set Up Database (30 min)

```bash
# 1. Create Postgres in Vercel Dashboard
#    Vercel → Storage → Create Database → Postgres

# 2. Copy DATABASE_URL to .env.local

# 3. Run migrations locally
export DATABASE_URL="postgresql://..."
npm run migrate

# Verify: Tables created (payments, uploads, migrations)
```

📖 **Full guide:** `PRODUCTION-DEPLOYMENT.md` → **Step 1**

---

### Step 3: Set Up Rate Limiting (5 min)

```bash
# 1. Create KV in Vercel Dashboard
#    Vercel → Storage → Create Database → KV

# 2. Vercel auto-links to your project
# 3. Done! (lib/rate-limit.js detects automatically)
```

📖 **Full guide:** `PRODUCTION-DEPLOYMENT.md` → **Step 2**

---

### Step 4: Set Environment Variables in Vercel (10 min)

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | From Postgres |
| `GEMINI_API_KEY` | New key from Step 1 |
| `RESEND_API_KEY` | New key from Step 1 |
| `FROM_EMAIL` | reports@ziantra.co.uk |
| `STRIPE_SECRET_KEY` | Your Stripe key |
| `STRIPE_WEBHOOK_SECRET` | Your Stripe webhook secret |

```bash
# Vercel Dashboard
# Settings → Environment Variables → Add each above
```

📖 **Full guide:** `PRODUCTION-DEPLOYMENT.md` → **Step 3**

---

### Step 5: Deploy to Vercel (30 min)

```bash
# 1. Push to GitHub
git add -A
git commit -m "Production: freemium + security + KV rate limiting"
git push origin main

# 2. Vercel Dashboard → New Project → Import GitHub
# 3. Select repository
# 4. Click Deploy

# 5. Wait for build (~2-5 min)
```

📖 **Full guide:** `PRODUCTION-DEPLOYMENT.md` → **Step 4-5**

---

### Step 6: Run Migrations on Production DB (5 min)

```bash
# After deployment
export DATABASE_URL="postgresql://..."  # Production URL from Vercel
npm run migrate

# Verify tables created
```

📖 **Full guide:** `PRODUCTION-DEPLOYMENT.md` → **Step 5**

---

### Step 7: Configure Stripe Webhooks (10 min)

```bash
# Stripe Dashboard
# Developers → Webhooks → Add endpoint

# URL: https://<your-project>.vercel.app/api/webhooks/stripe
# Events: checkout.session.completed, charge.failed, charge.refunded

# Copy webhook secret → Add to Vercel env vars as STRIPE_WEBHOOK_SECRET
```

📖 **Full guide:** `PRODUCTION-DEPLOYMENT.md` → **Step 7**

---

## ✅ Verification Checklist

### Before You Deploy

```bash
# ✅ Check build passes
npm run build

# ✅ Check dev server works
npm run dev
# Then visit http://localhost:3000
```

### After You Deploy

```bash
# ✅ Check homepage loads
curl https://<your-project>.vercel.app

# ✅ Check API endpoints respond
curl https://<your-project>.vercel.app/api/upload

# ✅ Run migrations
npm run migrate

# ✅ Test free upload
# Visit https://<your-project>.vercel.app/upload
# Upload first PDF → should be free
```

📖 **Full guide:** `PRE-DEPLOYMENT-CHECKLIST.md`

---

## 🧪 Manual Testing

### Test 1: First Report (Free)

```
1. Open https://<your-project>.vercel.app/upload
2. Email: test1@example.com
3. Home Name: Test Home
4. Upload OFSTED PDF
5. ✅ Should succeed WITHOUT payment
6. ✅ Email received
7. ✅ Check DB: is_free = true
```

### Test 2: Second Report (Paid)

```
1. Open https://<your-project>.vercel.app/upload
2. Same email: test1@example.com
3. Try uploading again
4. ✅ Should ask for Stripe payment
5. Complete test payment
6. ✅ Upload succeeds
7. ✅ Email received
8. ✅ Check DB: is_free = false
```

### Test 3: Rate Limiting

```
1. Submit 5 uploads rapidly
   ✅ All succeed
2. Submit 6th within 60 seconds
   ✅ Returns 429 error: "Too many upload attempts"
3. Wait 60 seconds
   ✅ Can upload again
```

---

## 🚨 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| **Build fails on Vercel** | Check build logs; verify dependencies installed locally with `npm install` |
| **Database connection error** | Verify `DATABASE_URL` is set in Vercel environment variables |
| **Rate limiting not working** | Check KV is created in Vercel Storage and `KV_*` env vars exist |
| **Payment verification fails** | Verify `STRIPE_SECRET_KEY` is correct in Vercel |
| **Emails not delivered** | Check `RESEND_API_KEY` and `FROM_EMAIL` are correct |
| **Webhook not processing** | Check `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard |
| **PDF upload fails** | Check Gemini API key is valid; check file is valid PDF |

---

## 📞 Emergency Contacts

- **Email:** support@ziantra.co.uk
- **Stripe Support:** dashboard.stripe.com
- **Vercel Support:** vercel.com/support
- **Resend Support:** resend.com/docs

---

## 📚 Documentation

| File | When to Use |
|------|------------|
| `README.md` | Overview and tech stack |
| `SECURITY-KEY-ROTATION.md` | Rotating exposed API keys (URGENT) |
| `PRODUCTION-DEPLOYMENT.md` | Full step-by-step deployment guide |
| `PRE-DEPLOYMENT-CHECKLIST.md` | Final verification before launch |
| `SESSION-DELIVERY-SUMMARY.md` | What was built and how it works |
| `TESTING-GUIDE.md` | Manual testing procedures |

---

## ⏱️ Timeline

| Task | Time | Status |
|------|------|--------|
| Rotate API keys | 30 min | ⏳ In progress |
| Set up Postgres + KV | 30 min | ⏳ Pending |
| Deploy to Vercel | 30 min | ⏳ Pending |
| Run migrations | 5 min | ⏳ Pending |
| Configure webhooks | 10 min | ⏳ Pending |
| Manual testing | 30 min | ⏳ Pending |
| **Total to Launch** | **~2 hours** | ⏳ Starting now |

---

## 🎯 Success Criteria

✅ You're done when:
1. API keys rotated and working
2. Postgres database created and migrated
3. KV rate limiting working
4. App deployed to Vercel
5. First report uploads for free
6. Second report requires payment
7. Emails being delivered
8. Webhooks processing correctly

---

**Keep this card handy during deployment!**

Last updated: 4 December 2025
