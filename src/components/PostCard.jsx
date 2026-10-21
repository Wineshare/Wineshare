import { Link } from "react-router";
import { CATEGORIES, truncate } from "../data/articles.js";

// priority : image principale de la page (chargée tout de suite)
export function Cover({ article, priority = false }) {
  return (
    <div className="cover cover--photo">
      <img className="cover-img" src={article.cover} alt={`Illustration de l'article « ${article.title} »`}
        {...(priority ? { fetchPriority: "high" } : { loading: "lazy" })} decoding="async" />
      <img className="cover-mark" src="/assets/svg/logo-white.svg" alt="" width="56" height="42" loading="lazy" />
      <span className="cover-title">{CATEGORIES[article.cat]}</span>
    </div>
  );
}

export default function PostCard({ article, hidden = false }) {
  const excerpt = truncate(article.excerpt, 150);
  return (
    <Link className="post-card reveal" data-cat={article.cat} to={`/blog/${article.slug}`} hidden={hidden}>
      <Cover article={article} />
      <div className="post-body">
        <div className="post-meta"><span>{article.minutes} min de lecture</span></div>
        <h3>{article.title}</h3>
        <p>{excerpt}</p>
        <span className="post-more">Lire l'article</span>
      </div>
    </Link>
  );
}
