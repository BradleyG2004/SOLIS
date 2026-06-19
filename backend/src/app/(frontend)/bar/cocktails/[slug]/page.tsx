import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCocktailBySlug } from '@/lib/data'
import { formatPrice } from '@/lib/format'
import type { CocktailComposition, Equipment } from '@/lib/types'

type Props = { params: Promise<{ slug: string }> }

const COCKTAIL_KEYWORD_IMGS: Array<{ keys: string[]; url: string }> = [
  { keys: ['mojito'], url: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=900&q=85&auto=format&fit=crop' },
  { keys: ['margarita'], url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop' },
  { keys: ['whisky', 'whiskey', 'bourbon', 'old fashioned'], url: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=900&q=85&auto=format&fit=crop' },
  { keys: ['gin', 'tonic', 'fizz'], url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=900&q=85&auto=format&fit=crop' },
  { keys: ['champagne', 'prosecco', 'spritz', 'pétillant'], url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=85&auto=format&fit=crop' },
  { keys: ['rhum', 'rum', 'daiquiri', 'piña', 'pina', 'dark', 'stormy'], url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=900&q=85&auto=format&fit=crop' },
  { keys: ['vodka', 'cosmopolitan'], url: 'https://images.unsplash.com/photo-1541542832459-9beafde5c97f?w=900&q=85&auto=format&fit=crop' },
  { keys: ['tropical', 'fruit', 'passion', 'mangue', 'coco'], url: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=900&q=85&auto=format&fit=crop' },
]

const COCKTAIL_FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=900&q=85&auto=format&fit=crop',
]

function getImg(id: string, name: string) {
  const lower = (name ?? '').toLowerCase()
  for (const entry of COCKTAIL_KEYWORD_IMGS) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.url
  }
  const idx = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % COCKTAIL_FALLBACK_IMGS.length
  return COCKTAIL_FALLBACK_IMGS[idx]
}

function getIngredientName(item: CocktailComposition) {
  const ing = item.ingredient
  if (typeof ing === 'object' && ing !== null) return ing.name
  return 'Ingrédient'
}

function getEquipmentName(eq: Equipment | string) {
  if (typeof eq === 'object' && eq !== null) return eq.name
  return ''
}

export default async function CocktailDetailPage({ params }: Props) {
  const { slug } = await params
  const cocktail = await getCocktailBySlug(slug)
  if (!cocktail) notFound()

  return (
    <div className="theme-bar">
      <div className="detail-page container">
        <Link href="/bar" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
          ← Bar
        </Link>

        <img
          className="detail-img"
          src={getImg(cocktail.id, cocktail.name)}
          alt={cocktail.name}
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,.5)' }}
        />

        <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pole-accent)', marginBottom: '0.5rem' }}>
          Cocktail signature
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--pole-text)', marginBottom: '0.5rem' }}>
          {cocktail.name}
        </h1>
        {cocktail.price != null && (
          <p className="detail-price">{formatPrice(cocktail.price)}</p>
        )}
        {cocktail.description && (
          <p style={{ color: 'var(--pole-text-muted)', lineHeight: 1.75, marginTop: '0.75rem', maxWidth: '58ch' }}>
            {cocktail.description}
          </p>
        )}

        {cocktail.composition && cocktail.composition.length > 0 && (
          <>
            <h2 className="detail-section-title">Composition</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', listStyle: 'none' }}>
              {cocktail.composition.map((item, i) => (
                <li key={item.id || i} style={{ fontSize: '0.9rem', color: 'var(--pole-text-muted)', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--pole-accent)', fontWeight: 600 }}>·</span>
                  {getIngredientName(item)} — {item.quantity} {item.unit}
                </li>
              ))}
            </ul>
          </>
        )}

        {cocktail.equipment && cocktail.equipment.length > 0 && (
          <>
            <h2 className="detail-section-title">Matériel</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', listStyle: 'none' }}>
              {cocktail.equipment.map((eq, i) => (
                <li key={i} style={{ fontSize: '0.9rem', color: 'var(--pole-text-muted)', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--pole-accent)', fontWeight: 600 }}>·</span>
                  {getEquipmentName(eq)}
                </li>
              ))}
            </ul>
          </>
        )}

        {cocktail.instructions && (
          <>
            <h2 className="detail-section-title">Préparation</h2>
            <p style={{ color: 'var(--pole-text-muted)', lineHeight: 1.75, fontSize: '0.95rem' }}>
              {cocktail.instructions}
            </p>
          </>
        )}

        <div className="detail-actions">
          <Link href="/bar/creer" className="btn bar-cta-primary">
            Créer mon cocktail →
          </Link>
        </div>
      </div>
    </div>
  )
}
