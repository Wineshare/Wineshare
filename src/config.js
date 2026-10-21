// ************************************************************
// WineShare — configuration du site
// Remplacez les liens des stores ici : ils sont appliqués
// automatiquement à tous les boutons du site.
// ************************************************************
export const config = {
  appName: "WineShare",
  siteUrl: "https://wineshare.fr",

  // Application grand public (amateurs)
  appstoreURL: "https://apps.apple.com/fr/app/",                        // TODO : lien App Store WineShare
  googleplayURL: "https://play.google.com/store/apps/details?id=",      // TODO : lien Google Play WineShare

  // Application professionnels (bars à vin, cavistes)
  appstoreProURL: "https://apps.apple.com/fr/app/",                     // TODO : lien App Store WineShare Pro
  googleplayProURL: "https://play.google.com/store/apps/details?id=",   // TODO : lien Google Play WineShare Pro

  // Formulaire de contact : fonction Vercel api/contact.js (envoi via Resend)
  contactEndpoint: "/api/contact",
};
