import { Link, useParams } from "react-router";
import PostCard, { Cover } from "../components/PostCard.jsx";
import { useSeo } from "../components/Seo.jsx";
import { CATEGORIES, getArticle, relatedArticles } from "../data/articles.js";
import NotFound from "./NotFound.jsx";

function Body({ blocks }) {
  let firstP = true;
  return blocks.map(({ kind, text }, i) => {
    if (kind === "h2") return <h2 key={i}>{text}</h2>;
    if (kind === "tip") {
      const at = text.indexOf(":");
      const [label, rest] = at === -1 ? [text, ""] : [text.slice(0, at), text.slice(at + 1)];
      return <div key={i} className="tip"><strong>{label.trim()} :</strong> {rest.trim()}</div>;
    }
    const cls = firstP ? "intro" : undefined;
    firstP = false;
    return <p key={i} className={cls}>{text}</p>;
  });
}

function ArticlePage({ article }) {
  useSeo({
    title: `${article.title} | Blog WineShare`,
    description: article.excerpt.slice(0, 155),
    path: `/blog/${article.slug}`,
    image: article.cover,
  });

  return (
    <>
      <section className="article-hero">
        <div className="container">
          <p className="breadcrumb"><Link to="/blog">← Tous les articles</Link></p>
          <div className="post-meta"><span className="tag">{CATEGORIES[article.cat]}</span><span>{article.minutes} min de lecture</span><span>Par l'équipe WineShare</span></div>
          <h1>{article.title}</h1>
        </div>
      </section>
      <div className="article-cover">
        <Cover article={article} />
      </div>
      <article className="article-body">
        <Body blocks={article.blocks} />
        <div className="article-cta">
          <div>
            <h3>Mettez-le en pratique près de chez vous</h3>
            <p>Bars à vin, cavistes, dégustations : tout est dans l'app WineShare.</p>
          </div>
          <Link className="btn btn--light" to="/#telecharger">Télécharger l'app</Link>
        </div>
      </article>
      <section className="section">
        <div className="container">
          <div className="section-head"><h2>À lire aussi</h2></div>
          <div className="blog-grid">
            {relatedArticles(article).map((a) => <PostCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>
    </>
  );
}

export default function Article() {
  const article = getArticle(useParams().slug);
  // key : remonte la page (et ses animations) quand on passe d'un article à l'autre
  return article ? <ArticlePage key={article.slug} article={article} /> : <NotFound />;
}
