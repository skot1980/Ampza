import Link from 'next/link';
import Image from 'next/image';

const links = [
  ['Charging', '/charging'], ['Pricing', '/pricing'], ['Business', '/business'], ['About', '/about'], ['FAQs', '/faqs'],
];

export default function SiteHeader() {
  return <header className="site-header">
    <Link className="brand" href="/" aria-label="Ampza home"><Image className="brand-mark" src="/ampza-logo-mark.svg" alt="" width={30} height={30} unoptimized /><span>ampza</span></Link>
    <nav className="main-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
    <Link className="nav-cta" href="/#waitlist">Get early access <span aria-hidden="true">↗</span></Link>
    <details className="mobile-menu"><summary>Menu <span>+</span></summary><nav aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/contact">Contact</Link></nav></details>
  </header>;
}
