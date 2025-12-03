import './globals.css'

export const metadata = {
  title: 'OFSTED Action Plan Generator',
  description: 'AI-powered action plans from OFSTED reports',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
