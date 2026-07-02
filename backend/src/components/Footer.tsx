import Link from 'next/link'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span className="footer-brand">SOLISS TRILL</span>
        <nav className="footer-nav">
          <Link href="/market">Market</Link>
          <Link href="/bar">Bar</Link>
          <Link href="/laundry">Laundry</Link>
          <Link href="/immo">Immo</Link>
          <Link href="/transit">Transit</Link>
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} SOLISS TRILL</p>
      </div>
    </footer>
  )
}
