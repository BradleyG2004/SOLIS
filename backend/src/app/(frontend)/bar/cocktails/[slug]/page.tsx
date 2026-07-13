import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCocktailBySlug, getSiteSettings } from '@/lib/data'
import { formatPrice } from '@/lib/format'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import type { CocktailComposition, Equipment, SiteSettings } from '@/lib/types'

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

function getImg(id: string | number, name: string) {
  const lower = (name ?? '').toLowerCase()
  for (const entry of COCKTAIL_KEYWORD_IMGS) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.url
  }
  const idx = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % COCKTAIL_FALLBACK_IMGS.length
  return COCKTAIL_FALLBACK_IMGS[idx]
}

function getIngredientName(item: CocktailComposition) {
  const ing = item.ingredient
  if (typeof ing === 'object' && ing !== null) return ing.name
  return 'Ingrédient'
}

function getEquipmentName(eq: Equipment | number) {
  if (typeof eq === 'object' && eq !== null) return eq.name
  return ''
}

export default async function CocktailDetailPage({ params }: Props) {
  const { slug } = await params
  const [cocktail, settings] = await Promise.all([
    getCocktailBySlug(slug),
    getSiteSettings().catch(
      (): SiteSettings => ({ paymentNotice: undefined, whatsappNumber: undefined }),
    ),
  ])
  if (!cocktail) notFound()

  const imgSrc =
    cocktail.image && typeof cocktail.image === 'object' && (cocktail.image as { url?: string }).url
      ? (cocktail.image as { url: string }).url
      : getImg(cocktail.id, cocktail.name)

  return (
    <div className="theme-bar">
      <div className="detail-page container">
        <Link href="/bar" className="back-link" style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          ← Bar
        </Link>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="detail-img"
          src={imgSrc}
          alt={cocktail.name}
        />

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--vb-red)', marginBottom: '8px' }}>
          Cocktail signature
        </p>
        <h1 style={{ color: 'var(--pole-text)', marginBottom: '8px' }}>
          {cocktail.name}
        </h1>
        {cocktail.price != null && (
          <p className="detail-price">{formatPrice(cocktail.price)}</p>
        )}
        {cocktail.description && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--pole-muted)', lineHeight: 1.75, marginTop: '16px', maxWidth: '58ch' }}>
            {cocktail.description}
          </p>
        )}

        {cocktail.composition && cocktail.composition.length > 0 && (
          <>
            <h2 className="detail-section-title">Composition</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
              {cocktail.composition.map((item, i) => (
                <li key={item.id || i} style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--pole-muted)', display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                  <span style={{ color: 'var(--vb-red)', fontWeight: 700, fontSize: '12px' }}>—</span>
                  {getIngredientName(item)} — {item.quantity} {item.unit}
                </li>
              ))}
            </ul>
          </>
        )}

        {cocktail.equipment && cocktail.equipment.length > 0 && (
          <>
            <h2 className="detail-section-title">Matériel</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
              {cocktail.equipment.map((eq, i) => (
                <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--pole-muted)', display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                  <span style={{ color: 'var(--vb-red)', fontWeight: 700, fontSize: '12px' }}>—</span>
                  {getEquipmentName(eq)}
                </li>
              ))}
            </ul>
          </>
        )}

        {cocktail.instructions && (
          <>
            <h2 className="detail-section-title">Préparation</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--pole-muted)', lineHeight: 1.75 }}>
              {cocktail.instructions}
            </p>
          </>
        )}

        <div className="detail-actions">
          {settings.whatsappNumber && (
            <a
              href={buildWhatsAppLink(
                settings.whatsappNumber,
                `Bonjour, je suis intéressé(e) par ce cocktail :\n\n*${cocktail.name}*${cocktail.price != null ? `\nPrix : ${formatPrice(cocktail.price)}` : ''}\n\nEst-il disponible ?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Commander
            </a>
          )}
          <Link href="/bar/creer" className="btn bar-cta-primary">
            Créer mon cocktail →
          </Link>
        </div>
      </div>
    </div>
  )
}
