import { config } from "../config.js";
import { trackStoreClick } from "../analytics.js";

const STORE_URLS = {
  "appstore": config.appstoreURL,
  "googleplay": config.googleplayURL,
  "appstore-pro": config.appstoreProURL,
  "googleplay-pro": config.googleplayProURL,
};

export function StoreLink({ store, children }) {
  return (
    <a href={STORE_URLS[store]} target="_blank" rel="noopener" onClick={() => trackStoreClick(store)}>
      {children}
    </a>
  );
}

// eager : boutons visibles dès l'arrivée sur la page (pas de chargement différé)
export default function Stores({ pro = false, eager = false }) {
  const suffix = pro ? "-pro" : "";
  const loading = eager ? undefined : "lazy";
  return (
    <div className="stores">
      <StoreLink store={`googleplay${suffix}`}><img src="/assets/svg/google_play.svg" alt="Disponible sur Google Play" loading={loading} /></StoreLink>
      <StoreLink store={`appstore${suffix}`}><img src="/assets/svg/app_store.svg" alt="Télécharger dans l'App Store" loading={loading} /></StoreLink>
    </div>
  );
}
