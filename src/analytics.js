// Mesure d'audience maison (voir api/track.js) : pages vues et clics sur les stores.
// Sans cookie. Depuis le back-office (/admin), on peut exclure ses propres visites
// sur un appareil : le réglage est gardé dans le navigateur (clé "ws_no_track").

const ENDPOINT = "/api/track";
let firstPageview = true;
let lastPath = null;

function excluded() {
  try {
    return localStorage.getItem("ws_no_track") === "1";
  } catch {
    return false;
  }
}

function send(data) {
  if (typeof window === "undefined" || excluded()) return;
  const body = JSON.stringify(data);
  // sendBeacon survit au changement de page (clic sur un lien vers l'App Store, par exemple)
  if (!navigator.sendBeacon?.(ENDPOINT, body)) {
    fetch(ENDPOINT, { method: "POST", body, keepalive: true }).catch(() => {});
  }
}

// D'où vient la visite : site d'origine (google.com, instagram.com...) ou "direct"
function source() {
  try {
    const ref = document.referrer && new URL(document.referrer).hostname.replace(/^www\./, "");
    if (ref && ref !== location.hostname.replace(/^www\./, "")) return ref;
  } catch {}
  return "direct";
}

export function trackPageview(path) {
  if (path === lastPath) return; // évite un double comptage de la même page
  lastPath = path;
  const data = { type: "pageview", path };
  if (firstPageview) data.source = source();
  firstPageview = false;
  send(data);
}

export function trackStoreClick(store) {
  send({ type: "click", store });
}
