import Link from 'next/link'
import { QuoteForm } from '@/components/QuoteForm'
import { getLaundryOffers, getSiteSettings } from '@/lib/data'
import type { SiteSettings } from '@/lib/types'

export default async function DevisPage() {
  const [offers, settings] = await Promise.all([
    getLaundryOffers(),
    getSiteSettings().catch(
      (): SiteSettings => ({ paymentNotice: undefined, whatsappNumber: undefined }),
    ),
  ])

  return (
    <div className="theme-laundry">
      <section className="pole-hero">
        <div className="container">
          <Link href="/laundry" className="back-link">
            ← Offres pressing
          </Link>
          <h1>Demande de devis</h1>
          <p>Décrivez votre besoin et recevez une estimation sous 24 à 48 h.</p>
        </div>
      </section>
      <section className="section container" style={{ maxWidth: '640px' }}>
        <QuoteForm offers={offers} whatsappNumber={settings.whatsappNumber} />
      </section>
    </div>
  )
}
