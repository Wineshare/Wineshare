import { useState } from "react";
import PostCard from "../components/PostCard.jsx";
import { useSeo } from "../components/Seo.jsx";
import { articles, CATEGORIES } from "../data/articles.js";

const FILTERS = [["all", "Tous"], ...Object.entries(CATEGORIES)];

export default function Blog() {
  useSeo({
    title: "Blog WineShare | Conseils vin, dégustation et accords",
    description: "Le blog WineShare : conseils de sommelier pour lire une étiquette, déguster comme un pro, réussir vos accords mets-vins " +
      "et découvrir les régions viticoles.",
    path: "/blog",
  });
  const [filter, setFilter] = useState("all");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow reveal">Le blog</p>
          <h1 className="reveal d1">Le vin, expliqué <span className="accent">simplement</span></h1>
          <p className="lead reveal d2">Conseils de sommelier, repères de dégustation, accords et culture du vin : de quoi progresser verre après verre.</p>
        </div>
      </section>
      <section style={{ paddingBottom: "var(--section)" }}>
        <div className="container">
          <div className="filters" role="group" aria-label="Filtrer par catégorie">
            {FILTERS.map(([key, label]) => (
              <button key={key} className="chip" aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>
            ))}
          </div>
          <div className="blog-grid">
            {articles.map((a) => <PostCard key={a.slug} article={a} hidden={filter !== "all" && a.cat !== filter} />)}
          </div>
        </div>
      </section>
    </>
  );
}
