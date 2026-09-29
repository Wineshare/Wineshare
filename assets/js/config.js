// ************************************************************
// WineShare — configuration du site
// Remplacez les liens des stores ici : ils sont appliqués
// automatiquement à tous les boutons du site.
// ************************************************************
const config = {
  appName: "WineShare",

  // Application grand public (amateurs)
  appstoreURL: "https://apps.apple.com/fr/app/",                        // TODO : lien App Store WineShare
  googleplayURL: "https://play.google.com/store/apps/details?id=",      // TODO : lien Google Play WineShare

  // Application professionnels (bars à vin, cavistes)
  appstoreProURL: "https://apps.apple.com/fr/app/",                     // TODO : lien App Store WineShare Pro
  googleplayProURL: "https://play.google.com/store/apps/details?id=",   // TODO : lien Google Play WineShare Pro

  // Formulaire de contact : même backend que le site actuel (Cloud Function)
  captcha_key: "6LccDaktAAAAAMwzB02Z31HxSoGSXZ9-36iWA5F_",
  googleCloudUrl: "/api/contact",
};
