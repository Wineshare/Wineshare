# Site WineShare

Site React (Vite + React Router), même charte que wineshare.fr : vert #476525, or #D9A406, bleu nuit #02132B, fond #FFFCF7, Merriweather Sans + Poppins.
Hébergé sur Vercel. Chaque page est pré-rendue en HTML au build (bon référencement), puis React prend le relais dans le navigateur.

## Pages (`src/pages/`)
- `Home.jsx` (`/`) : accueil (présentation de l'app, vidéo motion design, étapes, bandeau pros, blog, FAQ)
- `Pro.jsx` (`/etablissements`) : page pros avec les boutons App Store / Google Play de l'app WineShare Pro
- `Blog.jsx` (`/blog`) + `Article.jsx` (`/blog/<slug>`) : les 12 articles
- `Contact.jsx` (`/contact`) : formulaire envoyé à `api/contact.js` (fonction Vercel + Resend)

Les anciennes adresses en `.html` (ex. `/blog.html`) sont redirigées automatiquement vers les nouvelles (`cleanUrls` dans `vercel.json`).

## À modifier
- **Liens des stores** (app amateurs et app Pro) : `src/config.js`, appliqués à tous les boutons.
- **Textes, FAQ** : dans les composants de `src/pages/` et `src/data/faq.js`.
- **Articles** : `src/data/articles.txt` (un article par page, séparés par un saut de page) ; catégories dans `src/data/articles.js`. Photo de couverture : `public/assets/img/blog/<slug>.webp`.
- **Vidéo** : `public/assets/video/wineshare-motion.mp4` (+ `poster.jpg`).

## Formulaire de contact (Resend)
Variables d'environnement à définir sur Vercel (et dans `.env.local` pour tester en local, voir `.env.example`) :
- `RESEND_API_KEY` : clé API Resend
- `CONTACT_TO_EMAIL` : adresse qui reçoit les messages (plusieurs possibles, séparées par des virgules)
- `CONTACT_FROM_EMAIL` : expéditeur sur le domaine vérifié (par défaut `WineShare <contact@wineshare.fr>`)

## Back-office statistiques (`/admin`)
Page `public/admin.html`, protégée par mot de passe : visiteurs, pages vues et clics sur les boutons App Store / Google Play, par jour et par mois (12 derniers mois), avec graphiques, pages les plus vues et sources de trafic.
- **Mesure** : `src/analytics.js` (page vue à chaque changement de page, clic sur chaque bouton de store) → `api/track.js` → base Upstash Redis.
- **Lecture** : `api/admin/stats.js`, appelée par le back-office avec le mot de passe.
- **Vie privée** : pas de cookie ni d'adresse IP stockée. Un visiteur est reconnu par une empreinte anonyme qui change chaque jour (il est donc compté une fois par jour).
- **Variables Vercel** : `ADMIN_PASSWORD` (à créer) ; `WINESHARE_KV_REST_API_URL` et `WINESHARE_KV_REST_API_TOKEN` (ajoutées par Vercel en connectant la base Redis).
- Dans le back-office, la case « Ne pas compter mes propres visites » exclut l'appareil utilisé.

## En local
    npm install
    npm run dev       # http://localhost:5173 (le formulaire fonctionne aussi)
    npm run build     # génère dist/
