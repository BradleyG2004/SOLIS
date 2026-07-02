import Link from 'next/link'
import { getSiteSettings } from '@/lib/data'

export default async function HomePage() {
  const settings = await getSiteSettings().catch(() => ({
    homeTagline: 'Cinq univers, une même exigence.',
    homeDescription: 'SOLISS TRILL réunit un market curaté, un bar créatif, un pressing à domicile, du transport immobilier et de la logistique.',
    marketIntro: 'Produits sélectionnés, prix clairs.',
    barIntro: 'Cocktails signature et créations sur mesure.',
    laundryIntro: 'Pressing à domicile, collecte et livraison.',
  }))

  return (
    <>
      <section className="home-hero container animate-fade-up">
        <h1>SOLISS TRILL</h1>
        <p className="tagline">{settings.homeTagline}</p>
        {settings.homeDescription && (
          <p className="description">{settings.homeDescription}</p>
        )}
      </section>

      <section className="container home-poles">

        <article className="pole-card market animate-fade-up-delay-1">
          <div className="pole-card-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=640&q=80&auto=format&fit=crop"
              alt="SOLISS Market — produits épicerie fine"
              loading="lazy"
            />
          </div>
          <div className="pole-card-body">
            <h2>SOLISS Market</h2>
            <p>{settings.marketIntro}</p>
            <Link href="/market" className="btn pole-btn-market">Voir le catalogue</Link>
          </div>
        </article>

        <article className="pole-card bar animate-fade-up-delay-2">
          <div className="pole-card-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFZ2YtIKvmDEvu5FHzpBNR-zMGr0KhpD9o4fGPkhAOuw&s=10"
              alt="SOLISS Bar — cocktails signature"
              loading="lazy"
            />
          </div>
          <div className="pole-card-body">
            <h2>SOLISS Bar</h2>
            <p>{settings.barIntro}</p>
            <Link href="/bar" className="btn pole-btn-bar">Découvrir le bar</Link>
          </div>
        </article>

        <article className="pole-card laundry animate-fade-up-delay-3">
          <div className="pole-card-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=640&q=80&auto=format&fit=crop"
              alt="SOLISS Laundry — pressing à domicile"
              loading="lazy"
            />
          </div>
          <div className="pole-card-body">
            <h2>SOLISS Laundry</h2>
            <p>{settings.laundryIntro}</p>
            <Link href="/laundry" className="btn pole-btn-laundry">Nos offres pressing</Link>
          </div>
        </article>

        <article className="pole-card immo animate-fade-up-delay-3">
          <div className="pole-card-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=640&q=80&auto=format&fit=crop"
              alt="SOLISS Immo — transport immobilier"
              loading="lazy"
            />
          </div>
          <div className="pole-card-body">
            <h2>SOLISS Immo</h2>
            <p>Transport de meubles et charges lourdes par tricycle motorisé. Local et rapide.</p>
            <Link href="/immo" className="btn pole-btn-immo">Demander un devis</Link>
          </div>
        </article>

        <article className="pole-card transit animate-fade-up-delay-3">
          <div className="pole-card-visual pole-card-visual-unavailable">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=640&q=80&auto=format&fit=crop"
              alt="SOLISS Transit — logistique"
              loading="lazy"
            />
            <div className="pole-unavailable-badge">BIENTÔT</div>
          </div>
          <div className="pole-card-body">
            <h2>SOLISS Transit</h2>
            <p>Logistique et transport à grande échelle. Suivi en temps réel, flotte dédiée — en cours de déploiement.</p>
            <Link href="/transit" className="btn pole-btn-transit">En savoir plus</Link>
          </div>
        </article>

      </section>
    </>
  )
}
