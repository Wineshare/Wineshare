import { Link } from "react-router";
import { useSeo } from "../components/Seo.jsx";
import { LEGAL_PAGES, LEGAL_UPDATED } from "../data/legal.js";

// Rend cliquables les adresses e-mail, les URL et le formulaire de contact
const LINKS = /([\w.+-]+@[\w-]+\.[\w.]+|https?:\/\/[^\s,;)]+[^\s,;).]|www\.cnil\.fr|wineshare\.fr\/contact)/g;

function Text({ children }) {
  return children.split(LINKS).map((part, i) => {
    if (i % 2 === 0) return part;
    if (part.includes("@")) return <a key={i} href={`mailto:${part}`}>{part}</a>;
    if (part === "wineshare.fr/contact") return <Link key={i} to="/contact">{part}</Link>;
    const href = part.startsWith("http") ? part : `https://${part}`;
    return <a key={i} href={href} target="_blank" rel="noopener">{part}</a>;
  });
}

function Block({ block }) {
  if (typeof block === "string") return <p><Text>{block}</Text></p>;
  if (Array.isArray(block)) return <ul>{block.map((item) => <li key={item}><Text>{item}</Text></li>)}</ul>;
  if (block.h) return <h3>{block.h}</h3>;
  return <p className={block.strong ? "legal-strong" : undefined}><Text>{block.p}</Text></p>;
}

export default function Legal({ page }) {
  useSeo({ title: `${page.title} | WineShare`, description: page.description, path: page.path });
  const others = LEGAL_PAGES.filter((p) => p !== page);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="lead">{page.intro}</p>
          <p className="legal-updated">Dernière mise à jour : {LEGAL_UPDATED}</p>
        </div>
      </section>

      <section className="legal">
        <div className="container legal-layout">
          <nav className="legal-toc" aria-label="Sommaire">
            <p className="legal-toc-title">Sommaire</p>
            <ol>
              {page.sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}
            </ol>
          </nav>

          <div className="legal-body">
            {page.sections.map((s) => (
              <section key={s.id} id={s.id} className="legal-section">
                <h2>{s.title}</h2>
                {s.blocks.map((b, i) => <Block key={i} block={b} />)}
              </section>
            ))}

            <div className="legal-others">
              <p>Voir aussi :</p>
              {others.map((p) => <Link key={p.path} to={p.path}>{p.title}</Link>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
