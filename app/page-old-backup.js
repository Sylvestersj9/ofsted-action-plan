export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">OFSTED Action Plan Generator</h1>
              <p className="text-xs text-gray-600">by Ziantra</p>
            </div>
          </div>
          <a 
            href="https://buy.stripe.com/aFa14m1Yj3hx4q90VFd3i02"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors text-sm"
          >
            Get Started - £15
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 pt-8">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Turn OFSTED Reports into Action Plans
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Save hours of manual work. Get a comprehensive, organized action plan from your inspection report in just 2 hours.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <a 
              href="https://buy.stripe.com/aFa14m1Yj3hx4q90VFd3i02" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Get Started - £15
            </a>
            <a 
              href="#how-it-works" 
              className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Learn More
            </a>
          </div>
          <p className="text-sm text-gray-500">
            One-time payment • No subscription • Delivered via email
          </p>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
            <div className="text-4xl font-bold text-blue-600 mb-2">2 Hours</div>
            <div className="text-gray-700">Average Delivery Time</div>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center border border-green-100">
            <div className="text-4xl font-bold text-green-600 mb-2">£15</div>
            <div className="text-gray-700">One-Time Payment</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 text-center border border-purple-100">
            <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-700">Automated Analysis</div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What You Get</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Complete Action Items</h4>
                <p className="text-gray-600 text-sm">Every requirement from your OFSTED report extracted and converted into specific, actionable tasks.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Priority Levels</h4>
                <p className="text-gray-600 text-sm">Tasks categorized as Immediate, Short-term, or Ongoing so you know what to tackle first.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <span className="text-2xl">📁</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Organized by Category</h4>
                <p className="text-gray-600 text-sm">Actions grouped by Safeguarding, Health & Safety, Education, Leadership, and more.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Evidence Requirements</h4>
                <p className="text-gray-600 text-sm">Clear guidance on what documentation you need to prove completion of each action.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pay £15</h3>
              <p className="text-gray-600">Secure one-time payment via Stripe. No subscription, no hidden fees.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Report</h3>
              <p className="text-gray-600">Upload your OFSTED inspection report PDF. Files are encrypted and auto-deleted after 24 hours.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Receive Action Plan</h3>
              <p className="text-gray-600">Get your comprehensive action plan via email within 2 hours, ready to implement.</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Service?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">⏱️ Save Time</h3>
              <p className="text-gray-600">What normally takes days of manual work is done in 2 hours. Focus on implementation, not paperwork.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Nothing Missed</h3>
              <p className="text-gray-600">AI-powered analysis ensures every requirement, recommendation, and area for improvement is captured.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Clear Priorities</h3>
              <p className="text-gray-600">Know exactly what needs immediate attention and what can be scheduled for later.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">👥 Team-Ready</h3>
              <p className="text-gray-600">Professional format that's easy to share with your team and track progress.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate is the AI analysis?</h3>
              <p className="text-gray-600">Our AI is specifically trained on OFSTED reports and achieves high accuracy. Each action item includes a confidence score, and we recommend reviewing items flagged with lower confidence.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What format is the action plan delivered in?</h3>
              <p className="text-gray-600">You receive a professional HTML email with a clean table format, plus a plain text version. It's designed to be print-friendly and easy to share.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Yes. All uploads are encrypted, processed securely, and automatically deleted after 24 hours. We don't store your reports or personal data.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What if I'm not satisfied?</h3>
              <p className="text-gray-600">Contact us at support@ziantra.co.uk within 24 hours and we'll review your case. We're committed to delivering quality action plans.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use this for multiple reports?</h3>
              <p className="text-gray-600">Yes! Each report requires a separate £15 payment. There's no limit to how many reports you can process.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does processing take?</h3>
              <p className="text-gray-600">Most reports are processed and delivered within 2 hours. Complex or lengthy reports may take slightly longer.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 rounded-lg p-12 text-center text-white mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Transform your OFSTED report into an actionable plan in just 2 hours.</p>
          <a 
            href="https://buy.stripe.com/aFa14m1Yj3hx4q90VFd3i02" 
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Get Started - £15
          </a>
        </section>

        {/* GDPR Notice */}
        <section className="bg-blue-50 rounded-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Protection & Privacy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <span className="text-blue-600 mr-2 text-xl">🔒</span>
              <div>
                <h4 className="font-semibold text-gray-900">Secure Processing</h4>
                <p className="text-gray-700 text-sm">All files encrypted during upload and processing</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2 text-xl">⏰</span>
              <div>
                <h4 className="font-semibold text-gray-900">Auto-Deletion</h4>
                <p className="text-gray-700 text-sm">Files automatically deleted after 24 hours</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2 text-xl">🇬🇧</span>
              <div>
                <h4 className="font-semibold text-gray-900">UK-Based</h4>
                <p className="text-gray-700 text-sm">All processing done in the UK</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2 text-xl">✅</span>
              <div>
                <h4 className="font-semibold text-gray-900">GDPR Compliant</h4>
                <p className="text-gray-700 text-sm">Full compliance with data protection regulations</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Z</span>
                </div>
                <span className="font-bold text-lg">Ziantra</span>
              </div>
              <p className="text-gray-400 text-sm">
                Helping children's homes turn OFSTED reports into actionable plans.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="https://buy.stripe.com/aFa14m1Yj3hx4q90VFd3i02" className="text-gray-400 hover:text-white transition-colors">Get Started</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400">Email: <a href="mailto:support@ziantra.co.uk" className="hover:text-white transition-colors">support@ziantra.co.uk</a></li>
                <li className="text-gray-400">Reports: <a href="mailto:reports@ziantra.co.uk" className="hover:text-white transition-colors">reports@ziantra.co.uk</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Ziantra. All rights reserved.</p>
            <p className="mt-2">OFSTED Action Plan Generator - Powered by AI</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

/*
TESTING CHECKLIST:
[ ] Landing page loads without errors
[ ] All sections visible and properly styled
[ ] Mobile responsive (test at 375px width)
[ ] Payment button visible (even if placeholder)
[ ] Success page accessible at /success?session_id=test
[ ] Upload form renders correctly
[ ] File input accepts only .pdf files
[ ] Form submission shows success message
*/
