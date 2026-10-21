// Pré-rendu : génère un fichier HTML statique par page (SEO, partage sur les réseaux)
// à partir du build client (dist/) et du build serveur (dist-server/),
// ainsi que sitemap.xml, robots.txt, llms.txt et rss.xml.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const serverDir = join(root, "dist-server");

const template = await readFile(join(dist, "index.html"), "utf-8");
const { render, routes, articles, CATEGORIES, config } = await import(pathToFileURL(join(serverDir, "entry-server.js")).href);
const site = config.siteUrl;

const fileFor = (route) => (route === "/" ? "index.html" : `${route.slice(1)}.html`);

for (const route of [...routes, "/404"]) {
  const { html, head } = render(route);
  const page = template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
  const file = join(dist, fileFor(route));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page);
}

// ---------- sitemap.xml (avec les images des articles)
const today = new Date().toISOString().slice(0, 10);
const bySlug = Object.fromEntries(articles.map((a) => [`/blog/${a.slug}`, a]));
const urls = routes.map((r) => {
  const a = bySlug[r];
  const lastmod = a ? a.published : today;
  const image = a ? `\n    <image:image><image:loc>${site}${a.cover}</image:loc></image:image>` : "";
  return `  <url>\n    <loc>${site}${r}</loc>\n    <lastmod>${lastmod}</lastmod>${image}\n  </url>`;
}).join("\n");
await writeFile(join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`);

// ---------- rss.xml (flux des articles du blog)
const xml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const items = [...articles]
  .sort((a, b) => b.published.localeCompare(a.published) || b.n - a.n)
  .map((a) => {
    const link = `${site}/blog/${a.slug}`;
    return `    <item>
      <title>${xml(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${xml(a.description)}</description>
      <category>${xml(CATEGORIES[a.cat])}</category>
      <pubDate>${new Date(a.published).toUTCString()}</pubDate>
      <dc:creator>L'équipe WineShare</dc:creator>
      <media:content url="${site}/assets/og/${a.slug}.jpg" medium="image" type="image/jpeg" width="1200" height="630" />
    </item>`;
  }).join("\n");
const lastBuild = articles.reduce((d, a) => (a.published > d ? a.published : d), "");
await writeFile(join(dist, "rss.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Le blog WineShare</title>
    <link>${site}/blog</link>
    <description>Conseils de sommelier, dégustation, accords mets-vins et culture du vin, par l'équipe WineShare.</description>
    <language>fr-FR</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${site}/assets/favicon/apple-touch-icon.png</url>
      <title>Le blog WineShare</title>
      <link>${site}/blog</link>
    </image>
${items}
  </channel>
</rss>
`);

// ---------- robots.txt
await writeFile(join(dist, "robots.txt"), `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin

Sitemap: ${site}/sitemap.xml
`);

// ---------- llms.txt (résumé du site pour les assistants IA, cf. llmstxt.org)
const byCat = Object.entries(CATEGORIES).map(([key, label]) =>
  `### ${label}\n\n` + articles.filter((a) => a.cat === key)
    .map((a) => `- [${a.title}](${site}/blog/${a.slug}) : ${a.description}`).join("\n")).join("\n\n");
await writeFile(join(dist, "llms.txt"), `# WineShare

> WineShare est le réseau social des passionnés de vin, gratuit sur iPhone et Android. Les amateurs y partagent leurs dégustations, découvrent des bars à vin et cavistes indépendants (d'abord à Paris), suivent leurs événements et gagnent des badges. Les professionnels gèrent leur présence avec l'application WineShare Pro.

## Pages principales

- [Accueil](${site}/) : présentation de l'application WineShare, fonctionnement et questions fréquentes
- [Établissements](${site}/etablissements) : WineShare Pro, l'application des bars à vin, cavistes et domaines (fiche, carte des vins, promotions, événements)
- [Blog](${site}/blog) : conseils de sommelier, dégustation, accords mets-vins et culture du vin
- [Contact](${site}/contact) : écrire à l'équipe WineShare (questions, partenariats, presse)
- [Flux RSS du blog](${site}/rss.xml)

## Articles du blog

${byCat}
`);

await rm(serverDir, { recursive: true, force: true });
console.log(`${routes.length + 1} pages pré-rendues, sitemap.xml, robots.txt, llms.txt, rss.xml`);
