import Link from 'next/link'
import { CocktailCard } from '@/components/CocktailCard'
import { getCocktails, getSiteSettings } from '@/lib/data'

export default async function BarPage() {
  const [cocktails, settings] = await Promise.all([
    getCocktails(),
    getSiteSettings().catch(() => ({ barIntro: '' })),
  ])

  return (
    <div className="theme-bar">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="bar-hero">
        <div className="container bar-hero-inner">
          <div className="animate-fade-up">
            <span className="bar-hero-label">Bar à cocktails</span>
            <h1>SOLIS Bar</h1>
            <p className="bar-hero-desc">
              {settings.barIntro || 'Cocktails signature et créations personnalisées.'}
            </p>
            <div className="bar-hero-actions">
              <Link href="/bar/creer" className="btn bar-cta-primary">
                Créer mon cocktail
              </Link>
              <Link href="#carte" className="btn bar-cta-ghost">
                Voir la carte
              </Link>
            </div>
          </div>
          <div className="bar-hero-visual animate-fade-up-delay-1">
            <img
              src="https://images.unsplash.com/photo-1470338745628-171cf53de3a8?w=800&q=85&auto=format&fit=crop"
              alt="SOLIS Bar — cocktails"
            />
          </div>
        </div>
      </section>

      {/* ── Carte ──────────────────────────────────────────────── */}
      <section className="section container" id="carte">
        <h2 className="section-title">Cocktails signature</h2>
        {cocktails.length === 0 ? (
          <p style={{ color: 'var(--color-muted)' }}>Aucun cocktail disponible pour le moment.</p>
        ) : (
          <div className="grid">
            {cocktails.map((cocktail) => (
              <CocktailCard key={cocktail.id} cocktail={cocktail} />
            ))}
          </div>
        )}
      </section>

      {/* ── CTA créateur ───────────────────────────────────────── */}
      <section className="bar-cta-band">
        <div className="container bar-cta-band-inner">
          <div>
            <h2>Un cocktail à ton image</h2>
            <p>Choisis tes ingrédients, on fait le reste.</p>
          </div>
          <Link href="/bar/creer" className="btn bar-cta-primary">
            Créer mon cocktail →
          </Link>
        </div>
      </section>

    </div>
  )
}
