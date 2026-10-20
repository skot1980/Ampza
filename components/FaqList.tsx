type QA = { q: string; a: string };
type Group = { title: string; items: QA[] };
export default function FaqList({ groups }: { groups: Group[] }) {
  return <div className="faq-groups">{groups.map(group => <section className="faq-group" id={group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} key={group.title}><h2>{group.title}</h2>{group.items.map(item => <details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</section>)}</div>;
}
