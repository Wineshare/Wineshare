import { useEffect } from "react";
import { useLocation } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

// Remonte en haut de page (ou jusqu'à l'ancre #...) à chaque navigation
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);
}

// Apparition au scroll des éléments .reveal
function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
}

export default function Layout({ children }) {
  useScrollOnNavigate();
  useReveal();
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
