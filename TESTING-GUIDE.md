# Quick Testing Guide

## 🚀 Quick Start (5 minutes)

### 1. Add Your API Keys

Edit `.env.local` file:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-key-here
RESEND_API_KEY=re_your-key-here
FROM_EMAIL=onboarding@resend.dev
```

### 2. Start Server

```bash
npm run dev
```

### 3. Test Upload

1. Go to: http://localhost:3000/success?session_id=test_123
2. Enter your email
3. Upload any PDF file
4. Click "Upload Report"
5. Check your email!

## 📋 What to Expect

### Console Output (Terminal)
```
=== Upload API called ===
Received: { filename: 'report.pdf', ... }
Extracting text from PDF...
PDF extracted: 5 pages, 12345 characters
Analyzing report with AI...
Sending to OpenAI...
Analysis complete: 12 action items
Sending email...
Email sent successfully
=== Processing complete ===
```

### Browser Output
```
✓ Upload successful! Check your email within 2 hours.
```

### Email (Check your inbox)
- Subject: "OFSTED Action Plan - [Home Name]"
- Contains:
  - Summary statistics
  - Action items by priority
  - Confidence scores
  - Evidence requirements

## 🐛 Common Issues

| Error | Solution |
|-------|----------|
| "Missing required fields" | Fill in email AND select file |
| "PDF extraction failed" | Try a different PDF file |
| "AI analysis failed" | Check API key in .env.local |
| "Email delivery failed" | Check Resend API key |
| No email received | Check spam folder |

## 🔑 Where to Get API Keys

### OpenAI
1. https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy key (starts with `sk-`)

### Resend
1. https://resend.com/
2. Sign up (free)
3. Create API key
4. Copy key (starts with `re_`)

## 💡 Tips

- **Use a real OFSTED report** for best results
- **Check terminal logs** for detailed progress
- **First run takes longer** (AI model loading)
- **Free tier limits:**
  - OpenAI: Pay as you go (~$0.01/report)
  - Resend: 100 emails/day free

## ✅ Success Criteria

- [x] Server starts without errors
- [x] Upload form works
- [x] Console shows processing steps
- [x] Email arrives in inbox
- [x] Email contains action items
- [x] No errors in terminal

---

**Need help?** Check `DAY3-SETUP.md` for detailed instructions.
