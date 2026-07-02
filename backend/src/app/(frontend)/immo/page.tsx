import Link from 'next/link'

export default function ImmoPage() {
  return (
    <div className="theme-immo">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="immo-hero">
        <div className="container immo-hero-inner">
          <div className="animate-fade-up">
            <span className="immo-hero-label">Transport immobilier</span>
            <h1>SOLISS Immo</h1>
            <p className="immo-hero-desc">
              Déménagement, livraison de meubles et transport de charges lourdes par tricycle motorisé. Rapide, accessible, local.
            </p>
            <Link href="/immo/devis" className="btn immo-cta">
              Demander un devis
            </Link>

            <div className="laundry-trust">
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span>Collecte à domicile</span>
              </div>
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Livraison rapide</span>
              </div>
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <span>Tricycle motorisé</span>
              </div>
            </div>
          </div>

          <div className="immo-hero-visual animate-fade-up-delay-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop"
              alt="SOLISS Immo — transport par tricycle"
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
                title: 'Décrivez votre besoin',
                desc: 'Type de charge, dimensions, point de départ et destination. Devis en ligne en 2 minutes.',
                icon: (
                  <svg viewBox="0 0 36 36" fill="none">
                    <rect x="6" y="8" width="24" height="20" rx="0" stroke="#EF4444" strokeWidth="2"/>
                    <path d="M11 14h14M11 19h10M11 24h6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="1" y="1" width="34" height="34" stroke="#E5E5E5" strokeWidth="2"/>
                  </svg>
                ),
              },
              {
                num: '02',
                title: 'On confirme & on vient',
                desc: 'Notre équipe confirme le créneau et se présente à l\'adresse convenue avec le tricycle.',
                icon: (
                  <svg viewBox="0 0 36 36" fill="none">
                    <path d="M4 22 l7-10 h10 l3 5 h4 v9 H4 V22z" stroke="#EF4444" strokeWidth="2" strokeLinejoin="round" fill="none"/>
                    <circle cx="11" cy="32" r="3" stroke="#EF4444" strokeWidth="2"/>
                    <circle cx="25" cy="32" r="3" stroke="#EF4444" strokeWidth="2"/>
                    <rect x="1" y="1" width="34" height="34" stroke="#E5E5E5" strokeWidth="2"/>
                  </svg>
                ),
              },
              {
                num: '03',
                title: 'Chargement sécurisé',
                desc: 'Vos affaires sont arrimées et protégées avant le départ. Pas de surprise en route.',
                icon: (
                  <svg viewBox="0 0 36 36" fill="none">
                    <path d="M18 4 L28 9 V19 C28 25 18 32 18 32 C18 32 8 25 8 19 V9 Z" stroke="#EF4444" strokeWidth="2" fill="none"/>
                    <path d="M13 18 L16 21 L23 14" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="1" y="1" width="34" height="34" stroke="#E5E5E5" strokeWidth="2"/>
                  </svg>
                ),
              },
              {
                num: '04',
                title: 'Livré à destination',
                desc: 'Dépôt soigné à l\'endroit voulu, même en étage. Mission accomplie.',
                icon: (
                  <svg viewBox="0 0 36 36" fill="none">
                    <path d="M18 32 C18 32 6 24 6 15 a12 12 0 0 1 24 0 C30 24 18 32 18 32z" stroke="#EF4444" strokeWidth="2" fill="none"/>
                    <circle cx="18" cy="15" r="4" stroke="#EF4444" strokeWidth="2"/>
                    <rect x="1" y="1" width="34" height="34" stroke="#E5E5E5" strokeWidth="2"/>
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

      {/* ── Ce qu'on transporte ────────────────────────────────── */}
      <section className="section container">
        <h2 className="section-title">Ce qu'on transporte</h2>
        <div className="immo-services-grid">
          {[
            { title: 'Meubles & électroménager', desc: 'Canapés, armoires, frigos, machines à laver — jusqu\'à la limite du tricycle.' },
            { title: 'Déménagement local', desc: 'Quartier à quartier, appartement à appartement. Rapide et sans camion.' },
            { title: 'Livraison e-commerce', desc: 'Vous avez commandé quelque chose de volumineux ? On récupère et on livre.' },
            { title: 'Charges diverses', desc: 'Matériaux, colis lourds, équipements professionnels. Devis sur mesure.' },
          ].map((s) => (
            <div key={s.title} className="immo-service-item">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA bas ────────────────────────────────────────────── */}
      <div className="immo-cta-band">
        <div className="container bar-cta-band-inner">
          <div>
            <h2>Prêt à déménager ?</h2>
            <p>Décrivez votre besoin, on s'occupe du reste.</p>
          </div>
          <Link href="/immo/devis" className="btn immo-cta-btn">
            Demander un devis →
          </Link>
        </div>
      </div>

    </div>
  )
}
