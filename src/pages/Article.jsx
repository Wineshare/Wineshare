import { Link, useParams } from "react-router";
import PostCard, { Cover } from "../components/PostCard.jsx";
import { JsonLd, useSeo } from "../components/Seo.jsx";
import { blogPosting, breadcrumb, graph } from "../data/schema.js";
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
    title: `${article.title} | WineShare`,
    description: article.description,
    path: `/blog/${article.slug}`,
    image: `/assets/og/${article.slug}.jpg`,
    imageAlt: article.title,
    type: "article",
  });
  const date = new Date(article.published).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

  return (
    <>
      <section className="article-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Fil d'Ariane"><Link to="/blog">← Tous les articles</Link></nav>
          <div className="post-meta"><span className="tag">{CATEGORIES[article.cat]}</span><span>{article.minutes} min de lecture</span><time dateTime={article.published}>{date}</time><span>Par l'équipe WineShare</span></div>
          <h1>{article.title}</h1>
        </div>
      </section>
      <div className="article-cover">
        <Cover article={article} priority />
      </div>
      <article className="article-body">
        <Body blocks={article.blocks} />
        <div className="article-cta">
          <div>
            <h3>Mettez-le en pratique près de chez vous</h3>
            <p>Bars à vin, cavistes, dégustations : tout est dans l'app WineShare.</p>
          </div>
          <Link className="btn btn--light" to="/#telecharger">L'app bientôt disponible</Link>
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
      <JsonLd data={graph(
        blogPosting(article),
        breadcrumb([["Accueil", "/"], ["Blog", "/blog"], [article.title, `/blog/${article.slug}`]]),
      )} />
    </>
  );
}

export default function Article() {
  const article = getArticle(useParams().slug);
  // key : remonte la page (et ses animations) quand on passe d'un article à l'autre
  return article ? <ArticlePage key={article.slug} article={article} /> : <NotFound />;
}
