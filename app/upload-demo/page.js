'use client';

import { useState } from 'react';
import { Upload, FileText, Mail, Building2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function UploadDemoPage() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [homeName, setHomeName] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, uploading, processing, success, error
  const [message, setMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      } else {
        setMessage('Please upload a PDF file');
        setStatus('error');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file || !email || !homeName) {
      setMessage('Please fill in all fields');
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus('uploading');
    setMessage('Uploading your OFSTED report...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);
    formData.append('homeName', homeName);
    formData.append('sessionId', 'demo_access');

    try {
      setStatus('processing');
      setMessage('Analyzing your report with AI...');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(`Success! Your action plan has been sent to ${email}`);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setEmail('');
    setHomeName('');
    setStatus('idle');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">OFSTED Action Plan Generator</h1>
                <p className="text-sm text-gray-600">AI-powered compliance in minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {status === 'success' ? (
          // Success State
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Action Plan Sent!</h2>
            <p className="text-lg text-gray-600 mb-8">{message}</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Check your email inbox for your comprehensive action plan
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Review the AI-generated recommendations and timelines
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Implement the actions to address OFSTED findings
                </li>
              </ul>
            </div>
            <button
              onClick={resetForm}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Generate Another Report
            </button>
          </div>
        ) : (
          // Upload Form
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Progress Steps */}
            <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${status === 'idle' || status === 'error' ? 'bg-indigo-600 text-white' : 'bg-green-500 text-white'}`}>
                    {status === 'idle' || status === 'error' ? '1' : '✓'}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">Upload Report</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${status === 'processing' ? 'bg-indigo-600 text-white' : status === 'success' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                    {status === 'success' ? '✓' : '2'}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">AI Analysis</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${status === 'success' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                    {status === 'success' ? '✓' : '3'}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">Receive Plan</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* File Upload Area */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    OFSTED Inspection Report
                  </label>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl p-12 text-center transition ${
                      dragActive
                        ? 'border-indigo-600 bg-indigo-50'
                        : file
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-indigo-400 bg-gray-50'
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={loading}
                    />
                    
                    {file ? (
                      <div className="space-y-3">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <FileText className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Change file
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                          <Upload className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">Drop your PDF here</p>
                          <p className="text-sm text-gray-600">or click to browse</p>
                        </div>
                        <p className="text-xs text-gray-500">Maximum file size: 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="manager@childrenservices.co.uk"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    required
                    disabled={loading}
                  />
                  <p className="mt-2 text-xs text-gray-600">We'll send your action plan to this address</p>
                </div>

                {/* Home Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Children's Home Name
                  </label>
                  <input
                    type="text"
                    value={homeName}
                    onChange={(e) => setHomeName(e.target.value)}
                    placeholder="e.g., Sunshine Care Home"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Status Message */}
                {message && (
                  <div className={`p-4 rounded-lg flex items-start space-x-3 ${
                    status === 'success' ? 'bg-green-50 border border-green-200' :
                    status === 'error' ? 'bg-red-50 border border-red-200' :
                    'bg-blue-50 border border-blue-200'
                  }`}>
                    {status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : status === 'error' ? (
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    ) : (
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin mt-0.5" />
                    )}
                    <p className={`text-sm font-medium ${
                      status === 'success' ? 'text-green-800' :
                      status === 'error' ? 'text-red-800' :
                      'text-blue-800'
                    }`}>
                      {message}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !file || !email || !homeName}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      <span>Generate Action Plan</span>
                    </>
                  )}
                </button>
              </form>

              {/* Info Box */}
              <div className="mt-8 bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                <h3 className="font-semibold text-indigo-900 mb-3">What you'll receive:</h3>
                <ul className="space-y-2 text-sm text-indigo-800">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-indigo-600" />
                    Comprehensive action plan addressing all OFSTED findings
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-indigo-600" />
                    Specific recommendations with realistic timelines
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-indigo-600" />
                    References to relevant Quality Standards
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-indigo-600" />
                    Delivered to your email within 2-5 minutes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
