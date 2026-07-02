import type { Metadata } from 'next'
import './globals.css'
import { Footer, Header } from '@/components/Layout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'SOLISS TRILL',
  description: 'SOLISS Market · SOLISS Bar · SOLISS Laundry',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="vb-root">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
