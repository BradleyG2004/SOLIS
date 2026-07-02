export default function TransitPage() {
  return (
    <div className="theme-transit">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="transit-hero">
        <div className="container transit-hero-inner">
          <div className="animate-fade-up">
            <span className="transit-hero-label">Bientôt disponible</span>
            <h1>SOLISS Transit</h1>
            <p className="transit-hero-desc">
              Un service de transport et logistique à grande échelle. Nous travaillons à vous offrir une solution complète — suivi en temps réel, flotte dédiée, livraisons B2B et particuliers.
            </p>

            <div className="transit-unavailable">
              <span className="transit-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Service en cours de déploiement
              </span>
              <p className="transit-eta">
                Lancement prévu prochainement. Laissez-nous votre contact et soyez parmi les premiers informés.
              </p>
            </div>

            <div className="transit-notify-form">
              <input
                type="email"
                placeholder="votre@email.com"
                className="transit-email-input"
                disabled
                aria-label="Email pour notification"
              />
              <button type="button" className="btn transit-notify-btn" disabled>
                Me notifier
              </button>
            </div>
            <p className="transit-notify-note">Formulaire disponible au lancement.</p>
          </div>

          <div className="transit-hero-visual animate-fade-up-delay-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=85&auto=format&fit=crop"
              alt="SOLISS Transit — logistique en cours"
            />
            <div className="transit-overlay-badge">EN COURS</div>
          </div>
        </div>
      </section>

      {/* ── Ce qui arrive ──────────────────────────────────────── */}
      <section className="laundry-steps">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '40px' }}>
            Ce qui arrive
          </h2>
          <div className="steps-grid">
            {[
              {
                num: '01',
                title: 'Suivi temps réel',
                desc: 'Tracez votre colis ou véhicule en direct depuis l\'application.',
                icon: (
                  <svg viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="10" stroke="#EF4444" strokeWidth="2"/>
                    <circle cx="18" cy="18" r="3" fill="#EF4444"/>
                    <path d="M18 4 V8 M18 28 V32 M4 18 H8 M28 18 H32" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="1" y="1" width="34" height="34" stroke="#E5E5E5" strokeWidth="2"/>
                  </svg>
                ),
              },
              {
                num: '02',
                title: 'Flotte dédiée',
                desc: 'Véhicules légers, camionnettes et partenaires logistiques locaux.',
                icon: (
                  <svg viewBox="0 0 36 36" fill="none">
                    <path d="M2 22 h22 V14 H18 L14 8 H2 Z" stroke="#EF4444" strokeWidth="2" strokeLinejoin="round" fill="none"/>
                    <path d="M24 16 h6 l3 4 v6 H24 V16z" stroke="#EF4444" strokeWidth="2" strokeLinejoin="round" fill="none"/>
                    <circle cx="8" cy="27" r="3" stroke="#EF4444" strokeWidth="2"/>
                    <circle cx="28" cy="27" r="3" stroke="#EF4444" strokeWidth="2"/>
                    <rect x="1" y="1" width="34" height="34" stroke="#E5E5E5" strokeWidth="2"/>
                  </svg>
                ),
              },
              {
                num: '03',
                title: 'B2B & particuliers',
                desc: 'Contrats entreprises, livraisons récurrentes et commandes ponctuelles.',
                icon: (
                  <svg viewBox="0 0 36 36" fill="none">
                    <rect x="7" y="12" width="22" height="16" stroke="#EF4444" strokeWidth="2"/>
                    <path d="M13 12 V9 a5 5 0 0 1 10 0 V12" stroke="#EF4444" strokeWidth="2"/>
                    <path d="M13 20 h10M18 17 v6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="1" y="1" width="34" height="34" stroke="#E5E5E5" strokeWidth="2"/>
                  </svg>
                ),
              },
              {
                num: '04',
                title: 'API & intégration',
                desc: 'Connectez votre boutique ou ERP à SOLISS Transit via notre API.',
                icon: (
                  <svg viewBox="0 0 36 36" fill="none">
                    <rect x="5" y="8" width="11" height="9" stroke="#EF4444" strokeWidth="2"/>
                    <rect x="20" y="19" width="11" height="9" stroke="#EF4444" strokeWidth="2"/>
                    <path d="M16 12 h4 v11" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="1" y="1" width="34" height="34" stroke="#E5E5E5" strokeWidth="2"/>
                  </svg>
                ),
              },
            ].map((step) => (
              <div key={step.num} className="step-item transit-step-disabled">
                <div className="step-icon">{step.icon}</div>
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bande bottom ───────────────────────────────────────── */}
      <div className="transit-bottom-band">
        <div className="container">
          <p className="transit-bottom-text">
            SOLISS Transit est en phase de développement. En attendant, <a href="/immo">SOLISS Immo</a> couvre vos besoins de transport local par tricycle.
          </p>
        </div>
      </div>

    </div>
  )
}
