# 🚀 Deployment Guide - Going Live

## Current Status: ✅ Ready for Production

Your OFSTED Action Plan Generator is fully functional and ready to deploy!

---

## Step 1: Prepare for Deployment

### 1.1 Create .env.example for Production
Already created ✅

### 1.2 Verify .gitignore
```bash
# Check that .env.local is ignored
cat .gitignore | grep .env.local
```
✅ Already configured

---

## Step 2: Set Up Stripe Live Mode

### 2.1 Switch to Live Mode in Stripe Dashboard
1. Go to https://dashboard.stripe.com/
2. Toggle from "Test mode" to "Live mode" (top right)
3. Navigate to "Payment Links"
4. Create a new Payment Link:
   - Product: "OFSTED Action Plan Report"
   - Price: £15.00 GBP
   - One-time payment
   - Success URL: `https://your-domain.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`

### 2.2 Get Live API Keys
1. Go to Developers → API Keys
2. Copy your **Live** Secret Key (starts with `sk_live_`)
3. Save for later (you'll add to Vercel)

### 2.3 Update Landing Page
Update `app/page.js` - replace the placeholder payment link:
```javascript
// Find this line:
<a href="#stripe-payment-link" 

// Replace with your actual Stripe Payment Link:
<a href="https://buy.stripe.com/your-live-payment-link"
```

---

## Step 3: Deploy to Vercel

### 3.1 Initialize Git Repository
```bash
cd ofsted-action-plan
git init
git add .
git commit -m "Initial commit - OFSTED Action Plan Generator"
```

### 3.2 Push to GitHub
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/yourusername/ofsted-action-plan.git
git branch -M main
git push -u origin main
```

### 3.3 Deploy to Vercel
1. Go to https://vercel.com/
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

### 3.4 Add Environment Variables in Vercel
Go to Project Settings → Environment Variables and add:

```env
# AI Configuration
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSyCIIsgPtiGlS_6btg6RYKcgfUd-AYSpiGM

# Email Configuration
RESEND_API_KEY=re_i9EYY36q_3h51se7ULyetXn2kL5wySD45
FROM_EMAIL=reports@ziantra.co.uk

# Stripe (Live Mode)
STRIPE_SECRET_KEY=sk_live_your_live_key_here
```

### 3.5 Deploy
Click "Deploy" and wait for build to complete (~2-3 minutes)

---

## Step 4: Configure Custom Domain (Optional)

### 4.1 Add Domain in Vercel
1. Go to Project Settings → Domains
2. Add your domain (e.g., `ofsted.ziantra.co.uk`)
3. Follow DNS configuration instructions

### 4.2 Update DNS Records
Add these records to your domain:
```
Type: CNAME
Name: ofsted (or your subdomain)
Value: cname.vercel-dns.com
```

---

## Step 5: Update Stripe Success URL

After deployment, update your Stripe Payment Link:
1. Go to Stripe Dashboard → Payment Links
2. Edit your payment link
3. Update Success URL to:
   ```
   https://your-vercel-domain.vercel.app/success?session_id={CHECKOUT_SESSION_ID}
   ```

---

## Step 6: Test Production

### 6.1 Test Payment Flow
1. Visit your live site
2. Click "Get Started - £15"
3. Complete payment with test card:
   - Card: 4242 4242 4242 4242
   - Expiry: Any future date
   - CVC: Any 3 digits
4. Upload a test PDF
5. Verify email delivery

### 6.2 Test with Real Payment
1. Use a real card (you can refund it later)
2. Complete full flow
3. Verify everything works

---

## Step 7: Monitor and Maintain

### 7.1 Set Up Monitoring
- **Vercel Analytics**: Automatically enabled
- **Resend Dashboard**: Monitor email delivery
- **Stripe Dashboard**: Track payments

### 7.2 Check Logs
```bash
# View Vercel logs
vercel logs your-project-name
```

### 7.3 Set Up Alerts
- Stripe: Enable email notifications for payments
- Resend: Set up delivery failure alerts
- Vercel: Enable deployment notifications

---

## Troubleshooting

### Issue: Emails Going to Spam
**Solution:**
1. Warm up domain (use `warmup-domain.js`)
2. Ask recipients to mark as "Not Spam"
3. Wait 24-48 hours for reputation to build

### Issue: Payment Not Redirecting
**Solution:**
1. Check Stripe Payment Link success URL
2. Verify it includes `{CHECKOUT_SESSION_ID}`
3. Test in incognito mode

### Issue: PDF Processing Fails
**Solution:**
1. Check Vercel function logs
2. Verify Gemini API key is correct
3. Check file size limits (10MB max)

### Issue: Build Fails on Vercel
**Solution:**
1. Check Node.js version (should be 18.x or higher)
2. Verify all dependencies in package.json
3. Check build logs for specific errors

---

## Production Checklist

Before going live, verify:

- [ ] Stripe switched to Live mode
- [ ] Live API keys added to Vercel
- [ ] Payment link updated with live URL
- [ ] Success URL points to production domain
- [ ] Custom domain configured (if using)
- [ ] Email domain verified (reports@ziantra.co.uk)
- [ ] Test payment completed successfully
- [ ] Test email received in inbox
- [ ] Landing page payment link updated
- [ ] Privacy policy added (if required)
- [ ] Terms of service added (if required)

---

## Cost Breakdown (Production)

### Monthly Costs:
- **Vercel**: Free (Hobby plan) or $20/month (Pro)
- **Gemini AI**: FREE (generous free tier)
- **Resend**: FREE (100 emails/day) or $20/month (unlimited)
- **Stripe**: 1.5% + 20p per transaction
- **Domain**: ~£10/year (if new)

### Per Transaction:
- **Revenue**: £15.00
- **Stripe Fee**: £0.43 (1.5% + 20p)
- **AI Cost**: £0.00 (free)
- **Email Cost**: £0.00 (free tier)
- **Net Profit**: £14.57 per report

---

## Support & Maintenance

### Regular Tasks:
1. **Weekly**: Check email deliverability
2. **Monthly**: Review Stripe transactions
3. **Quarterly**: Update dependencies
4. **As needed**: Respond to support emails

### Backup Strategy:
- Code: Backed up on GitHub
- Emails: Logged in Resend dashboard
- Payments: Tracked in Stripe dashboard

---

## Next Steps After Launch

1. **Marketing**:
   - Share on social media
   - Reach out to children's homes
   - Create demo video

2. **Improvements**:
   - Add user dashboard
   - Implement Stripe webhooks for verification
   - Add file deletion after 24 hours
   - Create admin panel

3. **Scale**:
   - Monitor usage
   - Upgrade plans as needed
   - Add more features based on feedback

---

## 🎉 You're Ready to Launch!

Your OFSTED Action Plan Generator is production-ready. Follow the steps above to deploy and start helping children's homes with their inspection reports!

**Questions?** Check the documentation or reach out for support.

**Good luck with your launch! 🚀**
