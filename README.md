# OFSTED Action Plan Generator

A Next.js application that converts OFSTED inspection reports into actionable task lists.

## Phase 1 - Landing Page & Payment Integration

### Features
- Clean, professional landing page
- Stripe payment integration (£30 per report)
- Post-payment upload form
- GDPR-compliant data handling

### Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- JavaScript
- Stripe Payment Links

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Project Structure
```
ofsted-action-plan/
├── app/
│   ├── page.js                 # Landing page
│   ├── success/
│   │   └── page.js             # Post-payment upload form
│   ├── api/
│   │   └── upload/
│   │       └── route.js        # Upload API endpoint (placeholder)
│   ├── layout.js               # Root layout
│   └── globals.css             # Global styles
├── public/
├── package.json
├── tailwind.config.js
├── next.config.js
└── .gitignore
```

### Next Steps (Phase 2)
- [ ] Set up Stripe Payment Link
- [ ] Implement file upload storage
- [ ] Add PDF processing logic
- [ ] Integrate AI for action plan generation
- [ ] Set up email delivery
- [ ] Implement 24-hour file deletion

### Testing
Test the success page by visiting: `http://localhost:3000/success?session_id=test`
