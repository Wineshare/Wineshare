// Fonction Vercel : POST /api/contact
// Reçoit le formulaire de contact et envoie l'email via Resend.
//
// Variables d'environnement (Vercel > Settings > Environment Variables) :
//   RESEND_API_KEY        clé API Resend (obligatoire)
//   CONTACT_TO_EMAIL      adresse qui reçoit les messages (obligatoire)
//   CONTACT_FROM_EMAIL    expéditeur, sur le domaine vérifié dans Resend
//                         (par défaut : WineShare <contact@wineshare.fr>)
import { Resend } from "resend";

const PROFILES = {
  amateur: "Amateur de vin",
  etablissement: "Établissement",
  vigneron: "Vigneron / domaine",
  presse: "Presse / partenariat",
  autre: "Autre",
};

const json = (status, data) => Response.json(data, { status });

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const clean = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "Requête invalide" });
  }

  // Champ piège rempli : c'est un robot, on fait semblant d'accepter
  if (body.website) return json(200, { ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 200) || "Message depuis le site";
  const message = clean(body.message, 5000);
  const profile = PROFILES[body.profile] ?? PROFILES.autre;

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { error: "Nom, email valide et message obligatoires" });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    console.error("RESEND_API_KEY ou CONTACT_TO_EMAIL manquante");
    return json(500, { error: "Configuration serveur incomplète" });
  }

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "WineShare <contact@wineshare.fr>",
    to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
    replyTo: `${name.replace(/[<>"]/g, "")} <${email}>`,
    subject: `[${profile}] ${subject}`,
    text: `Nom : ${name}\nEmail : ${email}\nProfil : ${profile}\nSujet : ${subject}\n\n${message}`,
    html: `
      <div style="font-family:Arial,sans-serif;font-size:15px;color:#02132B">
        <h2 style="color:#476525;margin:0 0 16px">Nouveau message depuis wineshare.fr</h2>
        <p><strong>Nom :</strong> ${escapeHtml(name)}<br>
        <strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br>
        <strong>Profil :</strong> ${escapeHtml(profile)}<br>
        <strong>Sujet :</strong> ${escapeHtml(subject)}</p>
        <p style="white-space:pre-wrap;border-left:3px solid #D9A406;padding-left:12px">${escapeHtml(message)}</p>
        <p style="color:#888;font-size:13px">Répondez directement à cet email pour écrire à ${escapeHtml(name)}.</p>
      </div>`,
  });

  if (error) {
    console.error("Resend :", error);
    return json(502, { error: "L'envoi de l'email a échoué" });
  }
  return json(200, { ok: true });
}
