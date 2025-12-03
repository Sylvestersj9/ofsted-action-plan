'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <span>Designed for children's homes</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Turn Ofsted inspection reports into clear action plans in seconds
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Upload your Ofsted children's home inspection report and receive a structured action plan with priorities, deadlines and evidence needed – automatically generated for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/demo"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-center transition-colors"
                >
                  Get started – view demo
                </Link>
                <a 
                  href="#how-it-works"
                  className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 px-8 py-4 rounded-lg font-semibold text-center transition-colors"
                >
                  See how it works
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No subscription</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Pay per report</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Beta: discounted early access</span>
                </div>
              </div>
            </div>
            
            {/* Mock Report Card */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="border-b border-slate-200 pb-4 mb-4">
                <h3 className="font-semibold text-slate-900 mb-1">Report: OFSTED inspection</h3>
                <p className="text-sm text-slate-600">Sunny Meadows Children's Home</p>
              </div>
              <div className="mb-4">
                <p className="text-2xl font-bold text-indigo-600 mb-1">14 actions generated</p>
                <p className="text-sm text-slate-600">Organized by priority</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-slate-900">3 immediate safeguarding actions</p>
                    <p className="text-sm text-slate-600">Requires urgent attention</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-slate-900">6 short-term improvements</p>
                    <p className="text-sm text-slate-600">Complete within 3 months</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-slate-900">5 ongoing monitoring items</p>
                    <p className="text-sm text-slate-600">Continuous improvement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-slate-700 font-medium mb-2">
            Built with input from experienced children's home managers
          </p>
          <p className="text-slate-600">
            Helps you turn dense OFSTED text into practical tasks you can assign to your team
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Upload your Ofsted report</h3>
              <p className="text-slate-600">
                You upload your Ofsted children's home inspection report as a PDF or paste the text directly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">AI extracts requirements and actions</h3>
              <p className="text-slate-600">
                Our AI identifies requirements, recommendations and areas for improvement, then turns them into specific tasks with priorities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">You receive a structured action plan</h3>
              <p className="text-slate-600">
                Within seconds you receive an actionable plan by email, ready to share with your team or embed into your own improvement plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Output */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">What your action plan looks like</h2>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Sunny Meadows Children's Home</h3>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <span>Inspection date: 15 January 2024</span>
                <span>•</span>
                <span>Overall grade: <span className="font-medium text-amber-600">Requires Improvement</span></span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  Immediate actions
                </h4>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">Review and update safeguarding procedures for missing from care incidents</p>
                    <p className="text-sm text-slate-600 italic mb-2">"The home's procedures for responding to children who go missing are not consistently followed..."</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-slate-600"><strong>Evidence needed:</strong> Updated policy document, staff training records</span>
                      <span className="text-slate-600"><strong>Deadline:</strong> Within 2 weeks</span>
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">Ensure all staff complete mandatory safeguarding training</p>
                    <p className="text-sm text-slate-600 italic mb-2">"Not all staff have completed up-to-date safeguarding training..."</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-slate-600"><strong>Evidence needed:</strong> Training certificates, attendance records</span>
                      <span className="text-slate-600"><strong>Deadline:</strong> Within 1 month</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-amber-600 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                  Short-term improvements
                </h4>
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">Improve quality and consistency of care planning documentation</p>
                    <p className="text-sm text-slate-600 italic mb-2">"Care plans do not always reflect children's current needs and risks..."</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-slate-600"><strong>Evidence needed:</strong> Updated care plans, review meeting notes</span>
                      <span className="text-slate-600"><strong>Deadline:</strong> Within 3 months</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  Ongoing monitoring
                </h4>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">Continue to monitor and improve educational outcomes for all children</p>
                    <p className="text-sm text-slate-600 italic mb-2">"Educational outcomes for children are improving but require continued focus..."</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-slate-600"><strong>Evidence needed:</strong> Monthly education reports, PEP reviews</span>
                      <span className="text-slate-600"><strong>Frequency:</strong> Monthly review</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-6">Who is this for?</h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            This tool is specifically designed for professionals working with children's homes Ofsted inspection reports, aligned with the SCCIF framework areas including safeguarding, leadership, health and wellbeing.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Registered managers</h3>
              <p className="text-sm text-slate-600">Leading children's homes and responsible for OFSTED compliance</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Responsible individuals</h3>
              <p className="text-sm text-slate-600">Overseeing multiple homes and ensuring quality standards</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Quality and compliance leads</h3>
              <p className="text-sm text-slate-600">Managing improvement plans and regulatory requirements</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Consultants</h3>
              <p className="text-sm text-slate-600">Supporting homes with Ofsted preparation and improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why managers use this</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Saves time</h3>
              <p className="text-slate-600">
                Reduces 1–2 hours of manual note-taking per report. Instead of reading through dense inspection text multiple times, you get a structured action plan immediately.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Reduces risk</h3>
              <p className="text-slate-600">
                Helps you avoid missing requirements or recommendations buried in dense text. Every explicit requirement is identified and converted into an actionable task.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Clarifies priorities</h3>
              <p className="text-slate-600">
                Groups actions into immediate, short-term and ongoing so you can focus on what matters first. No more wondering which issues need urgent attention.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Makes it easier to share</h3>
              <p className="text-slate-600">
                Gives you a clear document to discuss with your team, RI, or external consultants. Everyone can see the same priorities and deadlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Data protection & GDPR</h2>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
            <p className="text-slate-700 mb-6 leading-relaxed">
              We understand that OFSTED reports contain sensitive information about children and your home. Data protection is built into how this service works.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-slate-900">Reports are processed securely</p>
                  <p className="text-sm text-slate-600">All uploads are encrypted and processed in secure UK-based infrastructure.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-slate-900">Files are only used to generate your action plan</p>
                  <p className="text-sm text-slate-600">Your report is processed solely to create your action plan. It's not used for any other purpose.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-slate-900">Reports are not stored long term</p>
                  <p className="text-sm text-slate-600">Our intention is to process and delete your report rather than keep it. Files are automatically removed after processing.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-slate-900">Your reports are not used to train public AI models</p>
                  <p className="text-sm text-slate-600">We do not use your specific report content to train AI systems.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-slate-700">
                <strong>Recommendation:</strong> Where possible, consider anonymising reports before upload by removing specific names of children, staff, or identifying details. The AI focuses on requirements and actions, not personal information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Is this only for children's homes?",
                a: "Yes, this tool is specifically designed for Ofsted children's home inspection reports. It understands the SCCIF framework and the specific language used in children's home inspections."
              },
              {
                q: "Does this replace my own professional judgement?",
                a: "Absolutely not. This tool supports your planning process, but you remain responsible for all decisions. You should always read the full OFSTED report and use your professional judgement to review and refine the action plan."
              },
              {
                q: "Can I edit the action plan afterwards?",
                a: "Yes. The action plan is delivered as an email which you can copy into your own documents, spreadsheets, or improvement plan systems. You have full control to edit, add, or remove items."
              },
              {
                q: "How accurate is the AI?",
                a: "We continuously review and refine our AI prompts based on real Ofsted reports. The system aims to capture all explicit requirements, but we always recommend managers read the full Ofsted report to ensure nothing is missed. Each action includes a confidence score to help you identify items that may need manual review."
              },
              {
                q: "What happens to my report after upload?",
                a: "Your report is processed securely to generate the action plan, then automatically deleted. We do not store reports long-term. See the Data Protection section above for full details."
              },
              {
                q: "Do I need to create an account?",
                a: "No. For the current version, you simply pay per report and receive the output by email. No account or login required."
              },
              {
                q: "How much does it cost?",
                a: "We are currently testing beta pricing with early users. The planned standard price is around £30 per report. During beta, pricing may be lower as we refine the service based on feedback."
              },
              {
                q: "How long does it take?",
                a: "Most action plans are generated and delivered within seconds of upload. You'll receive your comprehensive action plan via email almost immediately."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-6 hover:bg-slate-50 transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-900 pr-8">{faq.q}</span>
                  <svg 
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openFaq === index ? 'transform rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to turn your Ofsted report into an action plan?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Try the demo to see the structure, then use it on your next inspection report.
          </p>
          <Link 
            href="/demo"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Open demo
          </Link>
          <p className="text-indigo-100 mt-6 text-sm">
            If you'd like to discuss using this across multiple homes, contact us at{' '}
            <a href="mailto:support@ziantra.co.uk" className="underline hover:text-white">
              support@ziantra.co.uk
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
