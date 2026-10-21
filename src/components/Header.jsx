import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
  }, [open]);

  // Ferme le menu mobile à chaque changement de page
  useEffect(() => setOpen(false), [pathname]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container">
        <Link className="brand" to="/" aria-label="WineShare, accueil">
          <img src="/assets/svg/logo-wineshare.svg" alt="" width="56" height="42" />
          <span>WineShare</span>
        </Link>
        <button className="nav-toggle" aria-label="Menu" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </button>
        <nav className="nav" id="nav" aria-label="Navigation principale">
          <NavLink to="/" end onClick={close}>Accueil</NavLink>
          <NavLink to="/etablissements" onClick={close}>Établissements</NavLink>
          <NavLink to="/blog" onClick={close}>Blog</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
          <Link className="btn btn--primary" to="/#telecharger" onClick={close}>Télécharger l'app</Link>
        </nav>
      </div>
    </header>
  );
}
