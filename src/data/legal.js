// Textes juridiques du site : CGU, CGV et mentions légales.
// CGU et CGV : texte rédigé par le cabinet (Me Anne Desriaux, Me Baptiste Bellet).
// Mentions légales : informations éditeur reprises des CGU, hébergeur Vercel.
//
// Format d'une section : { id, title, blocks }
//   "texte"            → paragraphe
//   ["a", "b"]         → liste à puces
//   { h: "titre" }     → sous-titre
//   { p: "texte", strong: true } → paragraphe mis en avant

export const LEGAL_UPDATED = "21 octobre 2026";

export const COMPANY = {
  name: "WineShare",
  form: "société par actions simplifiée unipersonnelle (SASU)",
  capital: "1 000 euros",
  rcs: "RCS Paris 104 161 088",
  address: "76 rue de Gergovie, 75014 Paris",
  president: "Romain Mortaigne",
  email: "contact@wineshare.fr",
};

const EMAIL = COMPANY.email;
const HEALTH = "L'abus d'alcool est dangereux pour la santé. À consommer avec modération.";

// ---------------------------------------------------------------- CGU
export const cgu = {
  path: "/cgu",
  eyebrow: "Informations légales",
  title: "Conditions générales d'utilisation",
  short: "CGU",
  description: "Conditions générales d'utilisation de l'application WineShare et du site wineshare.fr, applicables à tout utilisateur non professionnel.",
  intro: "Applicables à tout utilisateur non professionnel de l'application WineShare.",
  sections: [
    {
      id: "objet", title: "Article 1 : Objet et champ d'application", blocks: [
        "1.1. Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») régissent l'accès et l'utilisation de l'application mobile WineShare et, le cas échéant, du site internet associé (ci-après ensemble « la Plateforme »), édités par la société WineShare, société par actions simplifiée unipersonnelle (SASU) au capital de 1000 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 104 161 088, dont le siège social est situé 76 rue de Gergovie, 75014 Paris, représentée par Monsieur Romain MORTAIGNE en sa qualité de Président (ci-après « WineShare »).",
        "1.2. L'accès à la Plateforme est réservé aux utilisateurs non professionnels. Les professionnels (bars à vins, cavistes et tout établissement proposant la vente ou la consommation de boissons alcoolisées) sont soumis aux Conditions Générales de Vente.",
        "1.3. L'inscription à la Plateforme vaut acceptation pleine et entière des présentes CGU. Toute utilisation de la Plateforme sans acceptation préalable des CGU est interdite.",
      ],
    },
    {
      id: "acces", title: "Article 2 : Accès au service et conditions d'inscription", blocks: [
        "2.1. L'accès à la Plateforme est strictement réservé aux personnes physiques majeures, âgées de dix-huit (18) ans ou plus à la date de leur inscription. En s'inscrivant, l'utilisateur déclare sur l'honneur être majeur. WineShare se réserve le droit de suspendre ou de supprimer sans préavis tout compte pour lequel il serait établi que son titulaire est mineur.",
        "2.2. L'inscription implique la création d'un compte personnel via le formulaire dédié, comportant les champs obligatoires suivants : prénom, nom, date de naissance, adresse e-mail et mot de passe. L'utilisateur peut également s'inscrire via son compte Google ou Apple, auquel cas la gestion de ses identifiants relève de ces services tiers.",
        "2.3. L'utilisateur s'engage à fournir des informations exactes, complètes et à jour lors de son inscription et à les maintenir à jour depuis son espace « Mon compte ». Toute inscription réalisée sous une fausse identité ou avec des informations erronées pourra entraîner la suppression immédiate du compte.",
        `2.4. L'utilisateur est seul responsable de la confidentialité de ses identifiants de connexion. Toute utilisation de la Plateforme réalisée depuis son compte est présumée effectuée par lui. En cas de perte, vol ou utilisation frauduleuse de ses identifiants, l'utilisateur doit en informer WineShare sans délai à l'adresse ${EMAIL}.`,
      ],
    },
    {
      id: "service", title: "Article 3 : Description du service", blocks: [
        "3.1. WineShare est un réseau social dédié aux amateurs de vin, permettant notamment :",
        [
          "la publication de dégustations, photos et avis relatifs à des vins ou à des établissements ;",
          "la consultation d'une carte interactive géolocalisée recensant les bars à vins et cavistes référencés ;",
          "la recherche de vins par appellation, région ou cépage et l'identification des établissements où ils sont disponibles ;",
          "l'accès à un programme de valorisation de la découverte vitivinicole reposant sur un système de badges et de points VIP (ci-après « Programme de fidélité ») ;",
          "la participation à des événements organisés par les établissements partenaires ;",
          "l'échange de messages privés avec d'autres utilisateurs ou avec des établissements référencés.",
        ],
        "3.2. WineShare se réserve le droit de modifier, suspendre ou interrompre tout ou partie des fonctionnalités de la Plateforme, notamment pour des raisons techniques ou de mise à jour, sans que cela ne puisse ouvrir droit à indemnisation au profit de l'utilisateur.",
      ],
    },
    {
      id: "contenus", title: "Article 4 : Contenu généré par les utilisateurs, droits et obligations", blocks: [
        { h: "4.1 Nature du contenu et responsabilité de l'utilisateur" },
        "4.1.1. Tout contenu publié par l'utilisateur sur la Plateforme (publications, photos, avis, commentaires, messages ; ci-après « Contenu Utilisateur ») demeure sous sa seule responsabilité. L'utilisateur garantit à WineShare qu'il dispose de tous les droits nécessaires à la publication de ce contenu et que ce dernier ne porte atteinte à aucun droit de tiers.",
        "4.1.2. En publiant un Contenu Utilisateur, l'utilisateur concède à WineShare une licence non exclusive, mondiale, gratuite et pour la durée de protection des droits concernés, d'utiliser, reproduire, afficher et distribuer ce contenu aux seules fins de l'exploitation de la Plateforme.",
        { h: "4.2 Statut d'hébergeur de WineShare" },
        "4.2.1. Conformément à l'article 6-I-2 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN) et au Règlement (UE) 2022/2065 du Parlement européen et du Conseil du 19 octobre 2022 relatif à un marché unique des services numériques (Digital Services Act : DSA), WineShare agit en qualité d'hébergeur à l'égard des Contenus Utilisateurs qu'elle stocke sans en être l'auteur.",
        "4.2.2. À ce titre, WineShare ne peut voir sa responsabilité engagée au titre d'un Contenu Utilisateur qu'à la condition qu'elle en ait eu connaissance et qu'elle n'ait pas agi promptement pour le retirer ou en rendre l'accès impossible.",
        "4.2.3. En revanche, WineShare agit en qualité d'éditeur pour les contenus qu'elle produit directement, notamment les articles du blog WineShare, et en assume la pleine responsabilité.",
      ],
    },
    {
      id: "contenus-prohibes", title: "Article 5 : Contenus prohibés", blocks: [
        "5.1. Il est strictement interdit de publier sur la Plateforme tout contenu :",
        [
          "à caractère illicite, notamment les contenus incitant à la haine, à la discrimination ou à la violence à raison de l'origine, du sexe, de l'orientation sexuelle, de la religion, de la nationalité ou du handicap ;",
          "constitutif de harcèlement moral ou sexuel, d'intimidation ou de cyberharcèlement ;",
          "portant atteinte à la vie privée, à l'image ou à la réputation de tiers, notamment par la diffusion de données personnelles sans consentement ;",
          "contrefaisant des droits de propriété intellectuelle appartenant à des tiers ;",
          "à caractère commercial non autorisé, notamment toute publicité ou sollicitation commerciale non expressément permise par les présentes CGU ;",
          "faisant la promotion de la consommation d'alcool de manière incitative ou contraire aux dispositions de la loi n° 91-32 du 10 janvier 1991, dite loi Évin ;",
          "visant à détourner ou tromper d'autres utilisateurs, notamment par l'usurpation d'identité ou la diffusion d'informations mensongères ;",
          "destiné à nuire au fonctionnement de la Plateforme ou à en compromettre la sécurité.",
        ],
        "5.2. WineShare se réserve le droit de retirer sans préavis tout contenu méconnaissant les dispositions du présent article et de prendre les mesures prévues à l'article 8 des présentes.",
      ],
    },
    {
      id: "fidelite", title: "Article 6 : Programme de fidélité : points VIP, badges et parrainage", blocks: [
        { h: "6.1 Système de badges et de points VIP" },
        "6.1.1. WineShare propose un programme de valorisation de la découverte vitivinicole (ci-après « Programme de fidélité ») reposant sur l'attribution de badges et de points VIP en fonction de l'activité de l'utilisateur sur la Plateforme. Les critères d'attribution sont fondés sur la diversité des découvertes (régions, cépages, appellations explorées), la qualité des contributions à la communauté et l'ancienneté sur la Plateforme.",
        "6.1.2. Les points VIP peuvent être utilisés pour accéder à des événements partenaires et à des avantages exclusifs définis par WineShare. Ils ne constituent pas une monnaie, ne peuvent faire l'objet d'aucune conversion en numéraire et ne sont pas transférables.",
        "6.1.3. WineShare se réserve le droit de modifier à tout moment les règles d'attribution, la valeur ou les conditions d'utilisation des points VIP, sans que cela ne constitue un droit acquis pour l'utilisateur.",
        { h: "6.2 Parrainage" },
        "6.2.1. L'utilisateur peut parrainer de nouveaux membres via un code de parrainage personnel. Le parrainage ouvre droit à des points VIP au bénéfice du parrain, selon les modalités en vigueur sur la Plateforme à la date de l'inscription du filleul.",
        "6.2.2. Le système de parrainage est réservé aux utilisateurs majeurs dûment inscrits. Le code de parrainage ne peut être communiqué à des mineurs.",
      ],
    },
    {
      id: "geolocalisation", title: "Article 7 : Géolocalisation", blocks: [
        "7.1. Certaines fonctionnalités de la Plateforme (détection automatique de l'établissement lors d'une publication, affichage des établissements à proximité sur la carte interactive) nécessitent l'accès à la position géographique de l'utilisateur. Cet accès est conditionné à l'autorisation expresse de l'utilisateur, recueillie via la boîte de dialogue native de son système d'exploitation (iOS ou Android).",
        "7.2. L'utilisateur peut à tout moment retirer son consentement à la géolocalisation depuis les paramètres de son appareil ou depuis les paramètres de l'application, sans que cela ne bloque l'accès aux fonctionnalités ne requérant pas de localisation.",
        "7.3. Les données de géolocalisation collectées sont traitées conformément à la politique de confidentialité de WineShare, disponible depuis la section « Paramètres — Politique de confidentialité » de l'application.",
      ],
    },
    {
      id: "moderation", title: "Article 8 : Modération et signalement", blocks: [
        { h: "8.1 Mécanisme de signalement" },
        "8.1.1. Tout utilisateur peut signaler un contenu ou un comportement qu'il estime contraire aux présentes CGU ou aux lois et règlements en vigueur, via le formulaire de signalement accessible depuis chaque publication ou profil utilisateur. Le formulaire permet à l'utilisateur d'identifier la nature du problème (informations mensongères, usurpation d'identité, contenu abusif, contenu illicite, publicité non conforme) et d'en apporter une description.",
        "8.1.2. Tout signalement fait l'objet d'un accusé de réception automatique et est traité par l'équipe de modération de WineShare dans un délai de 48 heures pour les signalements prioritaires (contenus illicites, harcèlement) et de 7 jours pour les autres catégories. L'auteur du signalement est informé de la suite qui y est réservée.",
        "8.1.3. L'auteur du contenu signalé est informé de la décision prise et de ses motifs, conformément aux exigences du DSA. Il dispose d'un droit de réclamation interne dans les conditions prévues à l'article 8.3.",
        { h: "8.2 Sanctions" },
        "8.2.1. En cas de manquement aux présentes CGU, WineShare peut, selon la nature et la gravité des faits, prononcer l'une des mesures suivantes : avertissement, suppression du contenu concerné, suspension temporaire du compte, suppression définitive du compte.",
        "8.2.2. Les mesures les plus graves (suspension ou suppression de compte) sont précédées d'un avertissement, sauf en cas de manquement grave ou réitéré, notamment en cas de contenu illicite, de harcèlement ou d'usurpation d'identité.",
        { h: "8.3 Mécanisme de réclamation interne" },
        `8.3.1. Conformément au DSA, tout utilisateur dont le contenu a été retiré ou le compte suspendu ou supprimé peut introduire une réclamation interne auprès de WineShare dans un délai de 30 jours suivant la notification de la décision, à l'adresse ${EMAIL}. WineShare s'engage à traiter cette réclamation dans un délai raisonnable et à notifier sa décision motivée à l'utilisateur.`,
        "8.3.2. En cas de désaccord persistant, l'utilisateur peut recourir à tout mécanisme de règlement extrajudiciaire des litiges disponible dans son État membre de résidence ou saisir les juridictions compétentes.",
      ],
    },
    {
      id: "propriete-intellectuelle", title: "Article 9 : Propriété intellectuelle", blocks: [
        "9.1. WineShare est titulaire ou licenciée de l'ensemble des droits de propriété intellectuelle relatifs à la Plateforme, notamment le nom, la marque, le logo, le design, l'architecture et les fonctionnalités de l'application. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie de ces éléments, sans autorisation préalable écrite de WineShare, est strictement interdite.",
        "9.2. Les Contenus Utilisateurs demeurent la propriété de leurs auteurs. En publiant un Contenu Utilisateur, l'utilisateur concède à WineShare la licence décrite à l'article 4.1.2. Cette licence prend fin à la suppression définitive du contenu concerné ou du compte de l'utilisateur.",
      ],
    },
    {
      id: "responsabilite", title: "Article 10 : Responsabilité de WineShare", blocks: [
        "10.1. WineShare s'engage à mettre en œuvre tous les moyens raisonnables pour assurer la disponibilité et le bon fonctionnement de la Plateforme. Toutefois, WineShare ne saurait être tenue responsable des dommages résultant d'une interruption ou d'un dysfonctionnement de la Plateforme, d'une attaque informatique, ou de tout événement hors de son contrôle.",
        "10.2. Conformément à son statut d'hébergeur défini à l'article 4.2, WineShare n'est pas responsable du contenu publié par les utilisateurs, dès lors qu'elle n'en avait pas connaissance ou qu'elle a agi promptement pour le retirer à réception d'un signalement.",
        "10.3. WineShare n'est pas responsable des contenus et pratiques des établissements référencés sur la Plateforme, ni des échanges ayant lieu dans le cadre des messageries privées entre utilisateurs ou entre utilisateurs et professionnels.",
      ],
    },
    {
      id: "donnees-personnelles", title: "Article 11 : Protection des données personnelles", blocks: [
        "11.1. WineShare, en sa qualité de responsable de traitement, collecte et traite les données personnelles des utilisateurs conformément au Règlement (UE) 2016/679 du 27 avril 2016 (RGPD) et à la loi n° 78-17 du 6 janvier 1978 modifiée relative à l'informatique, aux fichiers et aux libertés.",
        "11.2. Les modalités de collecte, de traitement, de conservation et de transfert des données personnelles, ainsi que les droits dont disposent les utilisateurs (droit d'accès, de rectification, d'effacement, de portabilité, d'opposition et de limitation), sont détaillés dans la Politique de Confidentialité de WineShare, accessible depuis la section « Paramètres - Politique de confidentialité » de l'application et sur le site internet de WineShare.",
        `11.3. Pour toute question relative à la protection de leurs données ou pour exercer leurs droits, les utilisateurs peuvent contacter WineShare à l'adresse ${EMAIL}.`,
      ],
    },
    {
      id: "modification", title: "Article 12 : Modification des CGU", blocks: [
        "12.1. WineShare se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs sont informés de toute modification substantielle par notification dans l'application et/ou par courrier électronique à l'adresse enregistrée sur leur compte, au moins 15 jours avant l'entrée en vigueur des nouvelles CGU.",
        "12.2. La poursuite de l'utilisation de la Plateforme après l'entrée en vigueur des nouvelles CGU vaut acceptation de celles-ci. À défaut, l'utilisateur peut supprimer son compte dans les conditions prévues à l'article 13.",
      ],
    },
    {
      id: "resiliation", title: "Article 13 : Résiliation et suppression du compte", blocks: [
        "13.1. L'utilisateur peut à tout moment supprimer son compte depuis la section « Paramètres - Supprimer mon compte » de l'application ou depuis le site internet de WineShare. La suppression est définitive et entraîne l'effacement de l'ensemble des données associées au compte (publications, dégustations, réseau), sous réserve des exceptions légales visées à l'article 13.2.",
        "13.2. Certaines données peuvent être conservées au-delà de la suppression du compte pour satisfaire à des obligations légales ou réglementaires (notamment les données de facturation conservées pendant dix ans conformément aux dispositions du Code de commerce). Ces exceptions sont détaillées dans la Politique de Confidentialité.",
        "13.3. WineShare peut résilier l'accès à la Plateforme d'un utilisateur en cas de manquement grave ou réitéré aux présentes CGU, dans les conditions prévues à l'article 8. En cas de résiliation pour faute, les points VIP et les avantages acquis sont définitivement perdus, sans droit à remboursement ni indemnisation.",
      ],
    },
    {
      id: "loi-applicable", title: "Article 14 : Loi applicable et juridiction", blocks: [
        "14.1. Les présentes CGU sont soumises au droit français.",
        `14.2. En cas de litige relatif à l'interprétation ou à l'exécution des présentes CGU, l'utilisateur est invité à contacter WineShare en priorité à l'adresse ${EMAIL} en vue d'une résolution amiable. À défaut de résolution amiable dans un délai de 30 jours, les tribunaux français compétents seront saisis.`,
        "14.3. Conformément aux dispositions de l'article 14 du Règlement (UE) n° 524/2013, les consommateurs résidant dans l'Union européenne disposent du droit de recourir à la plateforme de règlement en ligne des litiges mise à disposition par la Commission européenne, accessible à l'adresse : https://ec.europa.eu/consumers/odr.",
      ],
    },
  ],
};

// ---------------------------------------------------------------- CGV
export const cgv = {
  path: "/cgv",
  eyebrow: "Informations légales",
  title: "Conditions générales de vente",
  short: "CGV",
  description: "Conditions générales de vente de l'abonnement WineShare Premium, réservé aux professionnels (bars à vins, cavistes, restaurants).",
  intro: "Applicables aux professionnels souscrivant à l'abonnement WineShare Premium.",
  sections: [
    {
      id: "objet", title: "Article 1 : Objet et champ d'application", blocks: [
        "1.1. Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent les relations contractuelles entre WineShare SASU, éditrice de la Plateforme WineShare (ci-après « WineShare »), et tout professionnel (personne morale ou physique exerçant une activité commerciale dans le secteur de la vente ou de la dégustation de boissons alcoolisées, notamment les bars à vins et cavistes) ayant souscrit à l'abonnement WineShare Premium (ci-après « le Professionnel »).",
        "1.2. En souscrivant à l'abonnement Premium, le Professionnel accepte sans réserve les présentes CGV, ainsi que la Charte de Contenu annexée (Annexe 1). En cas de contradiction entre les présentes CGV et la Charte de Contenu, les CGV prévalent.",
        "1.3. Les présentes CGV sont distinctes et indépendantes des Conditions Générales d'Utilisation applicables aux utilisateurs non professionnels.",
      ],
    },
    {
      id: "definitions", title: "Article 2 : Définitions", blocks: [
        [
          "« Abonnement Premium » : offre payante proposée par WineShare aux professionnels, donnant accès aux fonctionnalités décrites à l'article 4.",
          "« Contenu Professionnel » : tout contenu publié par le Professionnel sur la Plateforme dans le cadre de son Abonnement Premium, notamment les descriptions d'établissement, la carte des vins, les promotions et les événements.",
          "« Charte de Contenu » : document annexé aux présentes CGV définissant les règles applicables aux Contenus Professionnels, notamment au regard de la loi Évin.",
          "« KYB » (Know Your Business) : procédure de vérification d'identité et de conformité imposée au Professionnel préalablement à l'activation de l'Abonnement Premium.",
          "« Points de contact DSA » : coordinateur des services numériques désigné par WineShare conformément au Règlement (UE) 2022/2065.",
        ],
      ],
    },
    {
      id: "acces", title: "Article 3 : Conditions d'accès à l'abonnement Premium et procédure KYB", blocks: [
        "3.1. L'abonnement Premium est réservé aux professionnels légalement établis exerçant une activité de vente ou de dégustation de boissons alcoolisées (bars à vins, cavistes, restaurants proposant une carte des vins). L'accès est conditionné à la réussite de la procédure KYB.",
        "3.2. La procédure KYB implique la communication par le Professionnel des documents suivants : extrait Kbis de moins de trois mois (ou équivalent pour les professionnels établis hors de France), justificatif d'identité du représentant légal, et IBAN du compte bancaire professionnel destiné à recevoir les éventuels versements de WineShare.",
        "3.3. WineShare se réserve le droit de refuser ou de suspendre l'accès à l'Abonnement Premium si les informations communiquées dans le cadre du KYB sont incomplètes, inexactes ou non conformes aux exigences légales, sans que cela ne puisse ouvrir droit à indemnisation au profit du Professionnel.",
      ],
    },
    {
      id: "offre", title: "Article 4 : Description de l'offre Premium et fonctionnalités incluses", blocks: [
        "4.1. L'Abonnement Premium donne accès aux fonctionnalités suivantes :",
        [
          "Mise en avant différenciée de l'établissement dans les résultats de recherche et dans la section Explorer (label « Partenaire »), identifiée comme sponsorisée conformément aux exigences légales ;",
          "Publication de promotions commerciales sans limitation de nombre (sous réserve du respect de la Charte de Contenu, Annexe 1) ;",
          "Création d'événements sans limitation de nombre ;",
          "Carte des vins illimitée ;",
          "Accès au tableau de bord statistiques (clics, vues du profil, vues événements et promotions, interactions) ;",
          "Messagerie privée avec les utilisateurs ;",
          "Réponse aux avis clients ;",
          "Modifications du profil illimitées.",
        ],
        "4.2. WineShare se réserve le droit de modifier les fonctionnalités incluses dans l'Abonnement Premium avec un préavis de 30 jours. Si les modifications envisagées sont substantiellement défavorables au Professionnel, celui-ci dispose d'un droit de résiliation sans frais dans les conditions prévues à l'article 7.",
      ],
    },
    {
      id: "tarifs", title: "Article 5 : Tarifs et modalités de paiement", blocks: [
        { p: "5.1. L'Abonnement Premium est proposé au tarif de quarante-neuf euros (49,00 €) hors taxes par mois, soit cinquante-huit euros et quatre-vingt centimes (58,80 €) TTC (TVA au taux en vigueur), sans engagement de durée.", strong: true },
        "5.2. Le paiement est effectué mensuellement par prélèvement automatique sur le compte bancaire dont l'IBAN a été communiqué lors de la procédure KYB, ou via le compte store de l'application (App Store ou Google Play) selon le mode de souscription choisi. Pour les souscriptions via le compte store, les conditions de paiement et de renouvellement de la plateforme concernée s'appliquent.",
        "5.3. En cas d'échec du prélèvement, WineShare en informe le Professionnel par courrier électronique. En l'absence de régularisation dans un délai de 7 jours, WineShare se réserve le droit de suspendre l'accès aux fonctionnalités Premium sans préjudice de ses droits à recouvrement.",
        "5.4. Les tarifs sont exprimés en euros. WineShare se réserve le droit de modifier ses tarifs avec un préavis de 30 jours par courrier électronique. La poursuite de l'utilisation de la Plateforme après l'entrée en vigueur des nouveaux tarifs vaut acceptation de ceux-ci.",
      ],
    },
    {
      id: "duree", title: "Article 6 : Durée et renouvellement de l'abonnement", blocks: [
        "6.1. L'Abonnement Premium est souscrit pour une durée d'un mois, renouvelable tacitement par période d'un mois, sauf résiliation par l'une des parties dans les conditions prévues à l'article 7.",
        "6.2. L'abonnement prend effet à la date de validation de la procédure KYB et du premier paiement. La date de renouvellement mensuel correspond au jour de la souscription initiale (ou au dernier jour du mois si ce jour n'existe pas dans le mois de renouvellement).",
      ],
    },
    {
      id: "resiliation", title: "Article 7 : Résiliation", blocks: [
        "7.1. Le Professionnel peut résilier son Abonnement Premium à tout moment, sans pénalité, depuis son espace « Paramètres — Abonnement & Paiement ». La résiliation prend effet à l'issue de la période mensuelle en cours, sans remboursement au prorata de la période non consommée.",
        "7.2. WineShare peut résilier l'Abonnement Premium de plein droit et sans préavis en cas de : (i) manquement grave du Professionnel à la Charte de Contenu, notamment en cas de diffusion de publicité illicite au regard de la loi Évin ; (ii) défaut de paiement non régularisé dans le délai prévu à l'article 5.3 ; (iii) fourniture de fausses informations lors de la procédure KYB ; (iv) atteinte grave à l'image ou au fonctionnement de la Plateforme.",
        "7.3. En cas de résiliation à l'initiative de WineShare pour l'un des motifs visés à l'article 7.2, les Contenus Professionnels publiés sur la Plateforme sont supprimés sans délai. Aucun remboursement n'est dû au Professionnel pour la période en cours.",
      ],
    },
    {
      id: "obligations", title: "Article 8 : Obligations du professionnel et Charte de Contenu", blocks: [
        { h: "8.1 Obligations générales" },
        "8.1.1. Le Professionnel s'engage à utiliser les fonctionnalités de la Plateforme dans le respect des lois et règlements applicables, des présentes CGV et de la Charte de Contenu (Annexe 1). Il est seul responsable des Contenus Professionnels qu'il publie sur la Plateforme.",
        "8.1.2. Le Professionnel s'engage à maintenir à jour les informations relatives à son établissement (horaires, adresse, carte des vins) et à s'assurer de leur exactitude.",
        { h: "8.2 Conformité à la loi Évin : obligations spécifiques" },
        "8.2.1. Le Professionnel reconnaît que tout Contenu Professionnel diffusé sur la Plateforme constitue de la publicité au sens de la loi n° 91-32 du 10 janvier 1991, dite loi Évin, et est soumis aux dispositions des articles L. 3323-2 et suivants du Code de la santé publique.",
        `8.2.2. À ce titre, tout Contenu Professionnel (description d'établissement, promotion, événement, notification push) doit impérativement être assorti du message sanitaire réglementaire suivant, en caractères lisibles : « ${HEALTH} »`,
        "8.2.3. Il est expressément interdit au Professionnel de publier tout Contenu Professionnel contenant des formulations incitatives à la consommation d'alcool en volume (notamment les formulations de type « 2 pour 1 », « consommez plus pour gagner plus », ou toute formulation valorisant la quantité consommée), des termes présentant le lieu de consommation comme incontournable ou exceptionnel dans une dimension incitant à la fréquentation en lien avec l'alcool, ou des visuels mettant en scène des actes de consommation d'alcool de manière valorisante.",
        "8.2.4. Le Professionnel garantit à WineShare qu'il n'utilisera pas les fonctionnalités de notification push à des fins non conformes à la loi Évin. Les notifications push sont soumises aux gabarits pré-validés par WineShare, incluant le message sanitaire obligatoire. L'envoi de notifications en texte libre est interdit.",
        "8.2.5. En cas de non-respect des présentes dispositions, WineShare se réserve le droit de supprimer sans délai le contenu non conforme et d'en informer le Professionnel, sans préjudice de la résiliation prévue à l'article 7.2. Le Professionnel demeure seul responsable des sanctions qui pourraient lui être infligées par les autorités compétentes en cas d'infraction à la loi Évin.",
      ],
    },
    {
      id: "responsabilite", title: "Article 9 : Responsabilité de WineShare", blocks: [
        "9.1. WineShare met à la disposition du Professionnel un outil de diffusion de Contenus Professionnels. Elle n'est pas responsable du contenu des publications effectuées par le Professionnel, qui en assume l'entière responsabilité éditoriale.",
        "9.2. La mise en avant différenciée de l'établissement dans les résultats de recherche et dans la section Explorer est réalisée dans le cadre de l'Abonnement Premium et est clairement identifiée comme sponsorisée auprès des utilisateurs. WineShare ne garantit pas un niveau de visibilité spécifique.",
        "9.3. WineShare ne saurait être tenue responsable des dommages résultant d'une indisponibilité temporaire de la Plateforme, d'une interruption du service pour maintenance, ou de tout événement hors de son contrôle.",
      ],
    },
    {
      id: "donnees-personnelles", title: "Article 10 : Protection des données personnelles", blocks: [
        "10.1. Dans le cadre de la relation contractuelle, WineShare collecte et traite les données personnelles du représentant légal du Professionnel (nom, prénom, coordonnées, IBAN) aux fins d'exécution du contrat et de conformité aux obligations légales (KYB).",
        "10.2. Le Professionnel, en utilisant les fonctionnalités de messagerie et en accédant aux avis clients sur la Plateforme, est susceptible d'accéder à des données personnelles d'utilisateurs. Il s'engage à traiter ces données dans le respect du RGPD et à ne pas les utiliser à des fins autres que celles autorisées dans le cadre des présentes CGV.",
        "10.3. Un contrat de sous-traitance de données (Data Processing Agreement) sera conclu entre WineShare et le Professionnel dans le cas où ce dernier traiterait des données personnelles d'utilisateurs pour le compte de WineShare. Les modalités de traitement des données sont détaillées dans la Politique de Confidentialité de WineShare.",
      ],
    },
    {
      id: "modification", title: "Article 11 : Modification des CGV", blocks: [
        "11.1. WineShare se réserve le droit de modifier les présentes CGV. Toute modification est notifiée au Professionnel par courrier électronique au moins 30 jours avant son entrée en vigueur.",
        `11.2. En cas de modification substantielle défavorable, le Professionnel peut résilier son Abonnement Premium sans frais dans un délai de 15 jours suivant la notification, par envoi d'un courrier électronique à ${EMAIL}. À défaut de résiliation dans ce délai, les nouvelles CGV sont réputées acceptées.`,
      ],
    },
    {
      id: "loi-applicable", title: "Article 12 : Loi applicable et juridiction", blocks: [
        "12.1. Les présentes CGV sont soumises au droit français.",
        "12.2. En cas de litige relatif à leur interprétation ou à leur exécution, les parties s'engagent à rechercher une solution amiable dans un délai de 30 jours suivant la notification du litige par l'une des parties. À défaut de résolution amiable, le litige sera soumis à la compétence exclusive du Tribunal de Commerce de Paris.",
      ],
    },
    {
      id: "charte", title: "Annexe 1 : Charte de contenu professionnel", blocks: [
        "La présente Charte de Contenu constitue un document contractuel annexé aux CGV. Elle définit de manière opérationnelle les règles applicables aux Contenus Professionnels publiés sur la Plateforme WineShare, en cohérence avec les obligations découlant de la loi Évin et du DSA.",
        { h: "1. Descriptions d'établissement" },
        [
          "Autorisé : informations factuelles et objectives (type d'établissement, localisation, horaires, ambiance générale neutre, types de vins proposés par région ou cépage, équipements).",
          "Interdit : termes laudatifs non objectifs valorisant l'expérience de consommation (« le meilleur bar à vins de Paris », « sélection d'exception », « incontournable »).",
          "Message sanitaire : obligatoire en bas de toute fiche établissement.",
        ],
        { h: "2. Promotions" },
        [
          "Autorisé : description objective de la réduction (montant ou pourcentage), produits concernés, durée de validité et conditions d'utilisation.",
          "Interdit : formulations incitatives (« Profitez de », « Ne ratez pas », « Offre exceptionnelle ») ; format « X acheté = Y offert » présentant un avantage lié au volume d'achat ; formulations créant une urgence à consommer (« Ce soir uniquement », « Dernière chance »).",
          "Message sanitaire : obligatoire sur chaque fiche de promotion, en caractères lisibles.",
        ],
        { h: "3. Événements" },
        [
          "Autorisé : titre factuel, date, horaires, nombre de places, prix, description objective des activités prévues (dégustation de X vins de la région Y, atelier animé par un sommelier, accord mets et vins).",
          "Interdit : termes valorisant l'expérience de consommation (« soirée d'exception », « soirée exclusive »), visuels mettant en scène des actes de consommation (verres portés à la bouche, trinquement).",
          "Message sanitaire : obligatoire sur chaque fiche événement.",
        ],
        { h: "4. Notifications push" },
        [
          "Les notifications push sont soumises aux gabarits pré-validés par WineShare. Aucun texte libre n'est autorisé.",
          "Les gabarits incluent le message sanitaire obligatoire et des formulations neutres et informatives.",
        ],
        { h: "5. Visuels" },
        [
          "Les photos et visuels publiés dans le cadre du profil, des événements ou des promotions ne doivent pas mettre en scène des actes de consommation d'alcool de manière valorisante (verres portés à la bouche, trinquement, ivresse).",
          "Les visuels d'ambiance générale, de cave, de produit ou de décor sont admis.",
        ],
      ],
    },
  ],
};

// ---------------------------------------------------------------- Mentions légales
export const mentions = {
  path: "/mentions-legales",
  eyebrow: "Informations légales",
  title: "Mentions légales",
  short: "Mentions légales",
  description: "Mentions légales du site wineshare.fr : éditeur, directeur de la publication, hébergeur, propriété intellectuelle et données personnelles.",
  intro: "Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), voici les informations relatives au site wineshare.fr et à l'application WineShare.",
  sections: [
    {
      id: "editeur", title: "Éditeur du site", blocks: [
        `Le site wineshare.fr et l'application WineShare sont édités par la société ${COMPANY.name}, ${COMPANY.form} au capital de ${COMPANY.capital}, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 104 161 088.`,
        [
          `Siège social : ${COMPANY.address}`,
          `Adresse e-mail : ${EMAIL}`,
          "Formulaire de contact : wineshare.fr/contact",
        ],
      ],
    },
    {
      id: "directeur-publication", title: "Directeur de la publication", blocks: [
        `Monsieur ${COMPANY.president}, en sa qualité de Président de la société ${COMPANY.name}.`,
      ],
    },
    {
      id: "hebergeur", title: "Hébergeur", blocks: [
        "Le site est hébergé par la société Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com).",
      ],
    },
    {
      id: "statut", title: "Statut d'éditeur et d'hébergeur de contenus", blocks: [
        "WineShare agit en qualité d'éditeur pour les contenus qu'elle produit directement, notamment les articles du blog WineShare, et en assume la pleine responsabilité.",
        "WineShare agit en qualité d'hébergeur, au sens de l'article 6-I-2 de la LCEN et du Règlement (UE) 2022/2065 (Digital Services Act), à l'égard des contenus publiés par les utilisateurs dans l'application (publications, photos, avis, commentaires, messages). Les règles applicables à ces contenus, le mécanisme de signalement et la procédure de réclamation sont décrits dans les conditions générales d'utilisation.",
        `Point de contact unique (article 11 du DSA), pour les autorités et les utilisateurs : ${COMPANY.president}, ${EMAIL}.`,
      ],
    },
    {
      id: "propriete-intellectuelle", title: "Propriété intellectuelle", blocks: [
        "WineShare est titulaire ou licenciée de l'ensemble des droits de propriété intellectuelle relatifs au site et à l'application, notamment le nom, la marque, le logo, le design, l'architecture, les textes et les fonctionnalités. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie de ces éléments, sans autorisation préalable écrite de WineShare, est strictement interdite.",
        "Les contenus publiés par les utilisateurs demeurent la propriété de leurs auteurs, dans les conditions prévues par les conditions générales d'utilisation.",
        "Certaines photographies du site proviennent de la banque d'images Unsplash et sont utilisées conformément à la licence Unsplash.",
      ],
    },
    {
      id: "donnees-personnelles", title: "Données personnelles", blocks: [
        "WineShare, en sa qualité de responsable de traitement, traite les données personnelles conformément au Règlement (UE) 2016/679 du 27 avril 2016 (RGPD) et à la loi n° 78-17 du 6 janvier 1978 modifiée relative à l'informatique, aux fichiers et aux libertés.",
        "Les informations envoyées via le formulaire de contact (nom, adresse e-mail, profil, message) sont utilisées uniquement pour répondre à votre demande.",
        `Vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité, d'opposition et de limitation du traitement de vos données. Pour exercer ces droits, écrivez à ${EMAIL}. Vous pouvez également introduire une réclamation auprès de la Commission nationale de l'informatique et des libertés (CNIL), www.cnil.fr.`,
      ],
    },
    {
      id: "conditions", title: "Conditions générales", blocks: [
        "L'utilisation de l'application WineShare est régie par les conditions générales d'utilisation (CGU). L'abonnement WineShare Premium destiné aux professionnels est régi par les conditions générales de vente (CGV).",
      ],
    },
    {
      id: "sante", title: "Message sanitaire", blocks: [
        { p: HEALTH, strong: true },
        "L'accès à l'application WineShare est réservé aux personnes majeures.",
      ],
    },
  ],
};

export const LEGAL_PAGES = [mentions, cgu, cgv];
