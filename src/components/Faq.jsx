import { useNavigate } from "react-router";
import { JsonLd } from "./Seo.jsx";

// Les réponses contiennent des liens HTML : on intercepte les liens internes
// pour naviguer sans recharger la page.
export default function Faq({ items, className = "" }) {
  const navigate = useNavigate();

  const onToggle = (e) => {
    if (!e.target.open) return;
    e.currentTarget.querySelectorAll("details[open]").forEach((d) => { if (d !== e.target) d.open = false; });
  };

  const onClick = (e) => {
    const a = e.target.closest("a");
    const href = a?.getAttribute("href");
    if (!href || !href.startsWith("/") || href.endsWith(".html") || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <div className={`faq ${className}`} onToggleCapture={onToggle} onClick={onClick}>
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <div className="answer" dangerouslySetInnerHTML={{ __html: a }} />
        </details>
      ))}
    </div>
  );
}

export function FaqSchema({ items }) {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") },
      })),
    }} />
  );
}
