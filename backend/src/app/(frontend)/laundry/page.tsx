import Link from 'next/link'
import { OfferCard } from '@/components/OfferCard'
import { getLaundryOffers, getSiteSettings } from '@/lib/data'

export default async function LaundryPage() {
  const [offers, settings] = await Promise.all([
    getLaundryOffers(),
    getSiteSettings().catch(() => ({ laundryIntro: '' })),
  ])

  return (
    <div className="theme-laundry">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="laundry-hero">
        <div className="container laundry-hero-inner">
          <div className="animate-fade-up">
            <span className="laundry-hero-label">Pressing à domicile</span>
            <h1>SOLIS Laundry</h1>
            <p className="laundry-hero-desc">
              {settings.laundryIntro || 'Collecte, nettoyage professionnel et livraison à domicile.'}
            </p>
            <Link href="/laundry/devis" className="btn laundry-cta">
              Demander un devis
            </Link>

            <div className="laundry-trust">
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Livraison 24–48h</span>
              </div>
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>Textile protégé</span>
              </div>
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span>Collecte à domicile</span>
              </div>
            </div>
          </div>

          <div className="laundry-hero-visual animate-fade-up-delay-1">
            <img
              src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=85&auto=format&fit=crop"
              alt="SOLIS Laundry — pressing professionnel"
            />
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ──────────────────────────────────── */}
      <section className="laundry-steps">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Comment ça marche
          </h2>
          <div className="steps-grid">
            {[
              {
                num: '01',
                title: 'Choisissez votre offre',
                desc: 'Sélectionnez la formule adaptée et demandez un devis en ligne.',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="#deeaf2"/>
                    <path d="M15 24 L21 30 L33 18" stroke="#1c3844" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="13" y="13" width="22" height="22" rx="6" stroke="#1c3844" strokeWidth="2" fill="none"/>
                  </svg>
                ),
              },
              {
                num: '02',
                title: 'Collecte à domicile',
                desc: 'Nous récupérons vos vêtements à l\'adresse et au créneau de votre choix.',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="#deeaf2"/>
                    <path d="M10 28 l8-12 h12 l4 6 h4 v10 H10 V28z" stroke="#1c3844" strokeWidth="2" fill="none" strokeLinejoin="round"/>
                    <circle cx="17" cy="38" r="3" stroke="#1c3844" strokeWidth="2" fill="white"/>
                    <circle cx="33" cy="38" r="3" stroke="#1c3844" strokeWidth="2" fill="white"/>
                  </svg>
                ),
              },
              {
                num: '03',
                title: 'Nettoyage professionnel',
                desc: 'Vos pièces sont traitées avec soin par nos experts du pressing.',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="#deeaf2"/>
                    <circle cx="24" cy="26" r="10" stroke="#1c3844" strokeWidth="2" fill="none"/>
                    <circle cx="24" cy="26" r="6" stroke="#1c3844" strokeWidth="1.5" fill="none"/>
                    <path d="M18 18 Q20 12 24 10 Q28 12 30 18" stroke="#1c3844" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                num: '04',
                title: 'Livraison chez vous',
                desc: 'Vos vêtements reviennent propres, repassés et emballés sous 24–48h.',
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="#deeaf2"/>
                    <path d="M24 36 C24 36 12 29 12 20 a12 12 0 0 1 24 0 C36 29 24 36 24 36z" stroke="#1c3844" strokeWidth="2" fill="none"/>
                    <circle cx="24" cy="20" r="4" stroke="#1c3844" strokeWidth="2" fill="white"/>
                  </svg>
                ),
              },
            ].map((step) => (
              <div key={step.num} className="step-item">
                <div className="step-icon">{step.icon}</div>
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offres ─────────────────────────────────────────────── */}
      <section className="section container">
        <h2 className="section-title">Nos offres</h2>
        {offers.length === 0 ? (
          <p style={{ color: 'var(--color-muted)' }}>Aucune offre disponible pour le moment.</p>
        ) : (
          <div className="grid">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}
