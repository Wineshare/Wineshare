// Accès à la base Upstash Redis (créée depuis Vercel > Storage) via son API REST.
// Les fichiers de api/ qui commencent par « _ » ne sont pas exposés comme des routes.
//
// Variables d'environnement ajoutées automatiquement par Vercel :
//   WINESHARE_KV_REST_API_URL, WINESHARE_KV_REST_API_TOKEN

const url = () => process.env.WINESHARE_KV_REST_API_URL || process.env.KV_REST_API_URL;
const token = () => process.env.WINESHARE_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN;

// Exécute plusieurs commandes en un seul aller-retour : redis([["INCR", "k"], ["GET", "k"]])
export async function redis(commands) {
  if (!url() || !token()) throw new Error("Base Redis non configurée (WINESHARE_KV_REST_API_URL / _TOKEN)");
  const res = await fetch(`${url()}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`Redis ${res.status} : ${await res.text()}`);
  return (await res.json()).map((r) => {
    if (r.error) throw new Error(`Redis : ${r.error}`);
    return r.result;
  });
}

// Secret serveur, jamais envoyé au navigateur : sert à rendre les identifiants de visiteurs anonymes
export const secret = () => token() || "wineshare";

// Dates à l'heure de Paris : "2026-10-21" et "2026-10"
export const parisDay = (date = new Date()) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(date);
export const parisMonth = (date = new Date()) => parisDay(date).slice(0, 7);

// Redis renvoie HGETALL sous forme de liste [clé, valeur, clé, valeur, ...]
export const toObject = (list) => {
  const out = {};
  for (let i = 0; i < (list?.length ?? 0); i += 2) out[list[i]] = Number(list[i + 1]);
  return out;
};

// Toutes les clés sont préfixées pour ne pas se mélanger avec d'autres données de la base
export const key = (...parts) => ["ws", ...parts].join(":");

export const STORES = ["appstore", "googleplay", "appstore-pro", "googleplay-pro"];
