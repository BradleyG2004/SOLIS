import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PaymentBadge } from '@/components/PaymentBadge'
import { getProductBySlug, getSiteSettings } from '@/lib/data'
import { formatPrice } from '@/lib/format'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import type { SiteSettings } from '@/lib/types'

type Props = { params: Promise<{ slug: string }> }

const DETAIL_KEYWORD_IMGS: Array<{ keys: string[]; url: string }> = [
  { keys: ['écouteur', 'ecouteur', 'casque', 'bluetooth', 'airpod'], url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85&auto=format&fit=crop' },
  { keys: ['batterie', 'powerbank', 'chargeur', 'câble', 'cable', 'usb'], url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=900&q=85&auto=format&fit=crop' },
  { keys: ['support', 'phone', 'mobile', 'smartphone'], url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=900&q=85&auto=format&fit=crop' },
  { keys: ['tote', 'sac', 'bag'], url: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=900&q=85&auto=format&fit=crop' },
  { keys: ['porte-clés', 'porte cles', 'keychain'], url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop' },
  { keys: ['écharpe', 'echarpe', 'scarf'], url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=900&q=85&auto=format&fit=crop' },
  { keys: ['carnet', 'notebook'], url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=900&q=85&auto=format&fit=crop' },
  { keys: ['cendrier', 'ashtray'], url: 'https://images.unsplash.com/photo-1599909631671-8d86ae6e53e9?w=900&q=85&auto=format&fit=crop' },
  { keys: ['briquet', 'lighter'], url: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=900&q=85&auto=format&fit=crop' },
  { keys: ['étui', 'etui', 'porte-cigarette'], url: 'https://images.unsplash.com/photo-1574169207511-e21a21c8075a?w=900&q=85&auto=format&fit=crop' },
  { keys: ['bougie', 'candle'], url: 'https://images.unsplash.com/photo-1602607041518-6a8b9ab83ab4?w=900&q=85&auto=format&fit=crop' },
  { keys: ['huile essentielle', 'aromathérapie', 'roll-on'], url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=900&q=85&auto=format&fit=crop' },
  { keys: ['sels de bain', 'bain', 'bath'], url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=85&auto=format&fit=crop' },
  { keys: ['carte cadeau', 'gift card', 'carte'], url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85&auto=format&fit=crop' },
  { keys: ['recharge', 'streaming', 'abonnement'], url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=900&q=85&auto=format&fit=crop' },
  { keys: ['miel', 'honey'], url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=900&q=85&auto=format&fit=crop' },
  { keys: ['granola', 'muesli'], url: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=900&q=85&auto=format&fit=crop' },
  { keys: ['confiture', 'jam'], url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=900&q=85&auto=format&fit=crop' },
  { keys: ['huile', 'oil', 'olive'], url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=900&q=85&auto=format&fit=crop' },
  { keys: ['café', 'cafe', 'coffee', 'thé', 'tea'], url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85&auto=format&fit=crop' },
  { keys: ['épice', 'epice', 'spice', 'poivre', 'sel'], url: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=900&q=85&auto=format&fit=crop' },
  { keys: ['savon', 'soap', 'hygiène', 'hygiene', 'crème'], url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=900&q=85&auto=format&fit=crop' },
  { keys: ['fruit', 'légume', 'legume', 'mangue', 'ananas'], url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=85&auto=format&fit=crop' },
]

const DETAIL_FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1605347220445-39b42f8b6583?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589881133825-bca9c7575d21?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=900&q=85&auto=format&fit=crop',
]

function getImg(id: string | number, name: string) {
  const lower = (name ?? '').toLowerCase()
  for (const entry of DETAIL_KEYWORD_IMGS) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.url
  }
  const idx = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % DETAIL_FALLBACK_IMGS.length
  return DETAIL_FALLBACK_IMGS[idx]
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings().catch(
      (): SiteSettings => ({ paymentNotice: undefined, whatsappNumber: undefined }),
    ),
  ])
  if (!product) notFound()

  const category =
    typeof product.category === 'object' && product.category !== null
      ? product.category
      : null

  const imgSrc =
    product.image && typeof product.image === 'object' && (product.image as { url?: string }).url
      ? (product.image as { url: string }).url
      : getImg(product.id, product.name)

  return (
    <div className="theme-market">
      <div className="detail-page container">
        <Link href={category ? `/market/${category.slug}` : '/market'} className="back-link" style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          ← {category?.name || 'Catalogue'}
        </Link>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="detail-img"
          src={imgSrc}
          alt={product.name}
        />

        {category && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--vb-red)', marginBottom: '8px' }}>
            {category.name}
          </p>
        )}
        <h1 style={{ marginBottom: '8px' }}>
          {product.name}
        </h1>
        <p className="detail-price">{formatPrice(product.price)}</p>

        {product.description && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--vb-muted)', lineHeight: 1.75, marginTop: '16px', maxWidth: '60ch' }}>
            {product.description}
          </p>
        )}

        <div className="detail-actions">
          {settings.whatsappNumber ? (
            <a
              href={buildWhatsAppLink(
                settings.whatsappNumber,
                `Bonjour, je suis intéressé(e) par ce produit :\n\n*${product.name}*\nPrix : ${formatPrice(product.price)}${category ? `\nCatégorie : ${category.name}` : ''}\n\nEst-il disponible ?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Commander sur WhatsApp
            </a>
          ) : (
            <button type="button" className="btn btn-disabled" disabled>
              Commander
            </button>
          )}
          <PaymentBadge message={settings.paymentNotice ?? undefined} />
        </div>
      </div>
    </div>
  )
}
