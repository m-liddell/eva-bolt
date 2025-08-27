import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../src/index.css'
import App from '../src/App'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EVA - Educational Virtual Assistant',
  description: 'Your Educational Virtual Assistant for planning, teaching, and assessment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App>
          {children}
        </App>
      </body>
    </html>
  )
}