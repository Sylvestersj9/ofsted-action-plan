'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const hidePricingCta = pathname === '/success' || pathname === '/upload'

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="https://ziantra.co.uk/favicon.svg" 
              alt="Ziantra" 
              className="w-8 h-8"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 text-lg leading-tight">Ofsted Action Plan Generator</span>
              <span className="text-xs text-slate-500">Powered by Ziantra</span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Home
            </Link>
            <Link href="/demo" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Demo
            </Link>
            {!hidePricingCta && (
              <a 
                href="https://buy.stripe.com/cNi00ieL5bO36yh1ZJd3i00" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Get Started - £30
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  