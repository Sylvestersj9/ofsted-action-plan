'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [email, setEmail] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) {
      setFile(null)
      return
    }

    if (selectedFile.type !== 'application/pdf') {
      setMessage({ type: 'error', text: 'Please upload a PDF file.' })
      setFile(null)
      return
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File is too large. Maximum size is 10MB.' })
      setFile(null)
      return
    }

    setMessage({ type: '', text: '' })
    setFile(selectedFile)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email || !file) {
      setMessage({ type: 'error', text: 'Please provide both email and your Ofsted report (PDF).' })
      return
    }

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('email', email)
      formData.append('session_id', sessionId || '')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: 'Upload successful. Your action plan will arrive by email shortly.',
        })
        setEmail('')
        setFile(null)
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Upload failed. Please try again.',
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Something went wrong. Please try again in a moment.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Payment status */}
        <section className="mb-10">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Step 2 of 2 · Upload your report</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            You’re ready to upload your Ofsted report
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            You’ve already paid. Now upload your children’s home inspection report and we’ll send you a
            clear, prioritised action plan by email.
          </p>
          {sessionId && (
            <p className="mt-3 text-xs text-slate-500">Payment reference: {sessionId}</p>
          )}
        </section>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Minimal upload card */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Upload your report</h2>
            <p className="text-sm text-slate-600 mb-6">
              We only need two things: the email you’d like the plan sent to, and your Ofsted report as a
              PDF.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={loading}
                  required
                />
                <p className="mt-1 text-xs text-slate-500">Your action plan will be emailed here.</p>
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-slate-700 mb-2">
                  Ofsted inspection report (PDF)
                </label>
                <input
                  id="file"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  disabled={loading}
                  required
                />
                <p className="mt-1 text-xs text-slate-500">PDF only · Maximum size 10MB.</p>
              </div>

              {message.text && (
                <div
                  className={`rounded-lg px-4 py-3 text-sm border ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? 'Uploading…' : 'Send my action plan'}
              </button>
            </form>
          </section>

          {/* Simple explanatory column */}
          <section className="space-y-6 text-sm text-slate-700">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">What you’ll receive</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>A structured action plan grouped into immediate, short‑term and ongoing actions.</li>
                <li>Suggested deadlines and evidence needed for each action.</li>
                <li>Direct quotes from your report linked to each action item.</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Data protection in brief</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Your report is only used to generate your action plan.</li>
                <li>Files are processed securely and not kept long‑term.</li>
                <li>
                  Where possible, you can remove names or identifying details – the AI focuses on
                  requirements and actions.
                </li>
              </ul>
            </div>

            <p className="text-xs text-slate-500">
              Need help? Email{' '}
              <a href="mailto:support@ziantra.co.uk" className="text-indigo-600 hover:text-indigo-700 font-medium">
                support@ziantra.co.uk
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
