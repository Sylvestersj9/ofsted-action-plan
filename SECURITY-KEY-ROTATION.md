# 🔒 URGENT: API Key Rotation Checklist

**Status: EXPOSED KEYS FOUND IN .env.local — ROTATE IMMEDIATELY**

---

## Exposed Keys Found (4 December 2025)

| Service | Key Name | Value | Status |
|---------|----------|-------|--------|
| Google Cloud (Gemini) | `GEMINI_API_KEY` | `AIzaSyCIIsgPtiGlS_6btg6RYKcgfUd-AYSpiGM` | ⚠️ REVOKE |
| Resend (Email) | `RESEND_API_KEY` | `re_i9EYY36q_3h51se7ULyetXn2kL5wySD45` | ⚠️ REVOKE |

---

## Step-by-Step Rotation

### 1. Revoke Google Cloud Gemini API Key

**Where to go:** [Google Cloud Console - API Keys](https://console.cloud.google.com/apis/credentials/keys)

1. Go to **Credentials** page.
2. Find the API key: `AIzaSyCIIsgPtiGlS_6btg6RYKcgfUd-AYSpiGM`
3. Click the **Delete** (trash icon) button.
4. Confirm deletion.

**⏱️ Impact:** Immediate. Old key becomes invalid. Requests using it will fail.

**Next:** Create a new Gemini API key.

1. Click **+ Create Credentials** → **API Key**
2. Choose key type: **API Key**
3. Copy the new key value
4. Update `.env.local`:
   ```
   GEMINI_API_KEY=<new_key_here>
   ```

---

### 2. Revoke Resend Email API Key

**Where to go:** [Resend Dashboard - API Keys](https://resend.com/api-keys)

1. Go to **API Keys** (left sidebar).
2. Find the key: `re_i9EYY36q_3h51se7ULyetXn2kL5wySD45`
3. Click the **Revoke** button (or **Delete** if available).
4. Confirm revocation.

**⏱️ Impact:** Immediate. Emails sent with old key will start failing (bounce).

**Next:** Create a new Resend API key.

1. Click **+ Create API Key**
2. Name it: `ofsted-action-plan-prod` (or similar)
3. Choose **Full Access** or **Send Email** permission
4. Copy the new key value
5. Update `.env.local`:
   ```
   RESEND_API_KEY=<new_key_here>
   ```

---

### 3. Update `.env.local` with New Keys

After creating new keys, edit `.env.local`:

```dotenv
GEMINI_API_KEY=<NEW_GOOGLE_KEY>
RESEND_API_KEY=<NEW_RESEND_KEY>
FROM_EMAIL=reports@ziantra.co.uk
# DATABASE_URL will be added when Postgres is provisioned
```

✅ **Save and commit** to git (if keys are now safely rotated).

---

### 4. Verify New Keys Work

Run a quick test:

```bash
# Test Gemini key
npm run dev
# Visit http://localhost:3000/demo
# Upload a test PDF — if it processes, Gemini key works ✓

# Test Resend key
# Check email delivery in upload flow — if email arrives, Resend key works ✓
```

---

## Checklist

- [ ] Revoked old Gemini API key in Google Cloud
- [ ] Created new Gemini API key
- [ ] Updated `GEMINI_API_KEY` in `.env.local`
- [ ] Revoked old Resend API key
- [ ] Created new Resend API key
- [ ] Updated `RESEND_API_KEY` in `.env.local`
- [ ] Tested Gemini key (ran upload, verified analysis works)
- [ ] Tested Resend key (verified email delivery)
- [ ] Committed `.env.local` changes to git (if desired)

---

## ⚠️ Important Notes

1. **Do this now.** These keys are exposed in the conversation history and Git (if committed). Any attacker with these keys can:
   - Call Gemini API on your account (cost money).
   - Send emails from your Resend account.

2. **Check Git history** — if `.env.local` was ever committed, the old keys are in Git history. After rotating keys, consider:
   - Force-pushing with a new commit that removes old keys (⚠️ only if not shared publicly).
   - Or, proceed knowing Git history contains old keys but they're now revoked.

3. **Stripe keys** — check if `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` are exposed. If they are, rotate via [Stripe Dashboard - API Keys](https://dashboard.stripe.com/apikeys).

---

## Next: Deploy with New Keys

Once keys are rotated:
1. Set up Postgres (Vercel Postgres or Supabase).
2. Update environment variables in Vercel project settings.
3. Deploy to production.

---

**Last updated:** 4 December 2025
