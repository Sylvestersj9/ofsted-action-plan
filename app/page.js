'use client';

import Link from 'next/link';
import { FileText, Clock, Shield, CheckCircle, ArrowRight, Mail, Upload, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">OFSTED Action Plan</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">FAQ</a>
              <Link 
                href="/upload-demo"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>AI-Powered Compliance</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your OFSTED Report Into An
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Action Plan</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Upload your OFSTED inspection report and receive a comprehensive, AI-generated action plan within minutes. Save hours of manual work and ensure compliance with Quality Standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/upload-demo"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
                >
                  Start Free Report
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <a 
                  href="#features"
                  className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition"
                >
                  Learn More
                </a>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>First report free</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>2-5 minute delivery</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>£15 per report</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div className="h-3 bg-green-100 rounded flex-1"></div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div className="h-3 bg-green-100 rounded flex-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for OFSTED Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform analyzes your inspection report and delivers actionable recommendations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: '2-5 Minute Turnaround', description: 'Get your action plan in minutes, not days.' },
              { icon: Shield, title: 'Quality Standards Aligned', description: 'Every recommendation references relevant regulations.' },
              { icon: FileText, title: 'Comprehensive Analysis', description: 'AI identifies all findings and provides specific steps.' },
              { icon: CheckCircle, title: 'Realistic Timelines', description: 'Each action includes timelines and success criteria.' },
              { icon: Mail, title: 'Email Delivery', description: 'Professionally formatted and ready to share.' },
              { icon: Upload, title: 'Simple Upload', description: 'Just upload your PDF. No training required.' }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 mb-12">No subscriptions. Pay only for what you need.</p>
          <div className="max-w-lg mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-xl border-2 border-indigo-200">
            <div className="inline-flex bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              First Report Free
            </div>
            <h3 className="text-2xl font-bold mb-2">Per Report Pricing</h3>
            <div className="flex items-baseline justify-center mb-6">
              <span className="text-5xl font-bold">£15</span>
              <span className="text-gray-600 ml-2">per report</span>
            </div>
            <Link 
              href="/upload-demo"
              className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
            >
              Start Your Free Report
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 Ziantra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
