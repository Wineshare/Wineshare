#!/usr/bin/env python3
"""Génère les pages HTML du site WineShare.

Usage : python3 build.py
- En-tête et pied de page communs à toutes les pages
- Articles du blog générés depuis content/articles.txt
  (export texte du .docx : un article par page, séparés par un saut de page)
"""
import html
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).parent
SITE_URL = "https://wineshare.fr"
GTM_ID = "GTM-W83MHBGP"  # Google Tag Manager
GA_ID = "G-KX7C8L15GM"   # Google Analytics (gtag.js)

# Catégorie + couleur de couverture de chaque article, dans l'ordre du document
ARTICLE_META = [
    ("bases", "cover--green"),
    ("bases", "cover--gold"),
    ("bases", "cover--olive"),
    ("degustation", "cover--wine"),
    ("degustation", "cover--ink"),
    ("regions", "cover--green"),
    ("regions", "cover--wine"),
    ("accords", "cover--gold"),
    ("accords", "cover--olive"),
    ("degustation", "cover--ink"),
    ("bases", "cover--green"),
    ("culture", "cover--wine"),
]
CATEGORIES = {
    "bases": "Les bases",
    "degustation": "Dégustation",
    "regions": "Régions",
    "accords": "Accords & occasions",
    "culture": "Culture du vin",
}

e = html.escape


def slugify(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:70].strip("-")


# ---------------------------------------------------------------- Gabarits

def head(title, description, root, canonical):
    return f"""<!DOCTYPE html>
<html lang="fr" class="no-js">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());

    gtag('config', '{GA_ID}');
  </script>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){{w[l]=w[l]||[];w[l].push({{'gtm.start':
  new Date().getTime(),event:'gtm.js'}});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  }})(window,document,'script','dataLayer','{GTM_ID}');</script>
  <!-- End Google Tag Manager -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{e(title)}</title>
  <meta name="description" content="{e(description)}" />
  <link rel="canonical" href="{SITE_URL}/{canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="{e(title)}" />
  <meta property="og:description" content="{e(description)}" />
  <meta property="og:image" content="{SITE_URL}/assets/video/poster.jpg" />
  <meta name="theme-color" content="#476525" />
  <link rel="icon" type="image/svg+xml" href="{root}assets/favicon/favicon.svg" />
  <link rel="apple-touch-icon" href="{root}assets/favicon/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@700;800&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{root}assets/css/site.css" />
  <script src="{root}assets/js/config.js"></script>
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id={GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
"""


def header(root, active):
    def link(href, label, key):
        cur = ' aria-current="page"' if key == active else ""
        return f'<a href="{root}{href}"{cur}>{label}</a>'

    return f"""  <header class="site-header">
    <div class="container">
      <a class="brand" href="{root}index.html" aria-label="WineShare, accueil">
        <img src="{root}assets/svg/logo-wineshare.svg" alt="" width="56" height="42" />
        <span>WineShare</span>
      </a>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
      <nav class="nav" id="nav" aria-label="Navigation principale">
        {link("index.html", "Accueil", "home")}
        {link("etablissements.html", "Établissements", "pro")}
        {link("blog.html", "Blog", "blog")}
        {link("contact.html", "Contact", "contact")}
        <a class="btn btn--primary" href="{root}index.html#telecharger">Télécharger l'app</a>
      </nav>
    </div>
  </header>
"""


def footer(root, extra_scripts=""):
    return f"""  <footer class="site-footer">
    <div class="container top">
      <div>
        <a class="brand" href="{root}index.html">
          <img src="{root}assets/svg/logo-white.svg" alt="" width="56" height="42" />
          <span>WineShare</span>
        </a>
        <p>Le réseau social des passionnés de vin. Pensé avec des sommeliers et des cavistes indépendants.</p>
      </div>
      <div>
        <h4>Le site</h4>
        <ul>
          <li><a href="{root}index.html">Accueil</a></li>
          <li><a href="{root}etablissements.html">Établissements</a></li>
          <li><a href="{root}blog.html">Blog</a></li>
          <li><a href="{root}index.html#faq">Questions fréquentes</a></li>
        </ul>
      </div>
      <div>
        <h4>L'application</h4>
        <ul>
          <li><a data-store="appstore" href="#">App Store</a></li>
          <li><a data-store="googleplay" href="#">Google Play</a></li>
          <li><a href="{root}pre-inscription.html">Pré-inscription</a></li>
          <li><a href="{root}etablissements.html">WineShare Pro</a></li>
        </ul>
      </div>
      <div>
        <h4>Aide</h4>
        <ul>
          <li><a href="{root}contact.html">Contactez-nous</a></li>
          <li><a href="{root}delete-account.html">Supprimer mon compte</a></li>
        </ul>
      </div>
    </div>
    <div class="container bottom">
      <span>© 2026 WineShare. L'abus d'alcool est dangereux pour la santé, à consommer avec modération.</span>
      <ul>
        <li><a href="{root}mention.html">Mentions légales</a></li>
        <li><a href="{root}confidentiality.html">Confidentialité</a></li>
        <li><a href="{root}cgvu.html">CGV</a></li>
      </ul>
    </div>
  </footer>
{extra_scripts}  <script src="{root}assets/js/main.js"></script>
</body>
</html>
"""


def stores(root, pro=False):
    suffix = "-pro" if pro else ""
    return f"""<div class="stores">
          <a data-store="googleplay{suffix}" href="#"><img src="{root}assets/svg/google_play.svg" alt="Disponible sur Google Play" /></a>
          <a data-store="appstore{suffix}" href="#"><img src="{root}assets/svg/app_store.svg" alt="Télécharger dans l'App Store" /></a>
        </div>"""


def stars(root, n=5):
    return "".join(f'<img src="{root}assets/svg/icon-star.svg" alt="" />' for _ in range(n))


def faq_html(items):
    out = []
    for q, a in items:
        out.append(f"""          <details>
            <summary>{q}</summary>
            <div class="answer">{a}</div>
          </details>""")
    return "\n".join(out)


def faq_schema(items):
    import json
    data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", "", a)}}
            for q, a in items
        ],
    }
    return f'  <script type="application/ld+json">{json.dumps(data, ensure_ascii=False)}</script>\n'


# ---------------------------------------------------------------- Articles

def parse_articles():
    raw = (ROOT / "content" / "articles.txt").read_text(encoding="utf-8")
    articles = []
    for i, chunk in enumerate(c for c in raw.split("\f") if c.strip()):
        lines = [l.strip() for l in chunk.splitlines() if l.strip()]
        title, body = lines[0], lines[1:]
        blocks = []
        for line in body:
            if line.startswith("Le petit plus WineShare"):
                blocks.append(("tip", line))
            elif len(line) < 90 and not line.endswith((".", "!", "…")):
                blocks.append(("h2", line))
            else:
                blocks.append(("p", line))
        cat, cover = ARTICLE_META[i]
        words = len(" ".join(body).split())
        articles.append({
            "n": i + 1, "title": title, "slug": slugify(title), "blocks": blocks,
            "excerpt": body[0], "cat": cat, "cover": cover, "minutes": max(2, round(words / 220)),
        })
    return articles


def cover_html(a, root):
    return f"""<div class="cover {a['cover']}">
            <img class="cover-mark" src="{root}assets/svg/logo-white.svg" alt="" />
            <span class="cover-num">{a['n']:02d}</span>
            <span class="cover-title">{CATEGORIES[a['cat']]}</span>
          </div>"""


def card_html(a, root):
    excerpt = a["excerpt"]
    if len(excerpt) > 150:
        excerpt = excerpt[:150].rsplit(" ", 1)[0] + "…"
    return f"""        <a class="post-card reveal" data-cat="{a['cat']}" href="{root}blog/{a['slug']}.html">
          {cover_html(a, root)}
          <div class="post-body">
            <div class="post-meta"><span>{a['minutes']} min de lecture</span></div>
            <h3>{e(a['title'])}</h3>
            <p>{e(excerpt)}</p>
            <span class="post-more">Lire l'article</span>
          </div>
        </a>"""


def render_article(a, articles):
    root = "../"
    parts = []
    first_p = True
    for kind, text in a["blocks"]:
        if kind == "h2":
            parts.append(f"      <h2>{e(text)}</h2>")
        elif kind == "tip":
            label, _, rest = text.partition(":")
            parts.append(f'      <div class="tip"><strong>{e(label.strip())} :</strong> {e(rest.strip())}</div>')
        else:
            cls = ' class="intro"' if first_p else ""
            parts.append(f"      <p{cls}>{e(text)}</p>")
            first_p = False
    others = [o for o in articles if o["cat"] == a["cat"] and o is not a]
    others += [o for o in articles if o not in others and o is not a]
    related = "\n".join(card_html(o, root) for o in others[:3])
    desc = a["excerpt"][:155]
    return (
        head(f"{a['title']} | Blog WineShare", desc, root, f"blog/{a['slug']}.html")
        + header(root, "blog")
        + f"""  <main>
    <section class="article-hero">
      <div class="container">
        <p class="breadcrumb"><a href="{root}blog.html">← Tous les articles</a></p>
        <div class="post-meta"><span class="tag">{CATEGORIES[a['cat']]}</span><span>{a['minutes']} min de lecture</span><span>Par l'équipe WineShare</span></div>
        <h1>{e(a['title'])}</h1>
      </div>
    </section>
    <div class="article-cover">
      {cover_html(a, root)}
    </div>
    <article class="article-body">
{chr(10).join(parts)}
      <div class="article-cta">
        <div>
          <h3>Mettez-le en pratique près de chez vous</h3>
          <p>Bars à vin, cavistes, dégustations : tout est dans l'app WineShare.</p>
        </div>
        <a class="btn btn--light" href="{root}index.html#telecharger">Télécharger l'app</a>
      </div>
    </article>
    <section class="section">
      <div class="container">
        <div class="section-head"><h2>À lire aussi</h2></div>
        <div class="blog-grid">
{related}
        </div>
      </div>
    </section>
  </main>
"""
        + footer(root)
    )


# ---------------------------------------------------------------- Pages

HOME_FAQ = [
    ("Qu'est-ce que WineShare ?",
     "WineShare est le réseau social des passionnés de vin. L'application vous permet de partager vos dégustations, "
     "de découvrir des bars à vin et cavistes autour de vous, de suivre leurs événements et de gagner des badges en explorant."),
    ("L'application est-elle gratuite ?",
     "Oui, l'application WineShare est gratuite à télécharger et à utiliser pour les amateurs de vin, sur iPhone comme sur Android."),
    ("Faut-il être un expert en vin pour utiliser WineShare ?",
     "Pas du tout. WineShare a été pensée pour tous les curieux, du débutant au passionné. Vous notez simplement ce que vous avez aimé, "
     "et notre <a href=\"blog.html\">blog</a> vous aide à progresser pas à pas."),
    ("Comment publier une dégustation ?",
     "Appuyez sur le bouton « + », prenez une photo de votre verre ou de votre bouteille, puis laissez WineShare détecter l'établissement "
     "où vous vous trouvez. Ajoutez le vin dégusté, votre note et votre ressenti : c'est publié dans le feed de la communauté."),
    ("Dans quelles villes WineShare est-elle disponible ?",
     "WineShare démarre à Paris, avec une sélection de bars à vin et de cavistes indépendants. D'autres villes suivront au fil des partenariats."),
    ("Comment fonctionnent les badges ?",
     "Chaque dégustation publiée, établissement découvert ou événement auquel vous participez vous fait progresser. "
     "Vous débloquez des badges (Explorateur, Dégustateur…) et des niveaux, avec des avantages chez les établissements partenaires."),
    ("Je gère un bar à vin ou une cave, comment rejoindre WineShare ?",
     "Les professionnels disposent de leur propre application, WineShare Pro, pour gérer leur fiche, leur carte des vins, leurs promotions "
     "et leurs événements. Tout est expliqué sur la page <a href=\"etablissements.html\">Établissements</a>."),
    ("Mes données sont-elles protégées ?",
     "Oui. Vos données sont traitées conformément au RGPD et ne sont jamais revendues. Vous pouvez à tout moment "
     "<a href=\"delete-account.html\">supprimer votre compte</a>. Détails dans notre <a href=\"confidentiality.html\">politique de confidentialité</a>."),
]

PRO_FAQ = [
    ("Qui peut rejoindre WineShare Pro ?",
     "Les bars à vin, cavistes, restaurants à forte identité vin, domaines et vignerons qui reçoivent du public. "
     "Nous démarrons avec des établissements indépendants à Paris."),
    ("En quoi l'app Pro est-elle différente de l'app WineShare ?",
     "L'app WineShare est destinée aux amateurs. WineShare Pro est l'outil de gestion de votre établissement : vous y éditez votre fiche, "
     "votre carte des vins, vos promotions et vos événements, qui apparaissent ensuite chez les utilisateurs de WineShare."),
    ("Combien de temps faut-il pour créer sa fiche ?",
     "Une quinzaine de minutes suffit : photos, description, horaires, ambiance et quelques références de votre carte. Vous pourrez l'enrichir ensuite."),
    ("Comment les amateurs trouvent-ils mon établissement ?",
     "Via l'onglet Explorer et sa carte géolocalisée, via les dégustations publiées chez vous par la communauté, et via l'agenda des événements."),
    ("Besoin d'aide pour démarrer ?",
     "Notre équipe vous accompagne pour la mise en ligne de votre fiche. <a href=\"contact.html?profil=etablissement\">Écrivez-nous</a>, on vous rappelle."),
]


def page_home(articles):
    root = ""
    latest = "\n".join(card_html(a, root) for a in [articles[3], articles[0], articles[8]])
    return (
        head("WineShare | Le réseau social des passionnés de vin",
             "WineShare, le réseau social des passionnés de vin. Partagez vos dégustations, découvrez des bars à vin et cavistes partenaires, "
             "suivez leurs événements et gagnez des badges exclusifs.", root, "")
        + header(root, "home")
        + f"""  <main>
    <!-- HERO -->
    <section class="hero" id="telecharger">
      <div class="container">
        <div>
          <p class="eyebrow reveal">Bientôt disponible – Paris</p>
          <h1 class="reveal d1">Le réseau social des<br /><span class="accent">passionnés de vin</span></h1>
          <p class="lead reveal d2">Partagez vos dégustations, rencontrez d'autres amateurs, découvrez des établissements partenaires et gagnez des badges exclusifs.</p>
          <p class="hero-cta-label reveal d2">Téléchargez notre application</p>
          <div class="reveal d3">
            {stores(root)}
          </div>
          <p class="note reveal d3"><img src="assets/svg/icon-sparkler.svg" alt="" />Pensé avec des sommeliers et des cavistes indépendants.</p>
        </div>
        <div class="hero-visual">
          <img class="hero-phone" src="assets/png/app-mockup.png" alt="L'application WineShare, écran Explorer" width="467" height="1022" />
          <div class="float-card float-card--badge">
            <span class="ico ico--gold"><img src="assets/svg/icon-medal-star.svg" alt="" /></span>
            <span><strong>Badge débloqué</strong><small>Explorateur • niveau 3</small></span>
          </div>
          <div class="float-card float-card--place">
            <span class="ico ico--green"><img src="assets/svg/icon-glass.svg" alt="" /></span>
            <span><strong>Rouge ou Blanc</strong><small>{stars(root)}&nbsp;5/5</small></span>
          </div>
        </div>
      </div>
    </section>

    <!-- PILIERS -->
    <section class="section section--cream">
      <div class="container">
        <div class="section-head center reveal">
          <p class="eyebrow">L'application</p>
          <h2>Découvrir. Partager. <span class="accent">Se connecter.</span></h2>
          <p class="lead">Tout ce qu'un amateur de vin attendait, réuni dans une seule app.</p>
        </div>
        <div class="pillars">
          <article class="pillar reveal">
            <div class="pillar-media"><img src="assets/img/ecran-accueil.webp" alt="Feed WineShare avec une dégustation partagée" loading="lazy" /></div>
            <div class="pillar-body">
              <span class="pillar-num">01 · PARTAGER</span>
              <h3>Un feed 100 % vin</h3>
              <p>Publiez vos dégustations, vos accords et vos coups de cœur. Likez, commentez et retrouvez l'adresse d'un simple « S'y rendre ».</p>
            </div>
          </article>
          <article class="pillar reveal d1">
            <div class="pillar-media"><img src="assets/img/fiche-etablissement.webp" alt="Fiche d'un bar à vin dans WineShare" loading="lazy" /></div>
            <div class="pillar-body">
              <span class="pillar-num">02 · DÉCOUVRIR</span>
              <h3>Les meilleures adresses</h3>
              <p>Bars à vin et cavistes autour de vous, avec leurs avis, leur carte des vins, leurs promotions et l'itinéraire en un geste.</p>
            </div>
          </article>
          <article class="pillar reveal d2">
            <div class="pillar-media"><img src="assets/img/ecran-evenements.webp" alt="Agenda des événements WineShare" loading="lazy" /></div>
            <div class="pillar-body">
              <span class="pillar-num">03 · VIVRE</span>
              <h3>Des événements à ne pas manquer</h3>
              <p>Dégustations, ateliers, soirées, salons : réservez votre place et cumulez des points VIP chez les partenaires.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- VIDÉO MOTION DESIGN -->
    <section class="section" id="video">
      <div class="container video-block">
        <div class="video-wrap reveal">
          <div class="video-frame">
            <video id="motion-video" src="assets/video/wineshare-motion.mp4" poster="assets/video/poster.jpg" muted loop playsinline preload="metadata" aria-label="Vidéo de présentation de l'application WineShare"></video>
            <button class="video-sound" id="video-sound" type="button">
              <svg class="ico-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="m23 9-6 6M17 9l6 6"/></svg>
              <svg class="ico-on" style="display:none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>
              <span>Activer le son</span>
            </button>
          </div>
        </div>
        <div class="video-text">
          <p class="eyebrow eyebrow--gold reveal">En 30 secondes</p>
          <h2 class="reveal d1">Le vin se vit mieux <span class="accent">à plusieurs</span></h2>
          <p class="lead reveal d1">WineShare est né d'un constat simple : les meilleures bouteilles sont celles qu'on nous recommande. L'app rapproche les amateurs de vin des bars à vin et cavistes qui les font vibrer.</p>
          <ul class="check-list reveal d2">
            <li><span><strong>Une carte géolocalisée</strong> des adresses vin sélectionnées près de chez vous.</span></li>
            <li><span><strong>Des dégustations authentiques</strong> partagées par une communauté de passionnés.</span></li>
            <li><span><strong>Des badges et des avantages</strong> à débloquer au fil de vos découvertes.</span></li>
          </ul>
          <div class="reveal d3">{stores(root)}</div>
        </div>
      </div>
    </section>

    <!-- PUBLIER UNE DÉGUSTATION -->
    <section class="section section--cream">
      <div class="container steps-layout">
        <div>
          <div class="section-head reveal">
            <p class="eyebrow">Comment ça marche</p>
            <h2>Publier une dégustation en <span class="accent">moins d'une minute</span></h2>
          </div>
          <ol class="steps">
            <li class="reveal"><div><h3>Prenez une photo</h3><p>Votre verre, votre bouteille ou votre planche : recadrez et c'est prêt.</p></div></li>
            <li class="reveal d1"><div><h3>L'établissement est détecté</h3><p>WineShare reconnaît automatiquement le bar ou la cave où vous vous trouvez.</p></div></li>
            <li class="reveal d2"><div><h3>Notez et partagez</h3><p>Ajoutez le vin dégusté, votre note sur 5 et votre ressenti. Votre dégustation rejoint le feed.</p></div></li>
          </ol>
        </div>
        <div class="steps-visual reveal d1">
          <img src="assets/img/publication-degustation.jpg" alt="Parcours de publication d'une dégustation dans WineShare" loading="lazy" />
        </div>
      </div>
    </section>

    <!-- BANDEAU PROS -->
    <section class="section">
      <div class="container">
        <div class="pro-band reveal">
          <div>
            <p class="eyebrow">Bars à vin · Cavistes</p>
            <h2>Vous êtes un établissement ?</h2>
            <p>Rejoignez WineShare Pro : mettez en avant votre carte des vins, vos promotions et vos événements auprès d'une communauté de passionnés.</p>
            <a class="btn btn--light" href="etablissements.html">Découvrir WineShare Pro →</a>
          </div>
          <div class="pro-band-visual">
            <img src="assets/img/fiche-partenaire.webp" alt="Fiche d'un établissement partenaire" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- BLOG -->
    <section class="section section--cream">
      <div class="container">
        <div class="section-head reveal" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:1.5rem;max-width:none">
          <div style="max-width:40rem">
            <p class="eyebrow">Le blog</p>
            <h2>Le vin, <span class="accent">simplement</span></h2>
            <p class="lead">Conseils de sommelier, repères de dégustation et bonnes adresses pour progresser verre après verre.</p>
          </div>
          <a class="btn btn--ghost" href="blog.html">Tous les articles</a>
        </div>
        <div class="blog-grid">
{latest}
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section" id="faq">
      <div class="container faq-layout">
        <div class="section-head reveal">
          <p class="eyebrow">FAQ</p>
          <h2>Questions <span class="accent">fréquentes</span></h2>
          <p class="lead">Vous ne trouvez pas votre réponse ? <a class="accent" href="contact.html" style="font-weight:600">Écrivez-nous</a>.</p>
        </div>
        <div class="faq reveal d1">
{faq_html(HOME_FAQ)}
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="cta-final">
      <div class="container">
        <div class="inner reveal">
          <img class="app-icon" src="assets/png/app-icon.jpg" alt="Icône de l'application WineShare" />
          <h2>Rejoignez la communauté <span class="accent">WineShare</span></h2>
          <p class="lead">Téléchargez l'application et partagez votre prochaine dégustation.</p>
          {stores(root)}
        </div>
      </div>
    </section>
  </main>
"""
        + footer(root, faq_schema(HOME_FAQ))
    )


FEATURE_ICONS = {
    "store": '<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9z"/><path d="M5 13v7h14v-7"/><path d="M10 20v-4h4v4"/>',
    "wine": '<path d="M8 2h8l-.5 7a3.5 3.5 0 0 1-7 0L8 2z"/><path d="M12 12.5V20"/><path d="M8 21h8"/><path d="M8.3 6h7.4"/>',
    "tag": '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    "calendar": '<rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/>',
    "star": '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z"/>',
    "chat": '<path d="M21 12a8 8 0 0 1-11.8 7L3 21l2-6.2A8 8 0 1 1 21 12z"/><path d="M8 11h8M8 14.5h5"/>',
}


def feature(icon, title, text, delay=""):
    return f"""          <article class="feature reveal {delay}">
            <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">{FEATURE_ICONS[icon]}</svg></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>"""


def page_pro():
    root = ""
    return (
        head("WineShare Pro | Pour les bars à vin et cavistes",
             "Bars à vin, cavistes : téléchargez WineShare Pro pour gérer votre fiche, votre carte des vins, vos promotions et vos événements "
             "auprès de la communauté WineShare.", root, "etablissements.html")
        + header(root, "pro")
        + f"""  <main>
    <section class="page-hero pro-hero">
      <div class="container">
        <div>
          <p class="eyebrow reveal">Espace établissements</p>
          <h1 class="reveal d1">Faites découvrir votre cave aux <span class="accent">passionnés de vin</span></h1>
          <p class="lead reveal d2">Bar à vin, caviste, restaurant : avec l'application WineShare Pro, gérez votre présence sur WineShare et attirez une clientèle curieuse, fidèle et amoureuse du vin.</p>
          <div class="pro-app reveal d2">
            <img src="assets/png/app-icon.jpg" alt="" />
            <div><strong>WineShare Pro</strong><span>L'application dédiée aux professionnels</span></div>
          </div>
          <div class="reveal d3">
            {stores(root, pro=True)}
          </div>
          <p class="note reveal d3"><img src="assets/svg/icon-sparkler.svg" alt="" />Pensé avec des sommeliers et des cavistes indépendants.</p>
        </div>
        <div class="pro-hero-visual reveal d1">
          <img src="assets/img/fiche-partenaire.webp" alt="Fiche établissement partenaire dans WineShare" />
          <div class="float-card float-card--badge">
            <span class="ico ico--green"><img src="assets/svg/icon-glass.svg" alt="" /></span>
            <span><strong>Partenaire</strong><small>Badge affiché sur votre fiche</small></span>
          </div>
          <div class="float-card float-card--place">
            <span class="ico ico--gold"><img src="assets/svg/icon-medal-star.svg" alt="" /></span>
            <span><strong>-30% vins nature</strong><small>Promotion publiée</small></span>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cream">
      <div class="container">
        <div class="section-head center reveal">
          <p class="eyebrow">Ce que vous gérez</p>
          <h2>Tout votre établissement, <span class="accent">dans votre poche</span></h2>
          <p class="lead">Mettez à jour en quelques secondes ce que les amateurs voient de vous dans WineShare.</p>
        </div>
        <div class="features">
{feature("store", "Votre fiche établissement", "Photos, description, horaires, adresse et tags d'ambiance : une vitrine soignée, visible sur la carte Explorer.")}
{feature("wine", "Votre carte des vins", "Mettez en avant vos références du moment, avec appellation, millésime et prix au verre ou à la bouteille.", "d1")}
{feature("tag", "Vos promotions", "Lancez une offre limitée dans le temps et touchez immédiatement les amateurs autour de vous.", "d2")}
{feature("calendar", "Vos événements", "Dégustations, ateliers, soirées : publiez vos événements et suivez les réservations et les places restantes.")}
{feature("star", "Vos avis et dégustations", "Retrouvez les dégustations publiées chez vous par la communauté et suivez votre note.", "d1")}
{feature("chat", "Le contact direct", "Les amateurs vous contactent, vous appellent ou lancent l'itinéraire depuis votre fiche.", "d2")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container split">
        <div class="split-visual reveal"><img src="assets/img/ecran-evenements.webp" alt="Événements d'un établissement partenaire" loading="lazy" /></div>
        <div>
          <div class="section-head reveal">
            <p class="eyebrow">Démarrer</p>
            <h2>En ligne en <span class="accent">3 étapes</span></h2>
          </div>
          <ol class="steps">
            <li class="reveal"><div><h3>Téléchargez WineShare Pro</h3><p>Disponible sur l'App Store et Google Play.</p></div></li>
            <li class="reveal d1"><div><h3>Créez votre fiche</h3><p>Ajoutez vos photos, votre ambiance et vos premières références.</p></div></li>
            <li class="reveal d2"><div><h3>Animez votre communauté</h3><p>Publiez promotions et événements, et suivez l'activité de votre établissement.</p></div></li>
          </ol>
          <div class="reveal d3" style="margin-top:2rem">{stores(root, pro=True)}</div>
        </div>
      </div>
    </section>

    <section class="section section--cream">
      <div class="container faq-layout">
        <div class="section-head reveal">
          <p class="eyebrow">FAQ Pros</p>
          <h2>Vos <span class="accent">questions</span></h2>
          <p class="lead">Un doute avant de vous lancer ? Notre équipe vous répond.</p>
          <a class="btn btn--ghost" style="margin-top:1.5rem" href="contact.html?profil=etablissement">Contacter l'équipe</a>
        </div>
        <div class="faq reveal d1">
{faq_html(PRO_FAQ)}
        </div>
      </div>
    </section>

    <section class="cta-final section--tight">
      <div class="container">
        <div class="inner reveal" style="background:var(--green)">
          <h2 style="color:#fff">Prêt à rejoindre WineShare ?</h2>
          <p class="lead" style="color:rgba(255,255,255,.85)">Téléchargez l'application WineShare Pro et créez votre fiche dès aujourd'hui.</p>
          {stores(root, pro=True)}
        </div>
      </div>
    </section>
  </main>
"""
        + footer(root, faq_schema(PRO_FAQ))
    )


def page_blog(articles):
    root = ""
    chips = ['<button class="chip" data-filter="all" aria-pressed="true">Tous</button>'] + [
        f'<button class="chip" data-filter="{k}" aria-pressed="false">{v}</button>' for k, v in CATEGORIES.items()
    ]
    cards = "\n".join(card_html(a, root) for a in articles)
    return (
        head("Blog WineShare | Conseils vin, dégustation et accords",
             "Le blog WineShare : conseils de sommelier pour lire une étiquette, déguster comme un pro, réussir vos accords mets-vins "
             "et découvrir les régions viticoles.", root, "blog.html")
        + header(root, "blog")
        + f"""  <main>
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow reveal">Le blog</p>
        <h1 class="reveal d1">Le vin, expliqué <span class="accent">simplement</span></h1>
        <p class="lead reveal d2">Conseils de sommelier, repères de dégustation, accords et culture du vin : de quoi progresser verre après verre.</p>
      </div>
    </section>
    <section style="padding-bottom:var(--section)">
      <div class="container">
        <div class="filters" role="group" aria-label="Filtrer par catégorie">
          {"".join(chips)}
        </div>
        <div class="blog-grid">
{cards}
        </div>
      </div>
    </section>
  </main>
"""
        + footer(root)
    )


def page_contact():
    root = ""
    return (
        head("Contact | WineShare",
             "Une question sur l'application WineShare, un partenariat ou une demande presse ? Contactez l'équipe WineShare.",
             root, "contact.html")
        + header(root, "contact")
        + f"""  <main>
    <section class="page-hero" style="padding-bottom:2.5rem">
      <div class="container">
        <p class="eyebrow reveal">Contact</p>
        <h1 class="reveal d1">Parlons <span class="accent">vin</span></h1>
        <p class="lead reveal d2">Une question sur l'application, un projet de partenariat ou une demande presse ? Écrivez-nous, nous vous répondons rapidement.</p>
      </div>
    </section>
    <section style="padding-bottom:var(--section)">
      <div class="container contact-layout">
        <form class="form-card reveal" id="contact-form" novalidate>
          <div class="form-status" id="form-status" role="status" aria-live="polite"></div>
          <div class="form-grid">
            <div class="field">
              <label for="name">Nom et prénom</label>
              <input id="name" name="name" type="text" autocomplete="name" required />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" autocomplete="email" required />
            </div>
            <div class="field">
              <label for="profile">Vous êtes</label>
              <select id="profile" name="profile">
                <option value="amateur">Un amateur de vin</option>
                <option value="etablissement">Un établissement (bar à vin, caviste…)</option>
                <option value="vigneron">Un vigneron / domaine</option>
                <option value="presse">Presse / partenariat</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div class="field">
              <label for="subject">Sujet</label>
              <input id="subject" name="subject" type="text" />
            </div>
            <div class="field field--full">
              <label for="message">Message</label>
              <textarea id="message" name="message" required></textarea>
            </div>
          </div>
          <div class="form-actions">
            <div class="g-recaptcha" data-sitekey="6LccDaktAAAAAMwzB02Z31HxSoGSXZ9-36iWA5F_"></div>
            <button class="btn btn--primary" type="submit">Envoyer le message</button>
          </div>
        </form>
        <aside class="contact-aside">
          <div class="info-card reveal d1">
            <h3>Questions fréquentes</h3>
            <p>La réponse à votre question s'y trouve peut-être déjà.</p>
            <a class="link" href="index.html#faq">Voir la FAQ →</a>
          </div>
          <div class="info-card info-card--green reveal d2">
            <h3>Vous êtes un établissement ?</h3>
            <p>Découvrez WineShare Pro, l'application dédiée aux bars à vin et cavistes.</p>
            <a class="btn btn--light" href="etablissements.html">WineShare Pro →</a>
          </div>
          <div class="info-card reveal d3">
            <h3>Supprimer mon compte</h3>
            <p>Vous souhaitez supprimer votre compte et vos données ?</p>
            <a class="link" href="delete-account.html">Faire la demande →</a>
          </div>
        </aside>
      </div>
    </section>
  </main>
"""
        + footer(root, '  <script src="https://www.google.com/recaptcha/api.js" async defer></script>\n')
    )


def main():
    articles = parse_articles()
    assert len(articles) == len(ARTICLE_META), f"{len(articles)} articles trouvés"
    pages = {
        "index.html": page_home(articles),
        "etablissements.html": page_pro(),
        "blog.html": page_blog(articles),
        "contact.html": page_contact(),
    }
    for a in articles:
        pages[f"blog/{a['slug']}.html"] = render_article(a, articles)
    for path, content in pages.items():
        (ROOT / path).write_text(content, encoding="utf-8")
    # Plan du site
    urls = "\n".join(f"  <url><loc>{SITE_URL}/{p.replace('index.html', '')}</loc></url>" for p in pages)
    (ROOT / "sitemap.xml").write_text(
        f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}\n</urlset>\n',
        encoding="utf-8")
    print(f"{len(pages)} pages générées")


if __name__ == "__main__":
    main()
