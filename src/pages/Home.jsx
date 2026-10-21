import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Stores from "../components/Stores.jsx";
import Faq, { FaqSchema } from "../components/Faq.jsx";
import PostCard from "../components/PostCard.jsx";
import { useSeo } from "../components/Seo.jsx";
import { articles } from "../data/articles.js";
import { HOME_FAQ } from "../data/faq.js";
import { APP, ORGANIZATION, WEBSITE, graph } from "../data/schema.js";
import { JsonLd } from "../components/Seo.jsx";

function Stars({ n = 5 }) {
  return Array.from({ length: n }, (_, i) => <img key={i} src="/assets/svg/icon-star.svg" alt="" />);
}

function MotionVideo() {
  const video = useRef(null);
  const [muted, setMuted] = useState(true);

  // Lecture muette automatique quand la vidéo est visible, pause sinon
  useEffect(() => {
    const v = video.current;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      }),
      { threshold: 0.35 }
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const v = video.current;
    v.muted = !v.muted;
    if (!v.muted) {
      v.currentTime = 0;
      v.play();
    }
    setMuted(v.muted);
  };

  return (
    <div className="video-frame">
      <video ref={video} id="motion-video" src="/assets/video/wineshare-motion.mp4" poster="/assets/video/poster.webp" muted loop playsInline preload="metadata" aria-label="Vidéo de présentation de l'application WineShare"></video>
      <button className="video-sound" id="video-sound" type="button" onClick={toggleSound}>
        {muted ? (
          <svg className="ico-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="m23 9-6 6M17 9l6 6"/></svg>
        ) : (
          <svg className="ico-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>
        )}
        <span>{muted ? "Activer le son" : "Couper le son"}</span>
      </button>
    </div>
  );
}

export default function Home() {
  useSeo({
    title: "WineShare | Le réseau social des passionnés de vin",
    description: "Le réseau social des passionnés de vin : partagez vos dégustations, découvrez bars à vin et cavistes à Paris, " +
      "suivez leurs événements et gagnez des badges.",
    path: "/",
  });
  const latest = [articles[3], articles[0], articles[8]];

  return (
    <>
      {/* HERO */}
      <section className="hero" id="telecharger">
        <div className="container">
          <div>
            <p className="eyebrow reveal">Bientôt disponible – Paris</p>
            <h1 className="reveal d1">Le réseau social des<br /><span className="accent">passionnés de vin</span></h1>
            <p className="lead reveal d2">Partagez vos dégustations, rencontrez d'autres amateurs, découvrez des établissements partenaires et gagnez des badges exclusifs.</p>
            <p className="hero-cta-label reveal d2">Bientôt sur les stores</p>
            <div className="reveal d3">
              <Stores eager />
            </div>
            <p className="note reveal d3"><img src="/assets/svg/icon-sparkler.svg" alt="" width="18" height="18" />Pensé avec des sommeliers et des cavistes indépendants.</p>
          </div>
          <div className="hero-visual">
            <img className="hero-phone" src="/assets/png/app-mockup.webp" alt="L'application WineShare sur iPhone : écran Explorer avec les bars à vin et cavistes autour de soi" width="467" height="1022" fetchPriority="high" />
            <div className="float-card float-card--badge">
              <span className="ico ico--gold"><img src="/assets/svg/icon-medal-star.svg" alt="" width="32" height="32" /></span>
              <span><strong>Badge débloqué</strong><small>Explorateur • niveau 3</small></span>
            </div>
            <div className="float-card float-card--place">
              <span className="ico ico--green"><img src="/assets/svg/icon-glass.svg" alt="" width="21" height="32" /></span>
              <span><strong>Rouge ou Blanc</strong><small><Stars />&nbsp;5/5</small></span>
            </div>
          </div>
        </div>
      </section>

      {/* PILIERS */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-head center reveal">
            <p className="eyebrow">L'application</p>
            <h2>Découvrir. Partager. <span className="accent">Se connecter.</span></h2>
            <p className="lead">Tout ce qu'un amateur de vin attendait, réuni dans une seule app.</p>
          </div>
          <div className="pillars">
            <article className="pillar reveal">
              <div className="pillar-media"><img src="/assets/img/ecran-accueil.webp" alt="Feed WineShare avec une dégustation partagée" width="900" height="1155" loading="lazy" decoding="async" /></div>
              <div className="pillar-body">
                <span className="pillar-num">01 · PARTAGER</span>
                <h3>Un feed 100 % vin</h3>
                <p>Publiez vos dégustations, vos accords et vos coups de cœur. Likez, commentez et retrouvez l'adresse d'un simple « S'y rendre ».</p>
              </div>
            </article>
            <article className="pillar reveal d1">
              <div className="pillar-media"><img src="/assets/img/fiche-etablissement.webp" alt="Fiche d'un bar à vin dans WineShare" width="868" height="1813" loading="lazy" decoding="async" /></div>
              <div className="pillar-body">
                <span className="pillar-num">02 · DÉCOUVRIR</span>
                <h3>Les meilleures adresses</h3>
                <p>Bars à vin et cavistes autour de vous, avec leurs avis, leur carte des vins, leurs promotions et l'itinéraire en un geste.</p>
              </div>
            </article>
            <article className="pillar reveal d2">
              <div className="pillar-media"><img src="/assets/img/ecran-evenements.webp" alt="Agenda des événements WineShare" width="900" height="1155" loading="lazy" decoding="async" /></div>
              <div className="pillar-body">
                <span className="pillar-num">03 · VIVRE</span>
                <h3>Des événements à ne pas manquer</h3>
                <p>Dégustations, ateliers, soirées, salons : réservez votre place et cumulez des points VIP chez les partenaires.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* VIDÉO MOTION DESIGN */}
      <section className="section" id="video">
        <div className="container video-block">
          <div className="video-wrap reveal">
            <MotionVideo />
          </div>
          <div className="video-text">
            <p className="eyebrow eyebrow--gold reveal">En 30 secondes</p>
            <h2 className="reveal d1">Le vin se vit mieux <span className="accent">à plusieurs</span></h2>
            <p className="lead reveal d1">WineShare est né d'un constat simple : les meilleures bouteilles sont celles qu'on nous recommande. L'app rapproche les amateurs de vin des bars à vin et cavistes qui les font vibrer.</p>
            <ul className="check-list reveal d2">
              <li><span><strong>Une carte géolocalisée</strong> des adresses vin sélectionnées près de chez vous.</span></li>
              <li><span><strong>Des dégustations authentiques</strong> partagées par une communauté de passionnés.</span></li>
              <li><span><strong>Des badges et des avantages</strong> à débloquer au fil de vos découvertes.</span></li>
            </ul>
            <div className="reveal d3"><Stores /></div>
          </div>
        </div>
      </section>

      {/* PUBLIER UNE DÉGUSTATION */}
      <section className="section section--cream">
        <div className="container steps-layout">
          <div>
            <div className="section-head reveal">
              <p className="eyebrow">Comment ça marche</p>
              <h2>Publier une dégustation en <span className="accent">moins d'une minute</span></h2>
            </div>
            <ol className="steps">
              <li className="reveal"><div><h3>Prenez une photo</h3><p>Votre verre, votre bouteille ou votre planche : recadrez et c'est prêt.</p></div></li>
              <li className="reveal d1"><div><h3>L'établissement est détecté</h3><p>WineShare reconnaît automatiquement le bar ou la cave où vous vous trouvez.</p></div></li>
              <li className="reveal d2"><div><h3>Notez et partagez</h3><p>Ajoutez le vin dégusté, votre note sur 5 et votre ressenti. Votre dégustation rejoint le feed.</p></div></li>
            </ol>
          </div>
          <div className="steps-visual reveal d1">
            <img src="/assets/img/publication-degustation.webp" alt="Parcours de publication d'une dégustation dans WineShare" width="900" height="448" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      {/* BANDEAU PROS */}
      <section className="section">
        <div className="container">
          <div className="pro-band reveal">
            <div>
              <p className="eyebrow">Bars à vin · Cavistes</p>
              <h2>Vous êtes un établissement ?</h2>
              <p>Rejoignez WineShare Pro : mettez en avant votre carte des vins, vos promotions et vos événements auprès d'une communauté de passionnés.</p>
              <Link className="btn btn--light" to="/etablissements">Découvrir WineShare Pro →</Link>
            </div>
            <div className="pro-band-visual">
              <img src="/assets/img/fiche-partenaire.webp" alt="Fiche d'un établissement partenaire" width="803" height="1958" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-head reveal" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: "1.5rem", maxWidth: "none" }}>
            <div style={{ maxWidth: "40rem" }}>
              <p className="eyebrow">Le blog</p>
              <h2>Le vin, <span className="accent">simplement</span></h2>
              <p className="lead">Conseils de sommelier, repères de dégustation et bonnes adresses pour progresser verre après verre.</p>
            </div>
            <Link className="btn btn--ghost" to="/blog">Tous les articles</Link>
          </div>
          <div className="blog-grid">
            {latest.map((a) => <PostCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container faq-layout">
          <div className="section-head reveal">
            <p className="eyebrow">FAQ</p>
            <h2>Questions <span className="accent">fréquentes</span></h2>
            <p className="lead">Vous ne trouvez pas votre réponse ? <Link className="accent" to="/contact" style={{ fontWeight: 600 }}>Écrivez-nous</Link>.</p>
          </div>
          <Faq items={HOME_FAQ} className="reveal d1" />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-final">
        <div className="container">
          <div className="inner reveal">
            <img className="app-icon" src="/assets/png/app-icon.webp" alt="Icône de l'application WineShare" width="256" height="256" loading="lazy" />
            <h2>Rejoignez la communauté <span className="accent">WineShare</span></h2>
            <p className="lead">Téléchargez l'application et partagez votre prochaine dégustation.</p>
            <Stores />
          </div>
        </div>
      </section>
      <FaqSchema items={HOME_FAQ} />
      <JsonLd data={graph(ORGANIZATION, WEBSITE, APP)} />
    </>
  );
}
