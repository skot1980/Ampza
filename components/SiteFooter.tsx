import Link from 'next/link';

const groups = [
  { title: 'Explore', links: [['Charging','/charging'],['Pricing','/pricing'],['FAQs','/faqs']] },
  { title: 'Work with us', links: [['Business','/business'],['About','/about'],['Contact','/contact']] },
  { title: 'Legal', links: [['Privacy Policy','/privacy-policy'],['Terms & Conditions','/terms-and-conditions'],['Cancellation & Refund','/cancellation-and-refund-policy'],['Cookie Policy','/cookie-policy']] },
];
export default function SiteFooter() {
  return <footer className="site-footer"><div className="footer-main">
    <div><Link className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true">a</span><span>ampza</span></Link><p>Charging, for people.<br />Not just for cars.</p></div>
    {groups.map(group => <div className="footer-group" key={group.title}><b>{group.title}</b>{group.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>)}
    <div className="footer-contact"><b>Get in touch</b><span>Launching across Tamil Nadu & Kerala first</span><span>No. 10/44-2, Kovithanvilai Road,<br/>Erumbukadu Post, Nagercoil – 629004</span><a href="mailto:hello@ampza.in">hello@ampza.in</a><a href="tel:+919842910644">+91 98429 10644</a></div>
  </div><div className="footer-bottom"><span>© 2026 Ampza</span><span>Built for the road ahead.</span></div></footer>;
}

