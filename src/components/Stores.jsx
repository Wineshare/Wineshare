import { config } from "../config.js";

const STORE_URLS = {
  "appstore": config.appstoreURL,
  "googleplay": config.googleplayURL,
  "appstore-pro": config.appstoreProURL,
  "googleplay-pro": config.googleplayProURL,
};

export function StoreLink({ store, children }) {
  return <a href={STORE_URLS[store]} target="_blank" rel="noopener">{children}</a>;
}

export default function Stores({ pro = false }) {
  const suffix = pro ? "-pro" : "";
  return (
    <div className="stores">
      <StoreLink store={`googleplay${suffix}`}><img src="/assets/svg/google_play.svg" alt="Disponible sur Google Play" /></StoreLink>
      <StoreLink store={`appstore${suffix}`}><img src="/assets/svg/app_store.svg" alt="Télécharger dans l'App Store" /></StoreLink>
    </div>
  );
}
