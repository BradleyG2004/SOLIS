import Link from 'next/link'
import { getSiteSettings } from '@/lib/data'

export default async function HomePage() {
  const settings = await getSiteSettings().catch(() => ({
    homeTagline: 'Trois univers, une même exigence.',
    homeDescription: 'SOLIS TRILL réunit un market curaté, un bar créatif et un service de pressing à domicile.',
    marketIntro: 'Produits sélectionnés, prix clairs.',
    barIntro: 'Cocktails signature et créations sur mesure.',
    laundryIntro: 'Pressing à domicile, collecte et livraison.',
  }))

  return (
    <>
      <section className="home-hero container animate-fade-up">
        <h1>SOLIS TRILL</h1>
        <p className="tagline">{settings.homeTagline}</p>
        {settings.homeDescription && (
          <p className="description">{settings.homeDescription}</p>
        )}
      </section>

      <section className="container home-poles">

        <article className="pole-card market animate-fade-up-delay-1">
          <div className="pole-card-visual">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=640&q=80&auto=format&fit=crop"
              alt="SOLIS Market — produits épicerie fine"
              loading="lazy"
            />
          </div>
          <div className="pole-card-body">
            <h2>SOLIS Market</h2>
            <p>{settings.marketIntro}</p>
            <Link href="/market" className="btn pole-btn-market">Voir le catalogue</Link>
          </div>
        </article>

        <article className="pole-card bar animate-fade-up-delay-2">
          <div className="pole-card-visual">
            <img
              src="https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=640&q=80&auto=format&fit=crop"
              alt="SOLIS Bar — cocktails signature"
              loading="lazy"
            />
          </div>
          <div className="pole-card-body">
            <h2>SOLIS Bar</h2>
            <p>{settings.barIntro}</p>
            <Link href="/bar" className="btn pole-btn-bar">Découvrir le bar</Link>
          </div>
        </article>

        <article className="pole-card laundry animate-fade-up-delay-3">
          <div className="pole-card-visual">
            <img
              src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=640&q=80&auto=format&fit=crop"
              alt="SOLIS Laundry — pressing à domicile"
              loading="lazy"
            />
          </div>
          <div className="pole-card-body">
            <h2>SOLIS Laundry</h2>
            <p>{settings.laundryIntro}</p>
            <Link href="/laundry" className="btn pole-btn-laundry">Nos offres pressing</Link>
          </div>
        </article>

      </section>
    </>
  )
}
