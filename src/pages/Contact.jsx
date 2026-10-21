import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { JsonLd, useSeo } from "../components/Seo.jsx";
import { breadcrumb, graph } from "../data/schema.js";
import { config } from "../config.js";

export default function Contact() {
  useSeo({
    title: "Contact | WineShare",
    description: "Une question sur l'application WineShare, un partenariat ou une demande presse ? Écrivez à l'équipe, nous vous répondons rapidement.",
    path: "/contact",
  });

  const form = useRef(null);
  const statusRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [params] = useSearchParams();

  useEffect(() => {
    const profil = params.get("profil");
    if (profil) form.current.profile.value = profil;
  }, [params]);

  useEffect(() => {
    if (status) statusRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form.current));
    if (!data.name || !data.email || !data.message) {
      setStatus({ type: "err", msg: "Merci de renseigner votre nom, votre email et votre message." });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(config.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || res.status);
      form.current.reset();
      setStatus({ type: "ok", msg: "Merci, votre message a bien été envoyé ! Nous revenons vers vous rapidement." });
    } catch (err) {
      console.error(err);
      setStatus({ type: "err", msg: "L'envoi a échoué, merci de réessayer dans un instant." });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="page-hero" style={{ paddingBottom: "2.5rem" }}>
        <div className="container">
          <p className="eyebrow reveal">Contact</p>
          <h1 className="reveal d1">Parlons <span className="accent">vin</span></h1>
          <p className="lead reveal d2">Une question sur l'application, un projet de partenariat ou une demande presse ? Écrivez-nous, nous vous répondons rapidement.</p>
        </div>
      </section>
      <section style={{ paddingBottom: "var(--section)" }}>
        <div className="container contact-layout">
          <form className="form-card reveal" id="contact-form" ref={form} onSubmit={onSubmit} noValidate>
            <h2 className="sr-only">Envoyer un message</h2>
            <div ref={statusRef} className={`form-status ${status?.type ?? ""}`} id="form-status" role="status" aria-live="polite">{status?.msg}</div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">Nom et prénom</label>
                <input id="name" name="name" type="text" autoComplete="name" required maxLength={120} />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} />
              </div>
              <div className="field">
                <label htmlFor="profile">Vous êtes</label>
                <select id="profile" name="profile" defaultValue="amateur">
                  <option value="amateur">Un amateur de vin</option>
                  <option value="etablissement">Un établissement (bar à vin, caviste…)</option>
                  <option value="vigneron">Un vigneron / domaine</option>
                  <option value="presse">Presse / partenariat</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="subject">Sujet</label>
                <input id="subject" name="subject" type="text" maxLength={200} />
              </div>
              <div className="field field--full">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required maxLength={5000}></textarea>
              </div>
              {/* Champ piège anti-robots : invisible pour les humains */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                <label htmlFor="website">Site web</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn--primary" type="submit" disabled={sending}>{sending ? "Envoi…" : "Envoyer le message"}</button>
            </div>
          </form>
          <aside className="contact-aside">
            <h2 className="sr-only">Autres ressources</h2>
            <div className="info-card reveal d1">
              <h3>Questions fréquentes</h3>
              <p>La réponse à votre question s'y trouve peut-être déjà.</p>
              <Link className="link" to="/#faq">Voir la FAQ →</Link>
            </div>
            <div className="info-card info-card--green reveal d2">
              <h3>Vous êtes un établissement ?</h3>
              <p>Découvrez WineShare Pro, l'application dédiée aux bars à vin et cavistes.</p>
              <Link className="btn btn--light" to="/etablissements">WineShare Pro →</Link>
            </div>
            <div className="info-card reveal d3">
              <h3>Supprimer mon compte</h3>
              <p>Vous souhaitez supprimer votre compte et vos données ?</p>
              <a className="link" href="/delete-account.html">Faire la demande →</a>
            </div>
          </aside>
        </div>
      </section>
      <JsonLd data={graph(
        { "@type": "ContactPage", name: "Contacter WineShare", url: `${config.siteUrl}/contact`, inLanguage: "fr-FR" },
        breadcrumb([["Accueil", "/"], ["Contact", "/contact"]]),
      )} />
    </>
  );
}
