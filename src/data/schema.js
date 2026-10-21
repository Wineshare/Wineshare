// Données structurées schema.org (JSON-LD)
import { config } from "../config.js";
import { CATEGORIES } from "./articles.js";

const url = (path) => config.siteUrl + path;

export const ORGANIZATION = {
  "@type": "Organization",
  "@id": url("/#organization"),
  name: config.appName,
  url: url("/"),
  logo: { "@type": "ImageObject", url: url("/assets/favicon/apple-touch-icon.png"), width: 180, height: 180 },
  description: "Le réseau social des passionnés de vin, pensé avec des sommeliers et des cavistes indépendants.",
  areaServed: { "@type": "City", name: "Paris" },
};

export const WEBSITE = {
  "@type": "WebSite",
  "@id": url("/#website"),
  name: config.appName,
  url: url("/"),
  inLanguage: "fr-FR",
  publisher: { "@id": ORGANIZATION["@id"] },
};

const app = (name, category, description, page) => ({
  "@type": "MobileApplication",
  name,
  operatingSystem: "iOS, Android",
  applicationCategory: category,
  description,
  url: url(page),
  image: url("/assets/png/app-icon.webp"),
  inLanguage: "fr-FR",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  publisher: { "@id": ORGANIZATION["@id"] },
});

export const APP = app("WineShare", "SocialNetworkingApplication",
  "Partagez vos dégustations, découvrez des bars à vin et cavistes, suivez leurs événements et gagnez des badges.", "/");

export const PRO_APP = app("WineShare Pro", "BusinessApplication",
  "L'application des bars à vin et cavistes pour gérer leur fiche, leur carte des vins, leurs promotions et leurs événements.", "/etablissements");

export function breadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: url(path) })),
  };
}

export function blogPosting(a) {
  return {
    "@type": "BlogPosting",
    "@id": url(`/blog/${a.slug}#article`),
    headline: a.title,
    description: a.description,
    image: [url(`/assets/og/${a.slug}.jpg`), url(a.cover)],
    datePublished: a.published,
    dateModified: a.published,
    inLanguage: "fr-FR",
    articleSection: CATEGORIES[a.cat],
    wordCount: a.words,
    author: { "@type": "Organization", name: "L'équipe WineShare", url: url("/") },
    publisher: { "@id": ORGANIZATION["@id"] },
    mainEntityOfPage: url(`/blog/${a.slug}`),
  };
}

export const graph = (...items) => ({ "@context": "https://schema.org", "@graph": items });
