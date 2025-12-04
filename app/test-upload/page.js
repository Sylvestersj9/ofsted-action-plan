'use client';

import { useState, useRef } from 'react';

export default function TestUploadPage() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [homeName, setHomeName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [testMode, setTestMode] = useState(true);
  const inputRef = useRef(null);

  const isProd = process.env.NODE_ENV === 'production';

  // Prevent test mode in production builds
  const effectiveTestMode = isProd ? false : testMode;

  function handleFileChange(e) {
    const f = e.target.files && e.target.files[0];
    setFile(f || null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!file || !email || !homeName) {
      setMessage('Please fill all fields and attach a PDF');
      return;
    }

    setLoading(true);
    setMessage('Processing...');
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('email', email);
      formData.append('homeName', homeName);
      // In dev/test mode we send the special session id accepted by the server
      if (effectiveTestMode) {
        formData.append('sessionId', 'test_bypass');
      }

      // Use fetch with progress using XHR to update progress bar
      await new Promise((resolve, reject) => {
        const xhr = new window.XMLHttpRequest();
        xhr.open('POST', '/api/upload');

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const pct = Math.round((event.loaded / event.total) * 100);
            setProgress(pct);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const resp = JSON.parse(xhr.responseText || '{}');
              setMessage('✅ Success! Check your email for the action plan.');
            } catch (err) {
              setMessage('✅ Success!');
            }
            resolve();
          } else {
            try {
              const body = JSON.parse(xhr.responseText || '{}');
              reject(new Error(body.error || body.reason || 'Upload failed'));
            } catch (err) {
              reject(new Error('Upload failed'));
            }
          }
        };

        xhr.onerror = () => reject(new Error('Network error'));
        xhr.onabort = () => reject(new Error('Upload aborted'));

        xhr.send(formData);
      });
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ofsted Action Plan — Upload</h1>
        <p className="text-gray-600 mb-6">Upload an Ofsted report (PDF). We'll analyse it and email you a clear action plan with recommendations and suggested next steps.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="name@organisation.org"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Children's Home Name</label>
            <input
              type="text"
              value={homeName}
              onChange={(e) => setHomeName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g. Riverside Care Home"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload OFSTED Report (PDF)</label>
            <div className="flex items-center gap-4">
              <input
                ref={inputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700"
                required
              />
            </div>
            {file && <p className="mt-2 text-sm text-gray-600">Selected: <strong>{file.name}</strong> ({Math.round(file.size/1024)} KB)</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                id="testMode"
                type="checkbox"
                checked={testMode}
                onChange={(e) => setTestMode(e.target.checked)}
                disabled={isProd}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="testMode" className="text-sm text-gray-700">Test mode (no payment)</label>
            </div>
            {isProd && <p className="text-sm text-red-600">Test mode disabled in production</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Generate Action Plan'}
            </button>
          </div>

          {progress > 0 && (
            <div className="w-full bg-gray-100 rounded overflow-hidden">
              <div style={{ width: `${progress}%` }} className="bg-indigo-600 text-white text-xs text-center py-1">{progress}%</div>
            </div>
          )}

          {message && (
            <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message}
            </div>
          )}
        </form>

        <div className="mt-8 text-sm text-gray-500 border-t pt-4 space-y-2">
          <p><strong>How this works</strong>: Upload a PDF, we'll extract the text, analyse the report, and email you an action plan with clear recommendations.</p>
          <p><strong>Dev note</strong>: Test mode sends `sessionId = 'test_bypass'` so you can exercise the full flow locally without Stripe. Do not enable this in production.</p>
          <p><a href="/" className="text-indigo-600 hover:underline">← Back to Homepage</a></p>
        </div>
      </div>
    </div>
  );
}
