# Day 3: AI Processing & Email Delivery - Setup Guide

## ✅ What's Been Implemented

1. **PDF Text Extraction** (`lib/extract-pdf.js`)
   - Extracts text from uploaded PDF files
   - Cleans and normalizes text
   - Returns page count and metadata

2. **AI Analysis** (`lib/analyze-report.js`)
   - Supports both OpenAI (gpt-4o-mini) and Anthropic (claude-3-5-haiku)
   - Extracts action items with confidence scores
   - Categorizes by priority (immediate, short-term, ongoing)
   - Identifies strengths and critical issues

3. **Email Delivery** (`lib/send-email.js`)
   - Professional HTML email template
   - Color-coded priority sections
   - Confidence score warnings
   - Summary statistics

4. **Complete API Integration** (`app/api/upload/route.js`)
   - Full processing pipeline
   - Error handling at each step
   - Detailed logging

## 📦 Packages Installed

```bash
npm install pdf-parse openai @anthropic-ai/sdk resend
```

Already completed ✓

## 🔑 Configuration Steps

### Step 1: Get Your API Keys

#### Option A: OpenAI (Recommended for testing)
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy the key (starts with `sk-`)

#### Option B: Anthropic
1. Go to https://console.anthropic.com/
2. Create an API key
3. Copy the key

#### Resend (Email Service)
1. Go to https://resend.com/
2. Sign up for free account
3. Create an API key
4. Copy the key (starts with `re_`)

### Step 2: Update .env.local File

Open `ofsted-action-plan/.env.local` and add your keys:

```env
# Choose ONE AI provider
AI_PROVIDER=openai

# If using OpenAI:
OPENAI_API_KEY=sk-your-actual-key-here

# If using Anthropic:
# ANTHROPIC_API_KEY=your-actual-key-here

# Email (required)
RESEND_API_KEY=re_your-actual-key-here
FROM_EMAIL=onboarding@resend.dev
```

**Important:** 
- Set `AI_PROVIDER` to either `openai` or `anthropic`
- Only fill in the API key for your chosen provider
- Keep `FROM_EMAIL` as `onboarding@resend.dev` for testing (Resend's test email)

### Step 3: Verify File Structure

Your project should now have:

```
ofsted-action-plan/
├── lib/
│   ├── extract-pdf.js              # PDF text extraction
│   ├── analyze-report.js           # AI provider router
│   ├── analyze-report-openai.js    # OpenAI implementation
│   ├── analyze-report-anthropic.js # Anthropic implementation
│   └── send-email.js               # Email delivery
├── app/
│   └── api/
│       └── upload/
│           └── route.js            # Complete API endpoint
├── .env.local                      # Your API keys (DO NOT COMMIT)
└── package.json
```

## 🧪 Testing Instructions

### Test 1: Start Development Server

```bash
cd ofsted-action-plan
npm run dev
```

Server should start at http://localhost:3000

### Test 2: Prepare a Test PDF

You need a sample OFSTED report PDF. Options:
1. Use a real OFSTED report (download from ofsted.gov.uk)
2. Create a test PDF with sample text
3. Use any PDF file for initial testing (won't get good results but will test the pipeline)

### Test 3: Complete Upload Flow

1. **Visit the success page:**
   ```
   http://localhost:3000/success?session_id=test_payment_123
   ```

2. **Fill in the form:**
   - Email: Your actual email address (you'll receive the results here)
   - File: Select your test PDF (max 10MB)

3. **Click "Upload Report"**

4. **Watch the console logs** (in your terminal where `npm run dev` is running)
   You should see:
   ```
   === Upload API called ===
   Received: { filename: 'report.pdf', size: 123456, email: '...', sessionId: '...' }
   File converted to buffer
   Extracting text from PDF...
   PDF extracted: 5 pages, 12345 characters
   Analyzing report with AI...
   Sending to OpenAI... (or Anthropic)
   Analysis complete: 12 action items
   Sending email to your@email.com...
   Email sent successfully: abc123
   === Processing complete ===
   ```

5. **Check your email** (should arrive within 1-2 minutes)

### Test 4: Verify Email Content

The email should contain:
- ✓ Report metadata (home name, date, grade)
- ✓ Summary statistics
- ✓ Critical issues (if any)
- ✓ Strengths (if any)
- ✓ Action items grouped by priority:
  - 🔴 Immediate actions
  - 🟡 Short-term improvements
  - 🔵 Ongoing monitoring
- ✓ Each item shows:
  - Quote from report
  - Specific task
  - Category
  - Evidence needed
  - Confidence warning (if < 85%)

## 🐛 Troubleshooting

### Error: "Missing required fields"
- Make sure you filled in both email and selected a file
- Check that session_id is in the URL

### Error: "PDF extraction failed"
- File might be corrupted
- File might be password-protected
- Try a different PDF

### Error: "AI analysis failed"
- Check your API key is correct in `.env.local`
- Check you have credits/quota remaining
- Check `AI_PROVIDER` matches your key (openai or anthropic)

### Error: "Email delivery failed"
- Check your Resend API key is correct
- Verify the email address is valid
- Check Resend dashboard for delivery status

### No console logs appearing
- Make sure you're looking at the terminal where `npm run dev` is running
- Not the browser console

### Email not arriving
- Check spam folder
- Verify email address is correct
- Check Resend dashboard (https://resend.com/emails)
- Free tier has sending limits

## 💰 Cost Estimates

### OpenAI (gpt-4o-mini)
- ~$0.01-0.03 per report
- Very affordable for testing

### Anthropic (claude-3-5-haiku)
- ~$0.02-0.05 per report
- Slightly more expensive

### Resend
- Free tier: 100 emails/day
- More than enough for testing

## 🔒 Security Notes

1. **Never commit .env.local** - Already in .gitignore ✓
2. **Rotate API keys** if accidentally exposed
3. **Use environment variables** in production (Vercel, etc.)
4. **Validate file uploads** - Already implemented ✓

## 🚀 Next Steps (Day 4)

After testing works:
1. Add Stripe payment verification
2. Implement 24-hour file deletion
3. Add rate limiting
4. Deploy to production (Vercel)
5. Set up custom domain for emails

## 📝 Quick Reference

### Environment Variables
```env
AI_PROVIDER=openai|anthropic
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
FROM_EMAIL=onboarding@resend.dev
```

### Test URLs
- Landing: http://localhost:3000
- Upload: http://localhost:3000/success?session_id=test_123

### Log Locations
- API logs: Terminal running `npm run dev`
- Email delivery: https://resend.com/emails
- OpenAI usage: https://platform.openai.com/usage
- Anthropic usage: https://console.anthropic.com/

## ✅ Testing Checklist

- [ ] API keys added to .env.local
- [ ] Dev server starts without errors
- [ ] Can access success page
- [ ] Can select PDF file
- [ ] Upload shows "Uploading..." state
- [ ] Console shows processing logs
- [ ] Success message appears
- [ ] Email arrives in inbox
- [ ] Email formatting looks good
- [ ] Action items are relevant (if using real OFSTED report)

---

**Ready to test?** Start with `npm run dev` and visit the success page!
