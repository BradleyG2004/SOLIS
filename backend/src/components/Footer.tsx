import Link from 'next/link'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span className="footer-brand">SOLIS TRILL</span>
        <nav className="footer-nav">
          <Link href="/market">Market</Link>
          <Link href="/bar">Bar</Link>
          <Link href="/laundry">Laundry</Link>
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} SOLIS TRILL</p>
      </div>
    </footer>
  )
}
