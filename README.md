# Site WineShare

Site statique (HTML/CSS/JS), même charte que wineshare.fr : vert #476525, or #D9A406, bleu nuit #02132B, fond #FFFCF7, Merriweather Sans + Poppins.

## Pages
- `index.html` : accueil (présentation de l'app, vidéo motion design, étapes, bandeau pros, blog, FAQ)
- `etablissements.html` : page pros avec les boutons App Store / Google Play de l'app WineShare Pro
- `blog.html` + `blog/*.html` : les 12 articles
- `contact.html` : formulaire branché sur `/api/contact` (même Cloud Function + reCAPTCHA que le site actuel)

## À modifier
- **Liens des stores** (app amateurs et app Pro) : `assets/js/config.js`, appliqués à tous les boutons.
- **Textes, FAQ, pages** : dans `build.py`, puis lancer `python3 build.py` pour régénérer les pages.
- **Articles** : `content/articles.txt` (un article par page, séparés par un saut de page), puis `python3 build.py`.
- **Vidéo** : `assets/video/wineshare-motion.mp4` (+ `poster.jpg`).

Les liens du pied de page (mentions légales, CGV, confidentialité, suppression de compte, pré-inscription) pointent vers les pages existantes du site actuel : déployer ce dossier au même endroit pour les conserver.

## Aperçu local
    python3 -m http.server 8765
puis ouvrir http://localhost:8765
