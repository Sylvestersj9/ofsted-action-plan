import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ofsted Action Plan Generator - Turn Inspection Reports into Action Plans',
  description: 'Upload your Ofsted children\'s home inspection report and receive a structured action plan with priorities, deadlines and evidence needed.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-slate-50">
          {children}
        </main>
        <footer className="bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center text-sm text-slate-400">
              <p>&copy; {new Date().getFullYear()} OFSTED Action Plan Generator. All rights reserved.</p>
              <p className="mt-2">Designed for children's home managers and compliance professionals.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
