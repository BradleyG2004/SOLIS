'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/market', label: 'Market' },
  { href: '/bar', label: 'Bar' },
  { href: '/laundry', label: 'Laundry' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="site-header">
      <div className="container inner">
        <Link href="/" className="logo">
          SOLIS <span>TRILL</span>
        </Link>
        <nav className="nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.href === '/'
                  ? pathname === '/'
                    ? 'active'
                    : ''
                  : pathname.startsWith(link.href)
                    ? 'active'
                    : ''
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
