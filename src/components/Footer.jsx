import { Link } from "react-router";
import { StoreLink } from "./Stores.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container top">
        <div>
          <Link className="brand" to="/">
            <img src="/assets/svg/logo-white.svg" alt="" width="56" height="42" />
            <span>WineShare</span>
          </Link>
          <p>Le réseau social des passionnés de vin. Pensé avec des sommeliers et des cavistes indépendants.</p>
        </div>
        <div>
          <h4>Le site</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/etablissements">Établissements</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/#faq">Questions fréquentes</Link></li>
          </ul>
        </div>
        <div>
          <h4>L'application</h4>
          <ul>
            <li><StoreLink store="appstore">App Store</StoreLink></li>
            <li><StoreLink store="googleplay">Google Play</StoreLink></li>
            <li><a href="/pre-inscription.html">Pré-inscription</a></li>
            <li><Link to="/etablissements">WineShare Pro</Link></li>
          </ul>
        </div>
        <div>
          <h4>Aide</h4>
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
