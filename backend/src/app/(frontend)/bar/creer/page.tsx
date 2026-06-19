import Link from 'next/link'
import { CocktailBuilder } from '@/components/CocktailBuilder'
import { getIngredients } from '@/lib/data'

export default async function CreateCocktailPage() {
  const ingredients = await getIngredients()

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
        <CocktailBuilder ingredients={ingredients} />
      </section>
    </div>
  )
}
