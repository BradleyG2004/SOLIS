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
            <h1>SOLISS Laundry</h1>
            <p className="laundry-hero-desc">
              {settings.laundryIntro || 'Collecte, nettoyage professionnel et livraison à domicile.'}
            </p>
            <Link href="/laundry/devis" className="btn laundry-cta">
              Demander un devis
            </Link>

            <div className="laundry-trust">
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <span>Livraison 24–48h</span>
              </div>
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span>Textile protégé</span>
              </div>
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                <span>Collecte à domicile</span>
              </div>
            </div>
          </div>

          <div className="laundry-hero-visual animate-fade-up-delay-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&q=85&auto=format&fit=crop"
              alt="SOLISS Laundry — pressing professionnel"
            />
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ──────────────────────────────────── */}
      <section className="laundry-steps">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '40px' }}>
            Comment ça marche
          </h2>
          <div className="steps-grid">
            {[
              {
                num: '01',
                title: 'Choisissez votre offre',
                desc: 'Sélectionnez la formule adaptée et demandez un devis en ligne.',
                icon: (
                  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 18 L16 24 L26 12" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="1" y="1" width="34" height="34" stroke="#E5E5E5" strokeWidth="2" />
                  </svg>
                ),
              },
              {
                num: '02',
                title: 'Collecte à domicile',
                desc: 'Nous récupérons vos vêtements à l\'adresse et au créneau de votre choix.',
                icon: (
                  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 22 l7-10 h10 l3 5 h4 v9 H4 V22z" stroke="#EF4444" strokeWidth="2" strokeLinejoin="round" fill="none" />
                    <circle cx="11" cy="32" r="3" stroke="#EF4444" strokeWidth="2" />
                    <circle cx="25" cy="32" r="3" stroke="#EF4444" strokeWidth="2" />
                    <rect x="1" y="1" width="34" height="34" stroke="#E5E5E5" strokeWidth="2" />
                  </svg>
                ),
              },
              {
                num: '03',
                title: 'Nettoyage professionnel',
                desc: 'Vos pièces sont traitées avec soin par nos experts du pressing.',
                icon: (
                  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="20" r="8" stroke="#EF4444" strokeWidth="2" />
                    <circle cx="18" cy="20" r="4" stroke="#EF4444" strokeWidth="1.5" />
                    <path d="M12 12 Q14 6 18 4 Q22 6 24 12" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <rect x="1" y="1" width="34" height="34" stroke="#E5E5E5" strokeWidth="2" />
                  </svg>
                ),
              },
              {
                num: '04',
                title: 'Livraison chez vous',
                desc: 'Vos vêtements reviennent propres, repassés et emballés sous 24–48h.',
                icon: (
                  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 32 C18 32 6 24 6 15 a12 12 0 0 1 24 0 C30 24 18 32 18 32z" stroke="#EF4444" strokeWidth="2" fill="none" />
                    <circle cx="18" cy="15" r="4" stroke="#EF4444" strokeWidth="2" />
                    <rect x="1" y="1" width="34" height="34" stroke="#E5E5E5" strokeWidth="2" />
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
          <p style={{ color: 'var(--pole-muted, var(--color-muted))' }}>Aucune offre disponible pour le moment.</p>
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
