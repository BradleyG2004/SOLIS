import Link from 'next/link'
import { CocktailBuilder } from '@/components/CocktailBuilder'
import { getIngredients, getSiteSettings } from '@/lib/data'
import type { SiteSettings } from '@/lib/types'

export default async function CreateCocktailPage() {
  const [ingredients, settings] = await Promise.all([
    getIngredients(),
    getSiteSettings().catch(
      (): SiteSettings => ({ paymentNotice: undefined, whatsappNumber: undefined }),
    ),
  ])

  return (
    <div className="theme-bar">
      <section className="pole-hero">
        <div className="container">
          <Link href="/bar" className="back-link">
            ← Bar
          </Link>
          <h1>Créer mon cocktail</h1>
          <p>Composez votre cocktail à partir de notre catalogue d&apos;ingrédients, puis commandez-le.</p>
        </div>
      </section>
      <section className="section container" style={{ maxWidth: '640px' }}>
        <CocktailBuilder ingredients={ingredients} whatsappNumber={settings.whatsappNumber} />
      </section>
    </div>
  )
}
