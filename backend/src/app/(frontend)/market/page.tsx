import Link from 'next/link'
import { getCategories, getSiteSettings } from '@/lib/data'

const CATEGORY_KEYWORD_IMGS: Array<{ keys: string[]; url: string }> = [
  {
    keys: ['alimenta', 'épicerie', 'epicerie', 'food', 'nourriture'],
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80&auto=format&fit=crop',
  },
  {
    keys: ['accessoire', 'bijou', 'sac', 'bag'],
    url: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&q=80&auto=format&fit=crop',
  },
  {
    keys: ['électronique', 'electronique', 'tech', 'phone', 'mobile', 'numérique', 'numerique', 'distrib'],
    url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80&auto=format&fit=crop',
  },
  {
    keys: ['coin fumeur', 'fumeur', 'tabac', 'cigare', 'cigarette'],
    url: 'https://images.unsplash.com/photo-1599909631671-8d86ae6e53e9?w=600&q=80&auto=format&fit=crop',
  },
  {
    keys: ['bien-être', 'bien etre', 'bienetre', 'wellness', 'soin', 'spa'],
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80&auto=format&fit=crop',
  },
  {
    keys: ['boisson', 'drink', 'jus', 'juice', 'eau', 'water', 'soda', 'bière', 'biere'],
    url: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=600&q=80&auto=format&fit=crop',
  },
  {
    keys: ['café', 'cafe', 'coffee', 'thé', 'the', 'tea'],
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop',
  },
  {
    keys: ['épice', 'epice', 'spice', 'condiment', 'sauce'],
    url: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=600&q=80&auto=format&fit=crop',
  },
  {
    keys: ['hygiène', 'hygiene', 'savon', 'soap', 'beauté', 'beaute', 'cosmé', 'cosme'],
    url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80&auto=format&fit=crop',
  },
  {
    keys: ['mode', 'vêtement', 'vetement', 'cloth', 'fashion', 'textile'],
    url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80&auto=format&fit=crop',
  },
  {
    keys: ['maison', 'home', 'cuisine', 'kitchen', 'déco', 'deco'],
    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop',
  },
  {
    keys: ['riz', 'rice', 'céréale', 'cereale', 'farine', 'grain'],
    url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80&auto=format&fit=crop',
  },
  {
    keys: ['fruit', 'légume', 'legume', 'frais', 'fresh'],
    url: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80&auto=format&fit=crop',
  },
]

const FALLBACK_CATEGORY_IMGS = [
  'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1589881133825-bca9c7575d21?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80&auto=format&fit=crop',
]

function getCategoryImg(id: string, name: string): string {
  const lower = (name ?? '').toLowerCase()
  for (const entry of CATEGORY_KEYWORD_IMGS) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.url
  }
  const idx = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % FALLBACK_CATEGORY_IMGS.length
  return FALLBACK_CATEGORY_IMGS[idx]
}

export default async function MarketPage() {
  const [categories, settings] = await Promise.all([
    getCategories(),
    getSiteSettings().catch(() => ({ marketIntro: '' })),
  ])

  return (
    <div className="theme-market">

      <section className="market-hero">
        <div className="container market-hero-inner">
          <div className="animate-fade-up">
            <span className="market-hero-label">Catalogue</span>
            <h1>SOLIS Market</h1>
            <p className="market-hero-desc">
              {settings.marketIntro || 'Des produits sélectionnés avec soin, organisés par catégories.'}
            </p>
          </div>
          <div className="market-hero-visual animate-fade-up-delay-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1506617420156-8e4536971650?w=800&q=85&auto=format&fit=crop"
              alt="Produits SOLIS Market"
            />
          </div>
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Catégories</h2>
        <div className="grid">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/market/${cat.slug}`} className="card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="card-img"
                src={getCategoryImg(cat.id, cat.name)}
                alt={cat.name}
                loading="lazy"
              />
              <div className="card-body">
                <h3>{cat.name}</h3>
                {cat.description && <p className="meta">{cat.description}</p>}
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
