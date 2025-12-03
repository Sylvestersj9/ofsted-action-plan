'use client'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const hideButton = pathname === '/success' || pathname === '/upload'

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-indigo-600">
              OFSTED Action Plans
            </a>
          </div>
          {!hideButton && (
            <div>
              
                href="https://buy.stripe.com/test_YOUR_PAYMENT_LINK"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get Started - &pound;30
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}