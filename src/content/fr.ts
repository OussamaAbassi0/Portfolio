import type { Dict } from "./types";

export const fr: Dict = {
  meta: {
    title: "Oussama Abassi — Je conçois et je construis les systèmes qui font tourner votre entreprise",
    description:
      "Freelance basé en UE. Pipelines de données, automatisation IA, dashboards, sites et applications — conçus de bout en bout, par une seule personne qui livre.",
  },

  nav: {
    work: "Travaux",
    services: "Services",
    process: "Process",
    about: "À propos",
    cta: "Démarrer",
  },

  hero: {
    badge: "Disponible pour de nouveaux projets",
    title: ["Je conçois et je construis", "les", "qui font tourner votre entreprise."],
    accent: "systèmes",
    sub: "Pipelines de données, automatisation IA, dashboards, sites et applications — de bout en bout, par une seule personne qui livre.",
    ctaPrimary: "Démarrer un projet",
    ctaSecondary: "Voir mon travail",
    proof: ["Top Rated Upwork", "100% Job Success", "Basé en UE"],
  },

  metrics: [
    { value: "64 602", label: "fiches nettoyées par IA pour 5,51 $" },
    { value: "253 000", label: "textes alternatifs générés" },
    { value: "4 jours", label: "du brief à un pipeline commercial en production" },
    { value: "270", label: "sites industriels enrichis, au site près" },
  ],

  services: {
    kicker: "Ce que je construis",
    title: "Huit domaines. Un seul interlocuteur.",
    sub: "Pas d'agence, pas de sous-traitance, pas de coordination à gérer. Vous parlez à la personne qui écrit le code.",
    items: [
      {
        key: "data",
        title: "Data & pipelines",
        line: "Scraping, nettoyage, déduplication, enrichissement, synchronisation. De la source brute à la donnée exploitable.",
        caseSlug: "marketplace-art",
        span: "hero",
      },
      {
        key: "ai",
        title: "Automatisation IA",
        line: "n8n, agents autonomes, LLM en production. Les tâches répétitives disparaissent du planning.",
        caseSlug: "bastide",
        span: "tall",
      },
      {
        key: "dashboards",
        title: "Dashboards & control centers",
        line: "Une interface pour piloter un système, pas pour l'admirer.",
        caseSlug: "executive-control-center",
        span: "unit",
      },
      {
        key: "web",
        title: "Développement web",
        line: "Next.js, TypeScript, du design au déploiement.",
        caseSlug: "flowaudit",
        span: "unit",
      },
      {
        key: "apps",
        title: "Applications mobile & desktop",
        line: "Multi-plateforme, connectées à vos systèmes existants.",
        caseSlug: "talentscout",
        span: "unit",
      },
      {
        key: "chatbots",
        title: "Chatbots & assistants IA",
        line: "Qualification, support, capture de leads. Celui de ce site en est un.",
        caseSlug: "darkosclaw",
        span: "unit",
      },
      {
        key: "ecommerce",
        title: "E-commerce",
        line: "Catalogues, paiement, synchronisation stock et back-office.",
        caseSlug: "marketplace-art",
        span: "unit",
      },
      {
        key: "design",
        title: "Design & identité",
        line: "Interfaces et identité visuelle cohérentes avec le produit.",
        caseSlug: "lvi-control-center",
        span: "unit",
      },
    ],
  },

  cases: {
    kicker: "Travaux sélectionnés",
    title: "Des clients réels. Des systèmes en production.",
    sub: "Pour chaque projet : le problème de départ, l'architecture retenue, la stack, et ce que ça a produit.",
    readMore: "Lire l'étude de cas",
    similar: "Un projet similaire ?",
  },

  process: {
    kicker: "Comment je travaille",
    title: "Cinq étapes. Aucune surprise.",
    sub: "Le même déroulé sur tous les projets, du script de 200 lignes à la plateforme complète.",
    steps: [
      {
        n: "01",
        title: "Signal / brief",
        body: "Vous décrivez le problème. Je pose les questions que personne ne pose — celles qui font découvrir que le vrai problème est ailleurs. Réponse sous 24 à 48 h.",
      },
      {
        n: "02",
        title: "Architecture",
        body: "Schéma du système, choix de stack, points de rupture identifiés. Avant d'écrire la première ligne de code. Vous validez sur un plan, pas sur une promesse.",
      },
      {
        n: "03",
        title: "Build",
        body: "Livraison par incréments visibles. Vous voyez le système tourner sur vos données bien avant qu'il soit fini. Pas d'effet tunnel.",
      },
      {
        n: "04",
        title: "Livraison",
        body: "Documentation, accès, passation. Vous êtes autonome. Le code vous appartient, il n'y a pas de dépendance cachée à moi.",
      },
      {
        n: "05",
        title: "Maintenance",
        body: "Optionnel. Monitoring, corrections, évolutions. Certains clients n'en ont jamais eu besoin — c'est le but.",
      },
    ],
  },

  stack: {
    kicker: "Stack technique",
    title: "Des outils de production. Pas des prototypes fragiles.",
    sub: "Les mêmes briques que celles utilisées par des entreprises qui traitent des millions d'événements par jour.",
    groups: [
      { label: "Automatisation", items: ["n8n", "Make", "Zapier", "Apify", "Playwright"] },
      { label: "IA & LLM", items: ["OpenAI", "Anthropic", "Groq", "Gemini", "Vercel AI SDK"] },
      { label: "Data", items: ["PostgreSQL", "Supabase", "Airtable", "AWS RDS", "Redis"] },
      { label: "Web & apps", items: ["Next.js", "TypeScript", "React", "Tailwind", "React Native"] },
      { label: "Infra", items: ["Vercel", "AWS EC2", "Docker", "GitHub Actions", "Cloudflare"] },
      { label: "Livraison", items: ["Resend", "Stripe", "Twilio", "Lemlist", "Google APIs"] },
    ],
  },

  about: {
    kicker: "À propos",
    title: "Une seule personne. C'est le point fort, pas la limite.",
    body: [
      "Je suis Oussama Abassi, ingénieur freelance basé à Paris, et je travaille partout en Europe : PME industrielles, plateformes grand public, indépendants, startups. La taille et le secteur changent, le point de départ est toujours le même — quelqu'un me montre un processus qui lui mange sa semaine, et je le transforme en système qui tourne tout seul.",
      "Travailler avec moi, c'est un interlocuteur unique, aucune couche de gestion de projet, et la personne qui conçoit l'architecture est celle qui écrit le code et celle qui répond à vos messages. Sur un projet de quatre jours comme sur un projet de trois mois.",
      "Ce qui m'intéresse, ce sont les systèmes qui ne cassent pas dès que j'arrête de les regarder.",
    ],
    cta: "Démarrer un projet",
  },

  reviews: {
    kicker: "Avis vérifiés",
    title: "Publics, vérifiables, tous en 5,0.",
    sub: "Chaque avis renvoie vers sa source publique sur Upwork ou Malt.",
    items: [
      {
        name: "Maxime",
        role: "Groupe industriel · Centre de pilotage & prospection commerciale",
        platform: "Upwork",
        url: "https://www.upwork.com/freelancers/~01e9d7e582881baac8",
        text: "Osama a su nous guider, nous conseiller et répondre à nos besoins avec une grande efficacité. Merci encore !",
      },
      {
        name: "Yassine Alomari",
        role: "Directeur général · Junto · Recommandation du 14/05/2026",
        platform: "Malt",
        url: "https://www.malt.fr/profile/oussamaabassi1",
        text: "J'ai fait appel à Oussama pour automatiser une partie de nos process internes. Il a livré rapidement, le résultat était propre et ça tourne sans problème depuis. Pas besoin de lui expliquer deux fois ce qu'on voulait, il comprend vite et propose des solutions concrètes. Je recommande.",
      },
      {
        name: "Matys Nsir",
        role: "Bastide Confort Médical · Automatisation n8n",
        platform: "Upwork",
        url: "https://www.upwork.com/freelancers/~01e9d7e582881baac8",
        text: "Oussama a réalisé un excellent travail sur mon projet d'automatisation. Il a été très réactif, professionnel et efficace du début à la fin. Il a rapidement compris le besoin, livré une solution fonctionnelle et est resté disponible pour les ajustements nécessaires. La communication a été fluide tout au long du projet. Je suis très satisfait de cette collaboration et je retravaillerais avec lui sans hésiter.",
      },
      {
        name: "Mouna Baatout",
        role: "Automation Engineer · Recommandation publique",
        platform: "Malt",
        url: "https://www.malt.fr/profile/oussamaabassi1",
        text: "J'ai eu la chance de travailler avec cet ingénieur et je ne peux que le recommander à 100 %. C'est une personne exceptionnelle — à l'écoute, engagée et extrêmement professionnelle. Il comprend rapidement les enjeux métier et techniques, pose les bonnes questions et propose des solutions pertinentes et structurées. Il ne se contente pas d'exécuter : il réfléchit, optimise et apporte une vraie valeur ajoutée. Un profil rare, techniquement pointu et orienté résultats.",
      },
      {
        name: "Sara Moujahid",
        role: "Project Manager · Zenko · Recommandation publique",
        platform: "Malt",
        url: "https://www.malt.fr/profile/oussamaabassi1",
        text: "J'ai eu l'opportunité de travailler avec Oussama sur des projets d'automatisation et je le recommande vivement. Il maîtrise parfaitement n8n et a su transformer des processus manuels complexes en workflows fluides et efficaces. Oussama n'est pas seulement technique — il a aussi une véritable vision business pour faire gagner du temps. Un expert fiable et très réactif.",
      },
    ],
    all: "Voir tous les avis Upwork",
  },

  faq: {
    kicker: "Questions fréquentes",
    title: "Les questions qu'on me pose avant de signer.",
    sub: "Les réponses honnêtes, y compris quand elles ne m'arrangent pas.",
    items: [
      {
        q: "Vous travaillez vraiment seul ?",
        a: "Oui. Un seul interlocuteur, pas de couche de gestion de projet, et la personne qui conçoit l'architecture est celle qui écrit le code et celle qui répond à vos messages. Sur les très gros projets je peux m'appuyer sur des partenaires de confiance, mais vous gardez un seul point de contact : moi.",
      },
      {
        q: "Combien de temps prend un projet ?",
        a: "Ça dépend entièrement du périmètre, et je refuse de donner un chiffre avant de l'avoir compris. Pour donner un ordre de grandeur : un pipeline commercial autonome a été livré en 4 jours, un projet de données à grande échelle a couru sur deux mois. Après notre premier échange, vous avez une estimation argumentée — pas un chiffre lancé au hasard.",
      },
      {
        q: "Comment se passe la facturation ?",
        a: "Au forfait sur périmètre défini, ou en régie sur les missions longues. Un acompte est demandé au démarrage. Le budget se discute une fois le besoin cadré : je préfère un devis juste après avoir compris le problème plutôt qu'une grille tarifaire qui ne correspond à personne.",
      },
      {
        q: "Que se passe-t-il si le système tombe après la livraison ?",
        a: "Vous recevez la documentation, le runbook d'exploitation et l'accès complet au code — vous êtes autonome, sans dépendance cachée à moi. Un contrat de maintenance est possible mais optionnel. Certains clients n'en ont jamais eu besoin, et c'est exactement le but que je vise en construisant.",
      },
      {
        q: "Mes données sont-elles en sécurité ?",
        a: "NDA signé sur demande, avant tout échange de détail. Les clés d'API restent côté serveur, jamais dans le navigateur. Sur un projet récent, l'informaticien du client exigeait un accès bancaire strictement en lecture : le périmètre a été tenu à la lettre, aucune route d'écriture n'existe dans le code.",
      },
      {
        q: "Vous reprenez un projet existant ou seulement du neuf ?",
        a: "Les deux. Une bonne partie de mes missions consiste à reprendre une infrastructure déjà en place, à en corriger les angles morts et à la rendre exploitable. Reprendre du code existant demande souvent plus de rigueur que de repartir de zéro.",
      },
    ],
    cta: "Une autre question ? Écrivez-moi.",
  },

  contact: {
    kicker: "Démarrer un projet",
    title: "Décrivez votre projet.",
    sub: "Je lis chaque message moi-même et je réponds sous 24 h. Pas de devis automatique, pas de formulaire qui part dans le vide.",
    fields: {
      name: "Nom",
      email: "Email",
      company: "Entreprise",
      type: "Type de projet",
      budget: "Enveloppe envisagée",
      message: "Votre besoin",
    },
    types: [
      { value: "automation", label: "Automatisation" },
      { value: "web", label: "Site web" },
      { value: "app", label: "Application" },
      { value: "data", label: "Data" },
      { value: "design", label: "Design" },
      { value: "other", label: "Autre" },
    ],
    budgets: [
      { value: "lt2k", label: "moins de 2 k€" },
      { value: "2-5k", label: "2 – 5 k€" },
      { value: "5-15k", label: "5 – 15 k€" },
      { value: "gt15k", label: "plus de 15 k€" },
      { value: "tbd", label: "à définir ensemble" },
    ],
    submit: "Envoyer",
    sending: "Envoi…",
    success: "Message reçu.",
    successBody:
      "Vous recevez un accusé de réception par email. Je vous réponds personnellement sous 24 h.",
    error:
      "L'envoi a échoué. Votre message a tout de même été enregistré — vous pouvez aussi m'écrire directement.",
    guarantees: ["Réponse sous 24 h", "NDA sur demande", "Basé en UE"],
    optional: "facultatif",
    required: "requis",
  },

  chat: {
    kicker: "Assistant · démo en direct",
    intro:
      "Ce chatbot est un exemple de ce que je construis. Il qualifie, il enregistre, il ne dort jamais. Posez-lui une question ou laissez-le vous guider.",
    start: "Lancer la conversation",
    placeholder: "Écrivez votre réponse…",
    send: "Envoyer",
    restart: "Recommencer",
    steps: {
      greeting:
        "Bonjour. Je suis l'assistant d'Oussama. Quelques questions rapides et il vous répond sous 24 h — ou posez-moi directement votre question.",
      name: "Pour commencer, comment vous appelez-vous ?",
      email: "Parfait. À quelle adresse email peut-il vous répondre ?",
      type: "De quel type de projet s'agit-il ?",
      budget: "Quelle enveloppe avez-vous en tête ? Une fourchette suffit.",
      need: "Dernière question : décrivez votre besoin en quelques lignes.",
      confirm:
        "C'est noté et transmis à Oussama. Vous recevez un accusé de réception par email, et il vous répond personnellement sous 24 h.",
    },
    invalidEmail: "Cette adresse ne semble pas valide. Pouvez-vous la vérifier ?",
    thinking: "réflexion…",
  },

  footer: {
    tagline:
      "Je conçois et je construis les systèmes qui font tourner votre entreprise. Pipelines de données, automatisation IA, dashboards, sites et applications.",
    nav: "Navigation",
    contact: "Contact",
    rights: "Tous droits réservés.",
    legal: "Mentions légales",
  },
};
