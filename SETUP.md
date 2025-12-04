# Setup Instructions

## Quick Start

1. Navigate to the project directory:
```bash
cd ofsted-action-plan
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser to: http://localhost:3000

## Testing the Application

### Landing Page
- Visit: http://localhost:3000
- Check all sections render correctly
- Test mobile responsiveness (resize browser to 375px)
 - Click "Get Started - £15" button (currently placeholder)

### Success Page
- Visit: http://localhost:3000/success?session_id=test_123
- Fill in email address
- Select a PDF file (max 10MB)
- Click "Upload Report"
- Should see success message (placeholder response)

## Next Steps for Phase 2

### 1. Stripe Integration
- Create Stripe account
- Generate Payment Link for £15
- Replace `#stripe-payment-link` in `app/page.js` with real Stripe URL
- Set success URL to: `https://yourdomain.com/success?session_id={CHECKOUT_SESSION_ID}`

### 2. File Upload Implementation
- Set up file storage (AWS S3, Vercel Blob, etc.)
- Implement file validation in API
- Add Stripe session verification

### 3. PDF Processing
- Integrate PDF parsing library
- Set up AI/LLM for content extraction
- Build action plan generation logic

### 4. Email Delivery
- Configure email service (SendGrid, Resend, etc.)
- Create email templates
- Implement delivery logic

### 5. Data Cleanup
- Set up scheduled job for 24-hour file deletion
- Implement GDPR compliance logging

## File Structure
```
ofsted-action-plan/
├── app/
│   ├── page.js                 # Landing page with hero, features, GDPR
│   ├── layout.js               # Root layout with metadata
│   ├── globals.css             # Tailwind imports
│   ├── success/
│   │   └── page.js             # Upload form (client component)
│   └── api/
│       └── upload/
│           └── route.js        # Upload endpoint (placeholder)
├── public/                     # Static assets (empty for now)
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── next.config.js              # Next.js configuration
├── postcss.config.js           # PostCSS configuration
├── jsconfig.json               # Path aliases
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

## Troubleshooting

### Port Already in Use
If port 3000 is busy, run on a different port:
```bash
npm run dev -- -p 3001
```

### Tailwind Styles Not Loading
1. Stop the dev server
2. Delete `.next` folder
3. Run `npm run dev` again

### File Upload Not Working
This is expected in Phase 1 - the API is a placeholder. Real implementation comes in Phase 2.
