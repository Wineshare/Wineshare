import { Link } from "react-router";
import { StoreLink } from "./Stores.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container top">
        <div>
          <Link className="brand" to="/" aria-label="WineShare, accueil">
            <img src="/assets/svg/logo-white.svg" alt="" width="56" height="42" loading="lazy" />
            <span>WineShare</span>
          </Link>
          <p>Le réseau social des passionnés de vin. Pensé avec des sommeliers et des cavistes indépendants.</p>
        </div>
        <div>
          <h2 className="footer-title">Le site</h2>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/etablissements">Établissements</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/#faq">Questions fréquentes</Link></li>
            <li><a href="/rss.xml">Flux RSS du blog</a></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-title">L'application</h2>
          <ul>
            <li><StoreLink store="appstore">App Store</StoreLink></li>
            <li><StoreLink store="googleplay">Google Play</StoreLink></li>
            <li><a href="/pre-inscription.html">Pré-inscription</a></li>
            <li><Link to="/etablissements">WineShare Pro</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-title">Aide</h2>
          <ul>
            <li><Link to="/contact">Contactez-nous</Link></li>
            <li><a href="/delete-account.html">Supprimer mon compte</a></li>
          </ul>
        </div>
      </div>
      <div className="container bottom">
        <span>© 2026 WineShare. L'abus d'alcool est dangereux pour la santé, à consommer avec modération.</span>
        <ul>
          <li><a href="/mention.html">Mentions légales</a></li>
          <li><a href="/confidentiality.html">Confidentialité</a></li>
          <li><a href="/cgvu.html">CGV</a></li>
        </ul>
      </div>
    </footer>
  );
}
