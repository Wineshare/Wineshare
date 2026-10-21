import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.jsx";
import { SeoContext, headTags } from "./components/Seo.jsx";
import { articles } from "./data/articles.js";

// Toutes les pages à pré-rendre en HTML statique
export const routes = ["/", "/etablissements", "/blog", "/contact", ...articles.map((a) => `/blog/${a.slug}`)];

export function render(url) {
  const seo = {};
  const html = renderToString(
    <StrictMode>
      <SeoContext.Provider value={seo}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </SeoContext.Provider>
    </StrictMode>
  );
  return { html, head: headTags(seo) };
}
