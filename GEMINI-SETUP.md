# 🎉 Google Gemini Setup - FREE AI Processing!

## Why Gemini?

✅ **Completely FREE** - No credit card required  
✅ **Fast** - gemini-1.5-flash is optimized for speed  
✅ **Generous limits** - 15 requests per minute, 1 million tokens per minute  
✅ **High quality** - Excellent at document analysis  

## 🔑 Get Your Gemini API Key (2 minutes)

### Step 1: Visit Google AI Studio
Go to: https://aistudio.google.com/app/apikey

### Step 2: Sign in with Google
Use any Google account (Gmail, etc.)

### Step 3: Create API Key
1. Click "Create API Key"
2. Select "Create API key in new project" (or use existing)
3. Copy the key (starts with `AIza...`)

### Step 4: Add to .env.local

Open `ofsted-action-plan/.env.local` and update:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSy...your-actual-key-here
RESEND_API_KEY=re_your-resend-key-here
FROM_EMAIL=onboarding@resend.dev
```

## 🚀 Test It Now

1. **Server should already be running** at http://localhost:3000

2. **Visit the upload page:**
   ```
   http://localhost:3000/success?session_id=test_123
   ```

3. **Upload a PDF:**
   - Enter your email
   - Select any PDF file
   - Click "Upload Report"

4. **Watch the console:**
   ```
   Sending to Google Gemini...
   Analysis complete: 12 items found
   ```

5. **Check your email!**

## 💰 Pricing (FREE!)

### Gemini 1.5 Flash (Free Tier)
- **Input:** FREE up to 1M tokens/min
- **Output:** FREE up to 1M tokens/min
- **Rate limit:** 15 requests/min
- **Daily limit:** 1,500 requests/day

### What This Means
- **~100-200 reports per day** for free
- **No credit card** required
- **No surprise charges**

Compare to paid options:
- OpenAI: $0.01-0.03 per report
- Anthropic: $0.02-0.05 per report
- **Gemini: $0.00 per report** ✨

## 📊 Rate Limits

Free tier limits (more than enough for testing):
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per minute

If you need more, paid tier is available but not necessary for most use cases.

## 🔧 Technical Details

### Model Used
`gemini-1.5-flash`
- Optimized for speed and efficiency
- Excellent at document analysis
- JSON output support
- 1M token context window

### Configuration
```javascript
model: 'gemini-1.5-flash'
temperature: 0.3  // Low for consistent extraction
responseMimeType: "application/json"  // Ensures valid JSON
```

## 🐛 Troubleshooting

### "Gemini analysis failed"
1. Check API key is correct in `.env.local`
2. Verify key starts with `AIza`
3. Check you haven't exceeded rate limits
4. Try generating a new API key

### "Invalid API key"
- Make sure you copied the entire key
- No extra spaces before/after
- Key should start with `AIza`

### Rate limit exceeded
- Free tier: 15 requests/min
- Wait 1 minute and try again
- Or upgrade to paid tier (not usually needed)

## 🔄 Switch Between Providers

You can easily switch between AI providers by changing `AI_PROVIDER` in `.env.local`:

```env
# Use Gemini (FREE)
AI_PROVIDER=gemini
GEMINI_API_KEY=AIza...

# Or use OpenAI
# AI_PROVIDER=openai
# OPENAI_API_KEY=sk-...

# Or use Anthropic
# AI_PROVIDER=anthropic
# ANTHROPIC_API_KEY=sk-ant-...
```

## 📚 Resources

- **Get API Key:** https://aistudio.google.com/app/apikey
- **Documentation:** https://ai.google.dev/docs
- **Pricing:** https://ai.google.dev/pricing
- **Rate Limits:** https://ai.google.dev/gemini-api/docs/quota

## ✅ Quick Checklist

- [ ] Got Gemini API key from Google AI Studio
- [ ] Added key to `.env.local`
- [ ] Set `AI_PROVIDER=gemini`
- [ ] Got Resend API key
- [ ] Server is running
- [ ] Tested upload with PDF
- [ ] Received email with results

---

**Ready to test?** Your setup is complete! Visit the upload page and try it out.

**Cost:** $0.00 per report 🎉
