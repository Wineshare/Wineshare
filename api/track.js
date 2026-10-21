// Fonction Vercel : POST /api/track
// Mesure d'audience maison, sans cookie : chaque page vue et chaque clic sur un bouton
// App Store / Google Play est compté dans Redis, par jour et par mois.
//
// Respect de la vie privée : aucune adresse IP n'est stockée. Un visiteur est reconnu
// par une empreinte anonyme (IP + navigateur + date + secret serveur, hachés) qui change
// chaque jour : on peut compter les visiteurs uniques sans pouvoir suivre une personne.
import { createHash } from "node:crypto";
import { STORES, key, parisDay, redis, secret } from "./_redis.js";

const BOTS = /bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|uptime|monitor|facebookexternalhit|curl|wget|python|axios|node-fetch|go-http/i;
const DAILY_TTL = 60 * 60 * 24 * 400; // les compteurs par jour sont gardés ~13 mois
const done = () => new Response(null, { status: 204 });

export async function POST(request) {
  const ua = request.headers.get("user-agent") || "";
  if (!ua || BOTS.test(ua)) return done();

  let body;
  try {
    body = JSON.parse(await request.text()); // envoyé par navigator.sendBeacon (text/plain)
  } catch {
    return new Response(null, { status: 400 });
  }

  const day = parisDay();
  const month = day.slice(0, 7);
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  const visitor = createHash("sha256").update(`${day}|${ip}|${ua}|${secret()}`).digest("hex").slice(0, 20);

  const commands = [];
  if (body.type === "pageview") {
    const path = typeof body.path === "string" && body.path.startsWith("/") ? body.path.slice(0, 200) : "/";
    commands.push(
      ["INCR", key("pv", month)],
      ["INCR", key("pv", day)], ["EXPIRE", key("pv", day), DAILY_TTL],
      ["PFADD", key("uv", month), visitor],
      ["PFADD", key("uv", day), visitor], ["EXPIRE", key("uv", day), DAILY_TTL],
      ["HINCRBY", key("pages", month), path, 1],
    );
    // Source de la visite : envoyée seulement à la première page vue de la visite
    if (typeof body.source === "string" && body.source) {
      commands.push(["HINCRBY", key("sources", month), body.source.slice(0, 100).toLowerCase(), 1]);
    }
  } else if (body.type === "click" && STORES.includes(body.store)) {
    commands.push(
      ["HINCRBY", key("clicks", month), body.store, 1],
      ["HINCRBY", key("clicks", day), body.store, 1], ["EXPIRE", key("clicks", day), DAILY_TTL],
    );
  } else {
    return new Response(null, { status: 400 });
  }

  try {
    await redis(commands);
  } catch (err) {
    console.error(err);
  }
  return done();
}
