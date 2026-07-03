import Link from 'next/link'
import { formatPrice } from '@/lib/format'
import type { Media, Product } from '@/lib/types'

function getUploadedImg(product: Product): string | null {
  if (!product.image) return null
  if (typeof product.image === 'object' && (product.image as Media).url) {
    return (product.image as Media).url!
  }
  return null
}

const KEYWORD_IMGS: Array<{ keys: string[]; url: string }> = [
  // Électronique / tech
  {
    keys: ['écouteur', 'ecouteur', 'casque', 'headphone', 'bluetooth', 'airpod'],
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['batterie', 'powerbank', 'chargeur', 'charger', 'câble', 'cable', 'usb'],
    url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['support téléphone', 'support telephone', 'support', 'phone', 'mobile', 'smartphone'],
    url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=480&q=80&auto=format&fit=crop',
  },
  // Accessoires mode
  {
    keys: ['tote', 'sac', 'bag'],
    url: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['porte-clés', 'porte cles', 'porte-cle', 'keychain'],
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['écharpe', 'echarpe', 'scarf', 'foulard'],
    url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['carnet', 'notebook', 'journal'],
    url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=480&q=80&auto=format&fit=crop',
  },
  // Coin fumeur
  {
    keys: ['cendrier', 'ashtray'],
    url: 'https://images.unsplash.com/photo-1599909631671-8d86ae6e53e9?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['briquet', 'lighter'],
    url: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['étui', 'etui', 'porte-cigarette', 'porte cigarette'],
    url: 'https://images.unsplash.com/photo-1574169207511-e21a21c8075a?w=480&q=80&auto=format&fit=crop',
  },
  // Bien-être
  {
    keys: ['bougie', 'candle'],
    url: 'https://images.unsplash.com/photo-1602607041518-6a8b9ab83ab4?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['huile essentielle', 'aromathérapie', 'aromatherapie', 'roll-on', 'roll on'],
    url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['sels de bain', 'bain', 'bath'],
    url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=480&q=80&auto=format&fit=crop',
  },
  // Numérique / cartes
  {
    keys: ['carte cadeau', 'gift card', 'carte', 'card'],
    url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['recharge', 'streaming', 'abonnement', 'subscription'],
    url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=480&q=80&auto=format&fit=crop',
  },
  // Nourriture
  {
    keys: ['miel', 'honey'],
    url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['granola', 'muesli', 'céréale', 'cereale'],
    url: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['confiture', 'jam'],
    url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['huile', 'oil', 'olive'],
    url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['café', 'cafe', 'coffee', 'thé', 'the', 'tea'],
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['épice', 'epice', 'spice', 'piment', 'poivre', 'pepper', 'sel', 'salt'],
    url: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['savon', 'soap', 'hygiène', 'hygiene', 'shampoo', 'crème', 'creme'],
    url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['fruit', 'légume', 'legume', 'tomate', 'mangue', 'ananas', 'banane'],
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['riz', 'rice', 'farine', 'flour', 'grain'],
    url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['jus', 'juice', 'boisson', 'drink', 'eau', 'water', 'soda'],
    url: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['cosmétique', 'cosmetique', 'parfum', 'beauté', 'beaute'],
    url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['frigo', 'réfrigérateur', 'refrigerateur', 'congélateur', 'congelateur', 'électroménager', 'electromenager'],
    url: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['glace carbonique', 'carbonique', 'co2', 'brouillard', 'fumée', 'fumee'],
    url: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['hormone', 'croissance', 'complément', 'complement', 'supplement', 'musculaire', 'masse'],
    url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['faux compte', 'compte', 'profil', 'compte secondaire'],
    url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=480&q=80&auto=format&fit=crop',
  },
  {
    keys: ['site web', 'site simple', 'vitrine', 'réalisation', 'realisation', 'création site', 'creation site', 'web'],
    url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=480&q=80&auto=format&fit=crop',
  },
]

const FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1605347220445-39b42f8b6583?w=480&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=480&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589881133825-bca9c7575d21?w=480&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=480&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=480&q=80&auto=format&fit=crop',
]

function getProductImg(id: string | number, name: string): string {
  const lower = (name ?? '').toLowerCase()
  for (const entry of KEYWORD_IMGS) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.url
  }
  const idx = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % FALLBACK_IMGS.length
  return FALLBACK_IMGS[idx]
}

export function ProductCard({ product }: { product: Product }) {
  const imgSrc = getUploadedImg(product) ?? getProductImg(product.id, product.name)
  return (
    <Link href={`/market/produit/${product.slug}`} className="card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="card-img"
        src={imgSrc}
        alt={product.name}
        loading="lazy"
      />
      <div className="card-body">
        <h3>{product.name}</h3>
        {product.description && <p className="meta">{product.description}</p>}
        <span className="price">{formatPrice(product.price)}</span>
      </div>
    </Link>
  )
}
