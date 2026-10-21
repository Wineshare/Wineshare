import { createContext, useContext, useEffect } from "react";
import { config } from "../config.js";

// Côté serveur (pré-rendu), la page déclare ici son titre et sa description ;
// côté navigateur, on met à jour le <head> à chaque changement de page.
export const SeoContext = createContext(null);

const DEFAULT_IMAGE = "/assets/video/poster.jpg";

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function useSeo({ title, description, path, image = DEFAULT_IMAGE }) {
  const collector = useContext(SeoContext);
  if (collector) Object.assign(collector, { title, description, path, image });

  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:image"]', "content", config.siteUrl + image);
    setMeta('link[rel="canonical"]', "href", config.siteUrl + path);
  }, [title, description, path, image]);
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Balises <head> pour le pré-rendu (scripts/prerender.mjs)
export function headTags({ title, description, path, image = DEFAULT_IMAGE }) {
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${config.siteUrl}${path}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${config.siteUrl}${image}" />`,
  ].join("\n    ");
}

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
