// Fonction Vercel : GET /api/admin/stats?month=2026-10
// Statistiques pour le back-office (/admin), protégées par mot de passe.
//
// Variable d'environnement (Vercel > Settings > Environment Variables) :
//   ADMIN_PASSWORD   mot de passe du back-office (obligatoire)
import { createHash, timingSafeEqual } from "node:crypto";
import { STORES, key, parisDay, parisMonth, redis, toObject } from "../_redis.js";

const json = (status, data) => Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
const sha = (s) => createHash("sha256").update(s).digest();

// Les 12 derniers mois, du plus ancien au plus récent : ["2025-11", ..., "2026-10"]
function lastMonths(count = 12) {
  const [y, m] = parisMonth().split("-").map(Number);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(Date.UTC(y, m - 1 - (count - 1 - i), 1));
    return d.toISOString().slice(0, 7);
  });
}

// Jours du mois demandé, sans dépasser aujourd'hui
function daysOf(month) {
  const [y, m] = month.split("-").map(Number);
  const today = parisDay();
  const count = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return Array.from({ length: count }, (_, i) => `${month}-${String(i + 1).padStart(2, "0")}`).filter((d) => d <= today);
}

const top = (obj, n = 10) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n);

export async function GET(request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return json(500, { error: "ADMIN_PASSWORD n'est pas défini sur Vercel" });

  // Anti force brute : 10 essais ratés maximum par quart d'heure et par adresse
  const ip = (request.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  const failKey = key("admin-fail", createHash("sha256").update(ip).digest("hex").slice(0, 16));
  const [fails] = await redis([["GET", failKey]]);
  if (Number(fails) >= 10) return json(429, { error: "Trop d'essais, réessayez dans 15 minutes" });

  const given = (request.headers.get("authorization") || "").replace(/^Bearer /, "");
  if (!timingSafeEqual(sha(given), sha(expected))) {
    await redis([["INCR", failKey], ["EXPIRE", failKey, 900]]);
    return json(401, { error: "Mot de passe incorrect" });
  }

  const months = lastMonths();
  const requested = new URL(request.url).searchParams.get("month");
  const month = months.includes(requested) ? requested : months.at(-1);
  const days = daysOf(month);

  const commands = [
    ...months.flatMap((m) => [["GET", key("pv", m)], ["PFCOUNT", key("uv", m)], ["HGETALL", key("clicks", m)]]),
    ...days.flatMap((d) => [["GET", key("pv", d)], ["PFCOUNT", key("uv", d)], ["HGETALL", key("clicks", d)]]),
    ["HGETALL", key("pages", month)],
    ["HGETALL", key("sources", month)],
  ];
  const r = await redis(commands);

  const row = (label, i) => {
    const clicks = toObject(r[i + 2]);
    return {
      label,
      pageviews: Number(r[i]) || 0,
      visitors: Number(r[i + 1]) || 0,
      clicks: Object.fromEntries(STORES.map((s) => [s, clicks[s] || 0])),
    };
  };
  const monthly = months.map((m, i) => row(m, i * 3));
  const offset = months.length * 3;
  const daily = days.map((d, i) => row(d, offset + i * 3));
  const rest = offset + days.length * 3;

  return json(200, {
    month,
    months: monthly,
    days: daily,
    pages: top(toObject(r[rest])),
    sources: top(toObject(r[rest + 1]), 25),
  });
}
