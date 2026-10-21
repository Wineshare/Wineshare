import { Link } from "react-router";
import { useSeo } from "../components/Seo.jsx";

export default function NotFound() {
  useSeo({
    title: "Page introuvable | WineShare",
    description: "Cette page n'existe pas ou a été déplacée.",
    path: "/404",
  });
  return (
    <section className="page-hero" style={{ paddingBottom: "var(--section)" }}>
      <div className="container">
        <p className="eyebrow">Erreur 404</p>
        <h1>Cette bouteille est <span className="accent">introuvable</span></h1>
        <p className="lead">La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <Link className="btn btn--primary" style={{ marginTop: "2rem" }} to="/">Retour à l'accueil</Link>
      </div>
    </section>
  );
}
