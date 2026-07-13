import Link from 'next/link'
import { ImmoDevisForm } from '@/components/ImmoDevisForm'
import { getSiteSettings } from '@/lib/data'
import type { SiteSettings } from '@/lib/types'

export default async function ImmoDevisPage() {
  const settings = await getSiteSettings().catch(
    (): SiteSettings => ({ paymentNotice: undefined, whatsappNumber: undefined }),
  )

  return (
    <div className="theme-immo">
      <div className="pole-hero">
        <div className="container">
          <Link href="/immo" className="back-link">← SOLISS Immo</Link>
          <h1>Demander un devis</h1>
          <p>Transport par tricycle motorisé — déménagement, livraison de charges lourdes.</p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '640px', padding: '64px 16px' }}>
        <ImmoDevisForm whatsappNumber={settings.whatsappNumber} />
      </div>
    </div>
  )
}
