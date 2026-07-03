import Link from 'next/link'
import { formatPrice } from '@/lib/format'
import type { Cocktail, Media } from '@/lib/types'

function getUploadedImg(cocktail: Cocktail): string | null {
  if (!cocktail.image) return null
  if (typeof cocktail.image === 'object' && (cocktail.image as Media).url) {
    return (cocktail.image as Media).url!
  }
  return null
}

const KEYWORD_IMGS: Array<{ keys: string[]; url: string }> = [
  {
    keys: ['mojito'],
    url: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['margarita'],
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['whisky', 'whiskey', 'bourbon', 'old fashioned'],
    url: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['gin', 'tonic'],
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['champagne', 'prosecco', 'spritz', 'pétillant'],
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['rhum', 'rum', 'daiquiri', 'piña', 'pina'],
    url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['vodka', 'cosmopolitan'],
    url: 'https://images.unsplash.com/photo-1541542832459-9beafde5c97f?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['tropical', 'fruit', 'passion', 'mangue', 'coco'],
    url: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=480&q=80&auto=format&fit=crop',
  },
]

const FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=480&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=480&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=480&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=480&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=480&q=80&auto=format&fit=crop',
]

function getCocktailImg(id: string | number, name: string): string {
  const lower = (name ?? '').toLowerCase()
  for (const entry of KEYWORD_IMGS) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.url
  }
  const idx = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % FALLBACK_IMGS.length
  return FALLBACK_IMGS[idx]
}

export function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  const imgSrc = getUploadedImg(cocktail) ?? getCocktailImg(cocktail.id, cocktail.name)
  return (
    <Link href={`/bar/cocktails/${cocktail.slug}`} className="card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="card-img"
        src={imgSrc}
        alt={cocktail.name}
        loading="lazy"
      />
      <div className="card-body">
        <h3>{cocktail.name}</h3>
        {cocktail.description && <p className="meta">{cocktail.description}</p>}
        {cocktail.price != null && (
          <span className="price">À partir de {formatPrice(cocktail.price)}</span>
        )}
      </div>
    </Link>
  )
}
