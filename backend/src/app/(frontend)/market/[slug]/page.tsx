import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/ProductCard'
import { getCategoryBySlug, getProductsByCategory } from '@/lib/data'

type Props = { params: Promise<{ slug: string }> }

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const products = await getProductsByCategory(category.id)

  return (
    <div className="theme-market">
      <section className="pole-hero">
        <div className="container">
          <Link href="/market" className="back-link">
            ← Catalogue
          </Link>
          <h1>{category.name}</h1>
          {category.description && <p>{category.description}</p>}
        </div>
      </section>

      <section className="section container">
        {products.length === 0 ? (
          <p style={{ color: 'var(--color-muted)' }}>Aucun produit dans cette catégorie pour le moment.</p>
        ) : (
          <div className="grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
