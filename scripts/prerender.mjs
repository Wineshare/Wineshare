// Pré-rendu : génère un fichier HTML statique par page (SEO, partage sur les réseaux)
// à partir du build client (dist/) et du build serveur (dist-server/).
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { config } from "../src/config.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const serverDir = join(root, "dist-server");

const template = await readFile(join(dist, "index.html"), "utf-8");
const { render, routes } = await import(pathToFileURL(join(serverDir, "entry-server.js")).href);

const fileFor = (route) => (route === "/" ? "index.html" : `${route.slice(1)}.html`);

for (const route of [...routes, "/404"]) {
  const { html, head } = render(route);
  const page = template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
  const file = join(dist, fileFor(route));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page);
}

const urls = routes.map((r) => `  <url><loc>${config.siteUrl}${r}</loc></url>`).join("\n");
await writeFile(join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

await rm(serverDir, { recursive: true, force: true });
console.log(`${routes.length + 1} pages pré-rendues`);
