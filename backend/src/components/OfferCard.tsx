import Link from 'next/link'
import { formatPrice } from '@/lib/format'
import type { LaundryOffer, Media } from '@/lib/types'

const KEYWORD_IMGS: Array<{ keys: string[]; url: string }> = [
  {
    keys: ['express', 'urgence', 'rapide', '24'],
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['standard', 'classique', '48', 'lavage', 'nettoyage'],
    url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['abonnement', 'mensuel', 'subscription', 'forfait'],
    url: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['chemise', 'shirt', 'costume', 'veste', 'jacket', 'blazer', 'tailleur'],
    url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['robe', 'dress', 'delicate', 'délicat', 'soie', 'silk'],
    url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['couette', 'duvet', 'linge', 'draps', 'sheets', 'literie'],
    url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['sport', 'gym', 'running'],
    url: 'https://images.unsplash.com/photo-1562183241-b937e9102d69?w=480&q=80&auto=format&fit=crop',
  },
]

const FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=480&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=480&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=480&q=80&auto=format&fit=crop',
]

function getOfferImg(id: string | number, name: string): string {
  const lower = (name ?? '').toLowerCase()
  for (const entry of KEYWORD_IMGS) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.url
  }
  const idx = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % FALLBACK_IMGS.length
  return FALLBACK_IMGS[idx]
}

function getUploadedImg(offer: LaundryOffer): string | null {
  if (!offer.image) return null
  if (typeof offer.image === 'object' && (offer.image as Media).url) {
    return (offer.image as Media).url!
  }
  return null
}

export function OfferCard({ offer }: { offer: LaundryOffer }) {
  return (
    <article className="card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="card-img"
        src={getUploadedImg(offer) ?? getOfferImg(offer.id, offer.name)}
        alt={offer.name}
        loading="lazy"
      />
      <div className="card-body">
        <h3>{offer.name}</h3>
        {offer.description && <p className="meta">{offer.description}</p>}

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '12px 0' }}>
          {offer.price != null && (
            <span className="price" style={{ margin: 0 }}>
              À partir de {formatPrice(offer.price)}
            </span>
          )}
          {offer.deliveryDays != null && (
            <span className="tag">
              {offer.deliveryDays}j
            </span>
          )}
        </div>

        {offer.features && offer.features.length > 0 && (
          <ul style={{ listStyle: 'none', margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {offer.features.map((f) => (
              <li key={f.id || f.feature} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--pole-muted, var(--color-muted))' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '12px' }}>✓</span>
                {f.feature}
              </li>
            ))}
          </ul>
        )}

        <Link href={`/laundry/devis?offre=${offer.slug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          Demander un devis
        </Link>
      </div>
    </article>
  )
}
