import type { ReactNode } from 'react';

export type ContentSection = { title: string; paragraphs?: string[]; bullets?: string[]; id?: string; children?: ReactNode };
type Props = { eyebrow: string; title: string; intro: string; sections: ContentSection[]; aside?: ReactNode };

export default function ContentPage({ eyebrow, title, intro, sections, aside }: Props) {
  return <div className="content-page">
    <section className="content-hero"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{intro}</p></section>
    {aside}
    <div className="content-columns"><nav className="content-toc" aria-label="On this page"><span>ON THIS PAGE</span>{sections.map((section, i) => <a key={section.title} href={`#${section.id || `section-${i}`}`}>{section.title}</a>)}</nav>
      <div className="content-sections">{sections.map((section, i) => <section className="content-block" id={section.id || `section-${i}`} key={section.title}><h2>{section.title}</h2>{section.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}{section.children}</section>)}</div>
    </div>
  </div>;
}
