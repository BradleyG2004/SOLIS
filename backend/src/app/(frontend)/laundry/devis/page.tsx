import Link from 'next/link'
import { QuoteForm } from '@/components/QuoteForm'
import { getLaundryOffers } from '@/lib/data'

export default async function DevisPage() {
  const offers = await getLaundryOffers()

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
        <QuoteForm offers={offers} />
      </section>
    </div>
  )
}
