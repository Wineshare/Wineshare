document.documentElement.classList.remove("no-js");

// ---------- Liens des stores (config.js) ----------
const storeLinks = {
  "appstore": config.appstoreURL,
  "googleplay": config.googleplayURL,
  "appstore-pro": config.appstoreProURL,
  "googleplay-pro": config.googleplayProURL,
};
document.querySelectorAll("[data-store]").forEach((a) => {
  const url = storeLinks[a.dataset.store];
  if (url) a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
});

// ---------- Header ----------
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const toggle = document.querySelector(".nav-toggle");
toggle.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  toggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav a").forEach((a) =>
  a.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// ---------- Apparition au scroll ----------
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("is-visible");
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Vidéo motion design ----------
const video = document.querySelector("#motion-video");
if (video) {
  const soundBtn = document.querySelector("#video-sound");
  const label = soundBtn.querySelector("span");
  const iconOn = soundBtn.querySelector(".ico-on");
  const iconOff = soundBtn.querySelector(".ico-off");

  // Lecture muette automatique quand la vidéo est visible, pause sinon
  new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }),
    { threshold: 0.35 }
  ).observe(video);

  soundBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    if (!video.muted) {
      video.currentTime = 0;
      video.play();
    }
    label.textContent = video.muted ? "Activer le son" : "Couper le son";
    iconOn.style.display = video.muted ? "none" : "";
    iconOff.style.display = video.muted ? "" : "none";
  });
}

// ---------- FAQ : un seul élément ouvert à la fois ----------
document.querySelectorAll(".faq").forEach((faq) => {
  faq.addEventListener("toggle", (e) => {
    if (!e.target.open) return;
    faq.querySelectorAll("details[open]").forEach((d) => { if (d !== e.target) d.open = false; });
  }, true);
});

// ---------- Filtres du blog ----------
const chips = document.querySelectorAll(".chip[data-filter]");
chips.forEach((chip) =>
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.setAttribute("aria-pressed", c === chip));
    const f = chip.dataset.filter;
    document.querySelectorAll(".post-card[data-cat]").forEach((card) => {
      card.hidden = f !== "all" && card.dataset.cat !== f;
    });
  })
);

// ---------- Formulaire de contact ----------
const form = document.querySelector("#contact-form");
if (form) {
  const status = document.querySelector("#form-status");
  const btn = form.querySelector("button[type=submit]");
  const params = new URLSearchParams(location.search);
  if (params.get("profil")) form.profile.value = params.get("profil");

  const show = (type, msg) => {
    status.className = "form-status " + type;
    status.textContent = msg;
    status.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.email || !data.message) {
      show("err", "Merci de renseigner votre nom, votre email et votre message.");
      return;
    }
    const token = window.grecaptcha ? grecaptcha.getResponse() : "";
    if (!token) {
      show("err", "Merci de valider le captcha avant d'envoyer.");
      return;
    }

    btn.disabled = true;
    try {
      const res = await fetch(config.googleCloudUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: `[${data.profile}] ${data.subject || "Message depuis le site"}`,
          message: data.message,
          token,
        }),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      show("ok", "Merci, votre message a bien été envoyé ! Nous revenons vers vous rapidement.");
    } catch (err) {
      console.error(err);
      show("err", "L'envoi a échoué, merci de réessayer dans un instant.");
    } finally {
      if (window.grecaptcha) grecaptcha.reset();
      btn.disabled = false;
    }
  });
}
