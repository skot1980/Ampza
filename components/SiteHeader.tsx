import Link from 'next/link';

const links = [
  ['Charging', '/charging'], ['Pricing', '/pricing'], ['Business', '/business'], ['About', '/about'], ['FAQs', '/faqs'],
];

export default function SiteHeader() {
  return <header className="site-header">
    <Link className="brand" href="/" aria-label="Ampza home"><span className="brand-mark" aria-hidden="true">a</span><span>ampza</span></Link>
    <nav className="main-nav" aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <Link className="nav-cta" href="/#waitlist">Get early access <span aria-hidden="true">↗</span></Link>
    <details className="mobile-menu"><summary>Menu <span>+</span></summary><nav aria-label="Mobile navigation">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<a href="/contact">Contact</a></nav></details>
  </header>;
}
