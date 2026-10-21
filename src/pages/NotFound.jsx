import { Link } from "react-router";
import PostCard from "../components/PostCard.jsx";
import { useSeo } from "../components/Seo.jsx";
import { articles } from "../data/articles.js";

export default function NotFound() {
  useSeo({
    title: "Page introuvable | WineShare",
    description: "Cette page n'existe pas ou a été déplacée. Retrouvez l'application WineShare, les établissements partenaires et nos articles sur le vin.",
    path: "/404",
    noindex: true,
  });
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Erreur 404</p>
          <h1>Cette bouteille est <span className="accent">introuvable</span></h1>
          <p className="lead">La page que vous cherchez n'existe pas ou a été déplacée. Voici quelques pistes pour retrouver votre chemin.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
            <Link className="btn btn--primary" to="/">Retour à l'accueil</Link>
            <Link className="btn btn--ghost" to="/blog">Lire le blog</Link>
            <Link className="btn btn--ghost" to="/etablissements">Espace établissements</Link>
            <Link className="btn btn--ghost" to="/contact">Nous contacter</Link>
          </div>
        </div>
      </section>
      <section className="section section--cream">
        <div className="container">
          <div className="section-head"><h2>Les articles <span className="accent">à découvrir</span></h2></div>
          <div className="blog-grid">
            {[articles[0], articles[3], articles[8]].map((a) => <PostCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>
    </>
  );
}
