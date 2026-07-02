import Link from 'next/link'

const links = [
  { href: '/market', label: 'SOLISS Market' },
  { href: '/bar', label: 'SOLISS Bar' },
  { href: '/laundry', label: 'SOLISS Laundry' },
]

export function Header() {
  return (
    <header className="site-header">
      <div className="container inner">
        <Link href="/" className="logo">
          SOLISS <span>TRILL</span>
        </Link>
        <nav className="nav">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} SOLISS TRILL — Market · Bar · Laundry</p>
      </div>
    </footer>
  )
}
