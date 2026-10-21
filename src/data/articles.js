// Articles du blog, générés depuis articles.txt
// (export texte du .docx : un article par page, séparés par un saut de page)
import raw from "./articles.txt?raw";

// Catégorie de chaque article, dans l'ordre du document
const ARTICLE_CATS = [
  "bases", "bases", "bases", "degustation", "degustation", "regions",
  "regions", "accords", "accords", "degustation", "bases", "culture",
];

// Date de publication des articles (mise en ligne du blog)
const PUBLISHED = "2026-09-29";

export const CATEGORIES = {
  bases: "Les bases",
  degustation: "Dégustation",
  regions: "Régions",
  accords: "Accords & occasions",
  culture: "Culture du vin",
};

export function slugify(text) {
  const ascii = text.normalize("NFKD").replace(/[^\x00-\x7F]/g, "");
  return ascii.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    .slice(0, 70).replace(/^-+|-+$/g, "");
}

// Coupe un texte au dernier mot entier avant `max` caractères
export function truncate(text, max) {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/[\s,;:]+\S*$/, "") + "…";
}

function parse() {
  const chunks = raw.split("\f").filter((c) => c.trim());
  return chunks.map((chunk, i) => {
    const lines = chunk.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const [title, ...body] = lines;
    const blocks = body.map((line) => {
      if (line.startsWith("Le petit plus WineShare")) return { kind: "tip", text: line };
      if ([...line].length < 90 && !/[.!…]$/.test(line)) return { kind: "h2", text: line };
      return { kind: "p", text: line };
    });
    const words = body.join(" ").split(/\s+/).filter(Boolean).length;
    const slug = slugify(title);
    const excerpt = body[0];
    return {
      n: i + 1,
      title,
      slug,
      blocks,
      excerpt,
      description: truncate(excerpt, 155),
      words,
      published: PUBLISHED,
      cat: ARTICLE_CATS[i],
      cover: `/assets/img/blog/${slug}.webp`,
      minutes: Math.max(2, Math.round(words / 220)),
    };
  });
}

export const articles = parse();

if (articles.length !== ARTICLE_CATS.length) {
  throw new Error(`${articles.length} articles trouvés, ${ARTICLE_CATS.length} catégories attendues`);
}

export const getArticle = (slug) => articles.find((a) => a.slug === slug);

export function relatedArticles(article, count = 3) {
  const same = articles.filter((o) => o.cat === article.cat && o !== article);
  const rest = articles.filter((o) => !same.includes(o) && o !== article);
  return [...same, ...rest].slice(0, count);
}
