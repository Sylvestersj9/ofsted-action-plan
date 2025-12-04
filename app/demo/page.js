'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Demo() {
  const [reportText, setReportText] = useState('')
  const [showOutput, setShowOutput] = useState(false)

  const handleGenerate = () => {
    if (reportText.trim()) {
      setShowOutput(true)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2 mb-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Demo: Ofsted Action Plan Generator</h1>
        <p className="text-lg text-slate-600">
          Paste an Ofsted children&apos;s home inspection report below to see how the action plan is structured. 
          This is a demonstration showing the format – the actual service will process your report automatically.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
        <label htmlFor="report" className="block text-lg font-semibold text-slate-900 mb-3">
          Paste your Ofsted report text
        </label>
        <textarea
          id="report"
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          placeholder="Paste the text from your Ofsted inspection report here...

For example:
'The overall experiences and progress of children and young people: requires improvement to be good.

Safeguarding: The arrangements for safeguarding children are not effective. Staff do not consistently follow the home's procedures for responding to children who go missing...'"
          className="w-full h-64 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none font-mono text-sm"
        />
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            {reportText.length} characters
          </p>
          <button
            onClick={handleGenerate}
            disabled={!reportText.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Generate Sample Action Plan
          </button>
        </div>
      </div>

      {showOutput && (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-indigo-50 border-b border-indigo-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Generated Action Plan</h2>
            <p className="text-slate-600">This is a sample output showing the structure you'll receive</p>
          </div>

          <div className="p-8">
            {/* Report Metadata */}
            <div className="bg-slate-50 rounded-lg p-6 mb-8 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Report Summary</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-700">Home:</span>
                  <span className="text-slate-600 ml-2">Example Children's Home</span>
                </div>
                <div>
                  <span className="font-medium text-slate-700">Inspection date:</span>
                  <span className="text-slate-600 ml-2">15 January 2024</span>
                </div>
                <div>
                  <span className="font-medium text-slate-700">Overall grade:</span>
                  <span className="text-amber-600 font-medium ml-2">Requires Improvement</span>
                </div>
                <div>
                  <span className="font-medium text-slate-700">Total actions:</span>
                  <span className="text-slate-900 font-semibold ml-2">12</span>
                </div>
              </div>
            </div>

            {/* Immediate Actions */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                Immediate Actions (3)
              </h3>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                  <p className="font-semibold text-slate-900 mb-2">
                    AI1: Review and update safeguarding procedures for missing from care incidents
                  </p>
                  <p className="text-sm text-slate-600 italic mb-3">
                    Quote: "Staff do not consistently follow the home's procedures for responding to children who go missing..."
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">Category:</span>
                      <span className="text-slate-600 ml-2">Safeguarding</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Deadline:</span>
                      <span className="text-slate-600 ml-2">Within 2 weeks</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-slate-700">Evidence needed:</span>
                      <span className="text-slate-600 ml-2">Updated policy document, staff training records, signed acknowledgements</span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                  <p className="font-semibold text-slate-900 mb-2">
                    AI2: Ensure all staff complete mandatory safeguarding training
                  </p>
                  <p className="text-sm text-slate-600 italic mb-3">
                    Quote: "Not all staff have completed up-to-date safeguarding training..."
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">Category:</span>
                      <span className="text-slate-600 ml-2">Staffing</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Deadline:</span>
                      <span className="text-slate-600 ml-2">Within 1 month</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-slate-700">Evidence needed:</span>
                      <span className="text-slate-600 ml-2">Training certificates, attendance records, competency assessments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blurred Preview Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white z-10 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-xl border-2 border-indigo-600 p-8 text-center max-w-md">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">See the Full Action Plan</h3>
                  <p className="text-slate-600 mb-6">
                    This demo shows the structure. Get your complete action plan with all items, priorities, and evidence requirements.
                  </p>
                  <a 
                    href="https://buy.stripe.com/aFa14m1Yj3hx4q90VFd3i02"
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                  >
                    Get Started - £15
                  </a>
                  <p className="text-sm text-slate-500 mt-4">Delivered to your email in seconds</p>
                </div>
              </div>
              
              {/* Blurred Content */}
              <div className="filter blur-sm opacity-40 pointer-events-none">
                {/* Short-term Improvements */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-amber-600 mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                    Short-term Improvements (6)
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-6">
                      <p className="font-semibold text-slate-900 mb-2">
                        AI3: Improve quality and consistency of care planning documentation
                      </p>
                      <p className="text-sm text-slate-600 italic mb-3">
                        Quote: "Care plans do not always reflect children's current needs and risks..."
                      </p>
                    </div>
                    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-6">
                      <p className="font-semibold text-slate-900 mb-2">
                        AI4: Additional short-term improvement action
                      </p>
                    </div>
                    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-6">
                      <p className="font-semibold text-slate-900 mb-2">
                        AI5: Another short-term improvement action
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ongoing Monitoring */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    Ongoing Monitoring (3)
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                      <p className="font-semibold text-slate-900 mb-2">
                        AI6: Continue to monitor and improve educational outcomes
                      </p>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                      <p className="font-semibold text-slate-900 mb-2">
                        AI7: Ongoing monitoring action
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-t border-slate-200 p-6">
            <p className="text-sm text-slate-600 text-center">
              This is a demonstration of the action plan format. The actual service will analyze your specific report and generate customized actions.
            </p>
          </div>
        </div>
      )}

      <div className="mt-12 bg-indigo-50 border border-indigo-200 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-slate-900 mb-3">Ready to use the full service?</h3>
        <p className="text-slate-600 mb-6">
          Get your actual Ofsted report processed and receive a complete action plan by email in seconds.
        </p>
        <a 
          href="https://buy.stripe.com/aFa14m1Yj3hx4q90VFd3i02"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Get Started - £15
        </a>
      </div>
    </div>
  )
}
