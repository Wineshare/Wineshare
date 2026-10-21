import { Link } from "react-router";
import { CATEGORIES } from "../data/articles.js";

export function Cover({ article }) {
  return (
    <div className="cover cover--photo">
      <img className="cover-img" src={article.cover} alt={article.title} loading="lazy" />
      <img className="cover-mark" src="/assets/svg/logo-white.svg" alt="" />
      <span className="cover-title">{CATEGORIES[article.cat]}</span>
    </div>
  );
}

export default function PostCard({ article, hidden = false }) {
  let excerpt = article.excerpt;
  if (excerpt.length > 150) excerpt = excerpt.slice(0, 150).replace(/ [^ ]*$/, "") + "…";
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
