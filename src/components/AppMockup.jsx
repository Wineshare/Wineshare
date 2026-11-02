import { useId } from "react";

// Maquette de l'écran « Explorer » de l'app, dessinée en HTML/CSS (et non en image)
// pour rester parfaitement nette sur tous les écrans. Toutes les tailles sont en em :
// on agrandit ou réduit l'ensemble en changeant le font-size de .app-mockup.

function Star({ fill }) {
  const id = useId();
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <defs>
        <linearGradient id={id}>
          <stop offset={fill} stopColor="#E7A500" />
          <stop offset={fill} stopColor="#E3E1DA" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id})`} d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" />
    </svg>
  );
}

function Rating({ value }) {
  return (
    <span className="am-rating">
      {[0, 1, 2, 3, 4].map((i) => <Star key={i} fill={Math.max(0, Math.min(1, value - i))} />)}
      <span>{String(value).replace(".", ",")}/5</span>
    </span>
  );
}

function Tile({ img, name, rating, children }) {
  return (
    <div className="am-tile">
      <div className="am-tile-img">{img ? <img src={img} alt="" loading="eager" /> : children}</div>
      <p className="am-tile-name">{name}</p>
      <Rating value={rating} />
    </div>
  );
}

const icon = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

export default function AppMockup() {
  return (
    <div className="app-mockup" role="img" aria-label="L'application WineShare sur iPhone : écran Explorer avec les dernières dégustations et les établissements référencés à Paris">
      <div className="am-phone" aria-hidden="true">
        <div className="am-screen">
          <div className="am-status">
            <span>9:41</span>
            <span className="am-island" />
            <svg viewBox="0 0 54 12" className="am-status-icons">
              <rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor" />
              <rect x="5" y="6" width="3" height="6" rx="1" fill="currentColor" />
              <rect x="10" y="3.5" width="3" height="8.5" rx="1" fill="currentColor" />
              <rect x="15" y="1" width="3" height="11" rx="1" fill="currentColor" />
              <path d="M24 4.5a9 9 0 0 1 11 0M26.2 7a5.5 5.5 0 0 1 6.6 0" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <circle cx="29.5" cy="10" r="1.4" fill="currentColor" />
              <rect x="38.5" y="1.5" width="13" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.2" fill="none" opacity=".45" />
              <rect x="40" y="3" width="10" height="6" rx="1.5" fill="currentColor" />
              <rect x="52.3" y="4.5" width="1.4" height="3" rx=".7" fill="currentColor" opacity=".45" />
            </svg>
          </div>

          <p className="am-title">Explorer</p>

          <div className="am-search-row">
            <div className="am-search">
              <svg viewBox="0 0 24 24" {...icon}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></svg>
              <span>Caviste, bar à vin, Paris…</span>
            </div>
            <svg viewBox="0 0 24 24" className="am-filter" {...icon}>
              <path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" />
            </svg>
          </div>

          <div className="am-banner">
            <img src="/assets/img/app/banniere-cave.webp" alt="" />
            <span className="am-pill">Événement</span>
            <div className="am-banner-text">
              <strong>Nos promotions du moment<br />à Paris</strong>
              <small>4 événements · 8 promos ce week-end</small>
              <svg viewBox="0 0 24 24" {...icon} strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>

          <p className="am-section">Dernières dégustations</p>
          <div className="am-tiles">
            <Tile img="/assets/img/app/caves-taillevent.webp" name="Les Caves Taillevent" rating={4.5} />
            <Tile img="/assets/img/app/wine-gate.webp" name="The Wine Gate Paris" rating={4.6} />
          </div>

          <p className="am-section">Établissements référencés</p>
          <div className="am-tiles">
            <Tile img="/assets/img/app/rouge-ou-blanc.webp" name="Rouge ou Blanc" rating={5} />
            <Tile img="/assets/img/app/baron-rouge.webp" name="Le Baron Rouge" rating={4.7} />
          </div>

          <nav className="am-tabbar">
            <span><svg viewBox="0 0 24 24" {...icon}><path d="M4 11l8-6.5 8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z" /></svg>Accueil</span>
            <span><svg viewBox="0 0 24 24" {...icon}><rect x="4" y="5.5" width="16" height="14.5" rx="2" /><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4M8 13.5h.01M12 13.5h.01M16 13.5h.01M8 16.5h.01M12 16.5h.01" /></svg>Événements</span>
            <span className="is-active"><svg viewBox="0 0 24 24" {...icon} strokeWidth="2.4"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /><circle cx="11" cy="11" r="2" fill="currentColor" stroke="none" /></svg>Explorer</span>
            <span><svg viewBox="0 0 24 24" {...icon}><path d="M4 5.5h16v11H9l-5 3.5z" /><path d="M8 9.5h8M8 12.5h5" /></svg>Messages</span>
            <span><svg viewBox="0 0 24 24" {...icon}><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4" /></svg>Blog</span>
          </nav>
          <span className="am-home" />
        </div>
      </div>

      <div className="am-card am-card--badge" aria-hidden="true">
        <span className="am-card-ico am-card-ico--gold"><img src="/assets/svg/icon-medal-star.svg" alt="" /></span>
        <span><strong>Badge débloqué</strong><small>Explorateur · niveau 3</small></span>
      </div>
      <div className="am-card am-card--place" aria-hidden="true">
        <span className="am-card-ico am-card-ico--green"><img src="/assets/svg/icon-glass.svg" alt="" /></span>
        <span><strong>Rouge ou Blanc</strong><Rating value={5} /></span>
      </div>
    </div>
  );
}
