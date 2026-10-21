import { Link } from "react-router";
import Stores from "../components/Stores.jsx";
import Faq, { FaqSchema } from "../components/Faq.jsx";
import { useSeo } from "../components/Seo.jsx";
import { PRO_FAQ } from "../data/faq.js";
import { PRO_APP, breadcrumb, graph } from "../data/schema.js";
import { JsonLd } from "../components/Seo.jsx";

const FEATURE_ICONS = {
  store: <><path d="M3 9l1.5-5h15L21 9"/><path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9z"/><path d="M5 13v7h14v-7"/><path d="M10 20v-4h4v4"/></>,
  wine: <><path d="M8 2h8l-.5 7a3.5 3.5 0 0 1-7 0L8 2z"/><path d="M12 12.5V20"/><path d="M8 21h8"/><path d="M8.3 6h7.4"/></>,
  tag: <><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></>,
  calendar: <><rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/></>,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z"/>,
  chat: <><path d="M21 12a8 8 0 0 1-11.8 7L3 21l2-6.2A8 8 0 1 1 21 12z"/><path d="M8 11h8M8 14.5h5"/></>,
};

const FEATURES = [
  ["store", "Votre fiche établissement", "Photos, description, horaires, adresse et tags d'ambiance : une vitrine soignée, visible sur la carte Explorer.", ""],
  ["wine", "Votre carte des vins", "Mettez en avant vos références du moment, avec appellation, millésime et prix au verre ou à la bouteille.", "d1"],
  ["tag", "Vos promotions", "Lancez une offre limitée dans le temps et touchez immédiatement les amateurs autour de vous.", "d2"],
  ["calendar", "Vos événements", "Dégustations, ateliers, soirées : publiez vos événements et suivez les réservations et les places restantes.", ""],
  ["star", "Vos avis et dégustations", "Retrouvez les dégustations publiées chez vous par la communauté et suivez votre note.", "d1"],
  ["chat", "Le contact direct", "Les amateurs vous contactent, vous appellent ou lancent l'itinéraire depuis votre fiche.", "d2"],
];

export default function Pro() {
  useSeo({
    title: "WineShare Pro | Pour les bars à vin et cavistes",
    description: "Bars à vin, cavistes : avec l'application WineShare Pro, gérez votre fiche, votre carte des vins, vos promotions " +
      "et vos événements auprès des passionnés.",
    path: "/etablissements",
  });

  return (
    <>
      <section className="page-hero pro-hero">
        <div className="container">
          <div>
            <p className="eyebrow reveal">Espace établissements</p>
            <h1 className="reveal d1">Faites découvrir votre cave aux <span className="accent">passionnés de vin</span></h1>
            <p className="lead reveal d2">Bar à vin, caviste, restaurant : avec l'application WineShare Pro, gérez votre présence sur WineShare et attirez une clientèle curieuse, fidèle et amoureuse du vin.</p>
            <div className="pro-app reveal d2">
              <img src="/assets/png/app-icon.webp" alt="" width="256" height="256" />
              <div><strong>WineShare Pro</strong><span>L'application dédiée aux professionnels</span></div>
            </div>
            <div className="reveal d3">
              <Stores pro eager />
            </div>
            <p className="note reveal d3"><img src="/assets/svg/icon-sparkler.svg" alt="" width="18" height="18" />Pensé avec des sommeliers et des cavistes indépendants.</p>
          </div>
          <div className="pro-hero-visual reveal d1">
            <img src="/assets/img/fiche-partenaire.webp" alt="Fiche d'un établissement partenaire dans WineShare : photos, carte des vins et événements" width="803" height="1958" fetchPriority="high" />
            <div className="float-card float-card--badge">
              <span className="ico ico--green"><img src="/assets/svg/icon-glass.svg" alt="" width="21" height="32" /></span>
              <span><strong>Partenaire</strong><small>Badge affiché sur votre fiche</small></span>
            </div>
            <div className="float-card float-card--place">
              <span className="ico ico--gold"><img src="/assets/svg/icon-medal-star.svg" alt="" width="32" height="32" /></span>
              <span><strong>-30% vins nature</strong><small>Promotion publiée</small></span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-head center reveal">
            <p className="eyebrow">Ce que vous gérez</p>
            <h2>Tout votre établissement, <span className="accent">dans votre poche</span></h2>
            <p className="lead">Mettez à jour en quelques secondes ce que les amateurs voient de vous dans WineShare.</p>
          </div>
          <div className="features">
            {FEATURES.map(([icon, title, text, delay]) => (
              <article key={icon} className={`feature reveal ${delay}`}>
                <div className="ico"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{FEATURE_ICONS[icon]}</svg></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-visual reveal"><img src="/assets/img/ecran-evenements.webp" alt="Événements d'un établissement partenaire" width="900" height="1155" loading="lazy" decoding="async" /></div>
          <div>
            <div className="section-head reveal">
              <p className="eyebrow">Démarrer</p>
              <h2>En ligne en <span className="accent">3 étapes</span></h2>
            </div>
            <ol className="steps">
              <li className="reveal"><div><h3>Téléchargez WineShare Pro</h3><p>Disponible sur l'App Store et Google Play.</p></div></li>
              <li className="reveal d1"><div><h3>Créez votre fiche</h3><p>Ajoutez vos photos, votre ambiance et vos premières références.</p></div></li>
              <li className="reveal d2"><div><h3>Animez votre communauté</h3><p>Publiez promotions et événements, et suivez l'activité de votre établissement.</p></div></li>
            </ol>
            <div className="reveal d3" style={{ marginTop: "2rem" }}><Stores pro /></div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container faq-layout">
          <div className="section-head reveal">
            <p className="eyebrow">FAQ Pros</p>
            <h2>Vos <span className="accent">questions</span></h2>
            <p className="lead">Un doute avant de vous lancer ? Notre équipe vous répond.</p>
            <Link className="btn btn--ghost" style={{ marginTop: "1.5rem" }} to="/contact?profil=etablissement">Contacter l'équipe</Link>
          </div>
          <Faq items={PRO_FAQ} className="reveal d1" />
        </div>
      </section>

      <section className="cta-final section--tight">
        <div className="container">
          <div className="inner reveal" style={{ background: "var(--green)" }}>
            <h2 style={{ color: "#fff" }}>Prêt à rejoindre WineShare ?</h2>
            <p className="lead" style={{ color: "rgba(255,255,255,.85)" }}>Téléchargez l'application WineShare Pro et créez votre fiche dès aujourd'hui.</p>
            <Stores pro />
          </div>
        </div>
      </section>
      <FaqSchema items={PRO_FAQ} />
      <JsonLd data={graph(PRO_APP, breadcrumb([["Accueil", "/"], ["Établissements", "/etablissements"]]))} />
    </>
  );
}
