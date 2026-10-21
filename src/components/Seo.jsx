import { createContext, useContext, useEffect } from "react";
import { config } from "../config.js";

// Côté serveur (pré-rendu), la page déclare ici ses balises SEO ;
// côté navigateur, on remplace les balises du <head> à chaque changement de page.
export const SeoContext = createContext(null);

const DEFAULT_IMAGE = "/assets/og/wineshare.jpg";
const DEFAULT_IMAGE_ALT = "WineShare, le réseau social des passionnés de vin";

// Liste des balises <head> d'une page : [nom de balise, attributs]
function seoTags({ description, path, image = DEFAULT_IMAGE, imageAlt = DEFAULT_IMAGE_ALT, title, type = "website", noindex = false }) {
  const url = config.siteUrl + path;
  const imageUrl = config.siteUrl + image;
  return [
    ["meta", { name: "description", content: description }],
    ["meta", { name: "robots", content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1" }],
    ...(noindex ? [] : [["link", { rel: "canonical", href: url }]]),
    ["meta", { property: "og:type", content: type }],
    ["meta", { property: "og:site_name", content: config.appName }],
    ["meta", { property: "og:locale", content: "fr_FR" }],
    ["meta", { property: "og:title", content: title }],
    ["meta", { property: "og:description", content: description }],
    ["meta", { property: "og:url", content: url }],
    ["meta", { property: "og:image", content: imageUrl }],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { property: "og:image:alt", content: imageAlt }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: title }],
    ["meta", { name: "twitter:description", content: description }],
    ["meta", { name: "twitter:image", content: imageUrl }],
  ];
}

export function useSeo(seo) {
  const collector = useContext(SeoContext);
  if (collector) Object.assign(collector, seo);

  const key = JSON.stringify(seo);
  useEffect(() => {
    document.title = seo.title;
    document.head.querySelectorAll("[data-seo]").forEach((el) => el.remove());
    for (const [tag, attrs] of seoTags(seo)) {
      const el = document.createElement(tag);
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      el.setAttribute("data-seo", "");
      document.head.appendChild(el);
    }
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Balises <head> pour le pré-rendu (scripts/prerender.mjs)
export function headTags(seo) {
  const tags = seoTags(seo).map(([tag, attrs]) =>
    `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(" ")} data-seo />`);
  return [`<title>${esc(seo.title)}</title>`, ...tags].join("\n  ");
}

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
