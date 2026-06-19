import type { Metadata } from 'next'
import './globals.css'
import { Footer, Header } from '@/components/Layout'

export const metadata: Metadata = {
  title: 'SOLIS TRILL',
  description: 'SOLIS Market · SOLIS Bar · SOLIS Laundry',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
