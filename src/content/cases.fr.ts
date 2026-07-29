import type { CaseStudy } from "./types";

/**
 * Études de cas — version française.
 *
 * Règles de confidentialité appliquées :
 *  - aucune source scrapée n'est nommée
 *  - le client de la place de marché d'art n'est pas nommé
 *  - les captures affichent des valeurs fictives
 */

export const casesFr: CaseStudy[] = [
  /* ------------------------------------------------------------------ */
  /*  1. Executive Control Center — Maxime                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "executive-control-center",
    client: "Maxime · groupe industriel français",
    sector: "Industrie · écrans LED · 4,5 M€ de CA",
    duration: "Conception et développement complets",
    title: "Le dirigeant pilotait 4,5 M€ depuis des fichiers Excel.",
    kicker: "Tableau de bord de direction",
    problem:
      "Un fabricant français d'écrans géants LED réalisant 4,5 M€ de chiffre d'affaires pilotait son activité depuis plusieurs classeurs Excel mis à jour à la main. Le CRM commercial, les comptes bancaires, les factures clients et fournisseurs, les opérations terrain et les garanties vivaient chacun dans leur coin. Pour répondre à une question simple — combien reste-t-il à encaisser ce mois-ci — il fallait ouvrir quatre fichiers et faire confiance à la dernière mise à jour manuelle.",
    architecture: [
      { id: "crm", label: "eWay CRM", sub: "pipeline commercial" },
      { id: "bank", label: "API Qonto", sub: "lecture seule, soldes + transactions" },
      { id: "invoices", label: "Facturation", sub: "clients et fournisseurs" },
      { id: "db", label: "Supabase", sub: "8 tables, RLS, tâche quotidienne" },
      { id: "ai", label: "Assistants IA", sub: "commercial + SAV, sorties validées" },
    ],
    archNote:
      "Les trois intégrations alimentent une base unique, rafraîchie par une tâche planifiée quotidienne. Le cockpit lit cette base, jamais les API directement : une panne côté fournisseur n'empêche pas le dirigeant de consulter ses chiffres, elle se signale simplement comme une donnée non rafraîchie. Les clés d'API restent exclusivement côté serveur.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript strict",
      "Recharts",
      "Supabase",
      "PostgreSQL",
      "Row Level Security",
      "API Anthropic",
      "eWay CRM",
      "API Qonto",
      "Vercel",
    ],
    results: [
      { value: "6", label: "modules : cockpit, commercial, finance, immobilier, opérations, IA" },
      { value: "8", label: "tables PostgreSQL protégées par Row Level Security" },
      { value: "233", label: "éléments audités en contraste, WCAG AA atteint" },
      { value: "0", label: "dépendance npm ajoutée sur les six dernières fonctionnalités" },
    ],
    quote: {
      text: "Osama a su nous guider, nous conseiller et répondre à nos besoins avec une grande efficacité. Merci encore !",
      author: "Maxime",
      role: "Upwork · 5,0",
      source: "Upwork",
      url: "https://www.upwork.com/freelancers/~01e9d7e582881baac8",
    },
    featured: true,
    images: [
      { src: "/projets/executive-control-center-1.webp", alt: "Cockpit exécutif — vue d'ensemble du chiffre d'affaires et du financement, montants fictifs" },
      { src: "/projets/executive-control-center-2.webp", alt: "Module de pilotage du centre de contrôle exécutif" },
      { src: "/projets/executive-control-center-3.webp", alt: "Assistant IA et centre d'alertes du centre de contrôle exécutif" },
    ],
    detail: [
      {
        title: "Une contrainte de sécurité tenue à la lettre",
        body: "L'informaticien du client exigeait un accès bancaire strictement en lecture : consultation des soldes et des transactions, aucune fonctionnalité de virement, jamais. Le périmètre a été tenu sans négociation. Les clés d'API vivent uniquement côté serveur, le navigateur ne les voit jamais, et aucune route d'écriture vers la banque n'existe dans le code — l'absence de la fonctionnalité est la garantie, pas une case décochée quelque part.",
      },
      {
        title: "Zéro dépendance ajoutée",
        body: "Trois demandes auraient pu se régler par un npm install. Chacune a été résolue autrement, et chaque fois pour une raison qui tient techniquement.",
        bullets: [
          "Export PDF — feuille @media print et moteur d'impression natif du navigateur, au lieu d'une librairie de génération. Rendu vectoriel, texte sélectionnable, zéro dépendance à maintenir.",
          "Animations — CSS natif au lieu de Framer Motion. 120 ko économisés sur le bundle, et prefers-reduced-motion géré correctement.",
          "Composants de dashboard — design system maison au lieu de Tremor, qui exige React 18 alors que le projet tourne sur React 19.",
        ],
      },
      {
        title: "Un mode clair structurellement incassable",
        body: "Le codebase utilise des styles en ligne. Plutôt que d'ajouter des milliers de classes conditionnelles, toutes les couleurs passent par des variables CSS déclinées par thème. Le fond et le texte viennent toujours de la même palette : le bug du texte clair sur fond clair devient structurellement impossible, il n'est pas seulement évité au cas par cas. Un audit de contraste automatisé sur 233 éléments a confirmé le résultat, avec une échelle de gris ajustée pour atteindre WCAG AA.",
      },
      {
        title: "Des erreurs qui se voient",
        body: "Le code initial avalait silencieusement les erreurs de base de données. En cas de panne réseau, le dirigeant voyait 0 € affiché sans le moindre avertissement — et pouvait prendre une décision sur des chiffres faux. C'est le genre de défaut qui ne se remarque qu'une fois qu'il a coûté cher. Remplacé par un état d'erreur explicite, distinct d'une valeur nulle, avec possibilité de relancer la récupération.",
      },
      {
        title: "Deux assistants IA sous contrainte métier",
        body: "Un générateur de réponses commerciales applique une séquence de réflexion en cinq étapes avant de rédiger, ce qui rend son raisonnement inspectable plutôt que magique. Un assistant SAV est contraint par des règles de vocabulaire strictes, notamment l'interdiction de reconnaître une responsabilité avant analyse technique — une phrase mal choisie dans un échange après-vente peut coûter une garantie. Les sorties sont en JSON structuré et validées avant affichage.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  2. Place de marché d'art — anonymisé                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "marketplace-art",
    client: "Place de marché d'enchères d'art",
    sector: "E-commerce · marché de l'art",
    duration: "mai – juin 2026",
    title: "50 000 œuvres agrégées, nettoyées et publiées pour 5,51 $.",
    kicker: "Pipeline data & LLM",
    problem:
      "Une place de marché spécialisée dans les ventes aux enchères d'art voulait agréger le catalogue de plusieurs sources externes. Chacune avait sa structure, ses doublons, ses champs manquants, et des protections anti-robot différentes. Un nettoyage manuel à cette échelle était impensable — et un nettoyage par IA au tarif catalogue aurait coûté plus cher que la valeur ajoutée.",
    architecture: [
      { id: "collect", label: "Collecte", sub: "sources protégées, reprise sur incident" },
      { id: "clean", label: "GPT-4o-mini", sub: "nettoyage idempotent" },
      { id: "img", label: "Pipeline images", sub: "8 formats par œuvre" },
      { id: "seo", label: "GPT-4o vision", sub: "alt texts + biographies" },
      { id: "store", label: "EC2 + RDS", sub: "stockage et monitoring" },
    ],
    archNote:
      "Le poste de coût réel n'était pas la collecte mais l'inférence. En regroupant les fiches par lots, en découpant les prompts et en basculant sur un modèle plus léger là où la qualité le permettait, le nettoyage de 64 602 fiches est revenu à 5,51 $ au total. Un marqueur d'idempotence garantit qu'une ligne déjà traitée n'est jamais repayée, même si le pipeline est relancé — c'est ce détail qui transforme un coût qui dérape en un coût borné.",
    stack: [
      "Python",
      "AWS EC2",
      "AWS RDS MySQL",
      "GPT-4o-mini",
      "GPT-4o vision",
      "ScrapFly",
      "Playwright",
      "BeautifulSoup",
      "JSON-LD",
    ],
    results: [
      { value: "50 000", label: "œuvres agrégées et publiées" },
      { value: "64 602", label: "fiches nettoyées par IA pour 5,51 $ au total" },
      { value: "253 000", label: "textes alternatifs générés, environ 3 000 par nuit" },
      { value: "11 301", label: "biographies réécrites en SEO sur cinq langues" },
    ],
    featured: true,
    detail: [
      {
        title: "Collecte sur des sources protégées",
        body: "Les sources n'étaient pas ouvertes : systèmes d'abonnement, protections anti-robot de niveau entreprise, et pour certaines un cycle de vie de vente à suivre dans le temps plutôt qu'un simple instantané. Chaque collecteur gère ses propres points de reprise : une exécution interrompue redémarre au dernier lot validé, elle ne repart jamais de zéro.",
        bullets: [
          "Suivi du cycle de vie des ventes, d'un état en attente jusqu'à l'état finalisé",
          "Points de reprise à chaque lot, monitoring et journalisation des échecs",
          "Aucune source n'est nommée publiquement, par respect du cadre contractuel",
        ],
      },
      {
        title: "Le nettoyage par LLM, rendu économiquement viable",
        body: "Nettoyer les titres, classer les médiums, analyser les dimensions et les signatures : le travail est simple unitairement et ingérable à 64 602 exemplaires. Le pipeline découpe les fiches en lots, applique des prompts spécialisés par tâche, et bascule sur le modèle le plus léger capable de tenir la qualité attendue. Résultat : 5,51 $ de tokens au total, avec un marqueur d'idempotence qui empêche toute reconsommation de budget.",
      },
      {
        title: "Un pipeline d'images pensé pour le SEO",
        body: "Migration du stockage vers un hébergement mutualisé, puis génération de huit formats par œuvre en AVIF et WebP — 400 px, 800 px, 1 200 px, vignette et original — avec un nommage dynamique orienté référencement du type artiste-titre_800w.avif. Un bug de préfixe de taxonomie a été corrigé au passage : le préfixe n'est appliqué que sur la bonne catégorie de nomenclature, pas sur l'ensemble du catalogue.",
      },
      {
        title: "Enrichissement éditorial à grande échelle",
        body: "253 000 textes alternatifs générés par un modèle de vision, à raison d'environ 3 000 par nuit sur un créneau planifié à 2 h UTC pour ne jamais concurrencer le trafic réel. 11 301 biographies d'artistes réécrites pour le référencement en cinq langues : français, anglais, allemand, italien, espagnol. Structures JSON-LD Person et Artist, HTML5 sémantique, accordéons sur mobile.",
      },
      {
        title: "Une livraison qu'on peut reprendre sans moi",
        body: "Tout est parti sur GitHub avec un README, un runbook d'exploitation et le schéma de base de données. Six bugs ont été identifiés et corrigés avant le push final. C'est la partie du travail qu'on ne voit pas dans une démo mais qui décide si le client est autonome ou dépendant.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  3. LVI Control Center                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "lvi-control-center",
    client: "Maxime · groupe industriel français",
    sector: "Industrie · écrans LED",
    duration: "4 jours · mai 2026",
    title: "Un pipeline commercial qui tourne sans personne dedans.",
    kicker: "Prospection commerciale autonome",
    problem:
      "L'équipe commerciale passait plusieurs dizaines d'heures par semaine sur LinkedIn : identifier les prospects à la main, les qualifier, copier-coller dans le CRM, rédiger chaque message un par un. Le volume plafonnait à ce qu'une personne traite dans une journée, et la qualité de la personnalisation baissait à mesure que le volume montait — exactement l'inverse de ce qu'il faut.",
    architecture: [
      { id: "collect", label: "Apify", sub: "extraction ciblée des prospects" },
      { id: "qualify", label: "GPT-4o", sub: "qualification + icebreaker" },
      { id: "campaign", label: "Lemlist", sub: "déclenchement des campagnes" },
      { id: "orchestrate", label: "n8n", sub: "orchestration de bout en bout" },
      { id: "state", label: "Supabase", sub: "état central, sync 30 s" },
    ],
    archNote:
      "Chaque étage est indépendant et rejouable. Si un maillon tombe, l'état reste cohérent dans la base et le traitement reprend au dernier point validé, sans doublon d'envoi côté campagne. Le control center affiche l'état réel du pipeline plutôt qu'un résumé calculé après coup : le commercial voit ce qui se passe, pas ce qui s'est passé.",
    stack: ["n8n", "Apify", "OpenAI GPT-4o", "Lemlist", "Supabase", "Next.js"],
    results: [
      { value: "4 jours", label: "du brief à la mise en production" },
      { value: "100 %", label: "du cycle sans intervention humaine" },
      { value: "30 s", label: "de latence de synchronisation du dashboard" },
      { value: "3", label: "automations en production : veille, campagnes, salons" },
    ],
    featured: true,
    images: [
      { src: "/projets/lvi-control-center-1.webp", alt: "Vue d'ensemble du control center — indicateurs de prospection, valeurs fictives" },
      { src: "/projets/lvi-control-center-2.webp", alt: "Module opportunités salons — leads qualifiés et rejetés par l'IA" },
      { src: "/projets/lvi-control-center-3.webp", alt: "Module campagnes — base de contacts et brouillons générés par l'IA" },
      { src: "/projets/lvi-control-center-4.webp", alt: "Veille concurrentielle LinkedIn, identifiants masqués" },
      { src: "/projets/lvi-control-center-5.webp", alt: "Workflow n8n de veille LinkedIn" },
      { src: "/projets/lvi-control-center-7.webp", alt: "Workflow n8n de détection des leads sur salons professionnels" },
    ],
    detail: [
      {
        title: "Trois automations, un seul poste de pilotage",
        body: "Le control center regroupe une veille continue sur LinkedIn, un déclencheur de campagnes, et une détection d'opportunités sur les salons professionnels du secteur. Les trois écrivent dans la même base, donc le dirigeant n'a qu'un seul endroit à regarder — c'est la condition pour qu'un outil de ce type soit réellement utilisé.",
      },
      {
        title: "L'icebreaker généré n'est pas un mot-clé inséré",
        body: "Le modèle reçoit le profil du prospect et le contexte du produit, puis rédige une accroche qui s'appuie sur un élément vérifiable du profil. La différence avec un publipostage classique se voit au taux de réponse, et surtout au fait qu'un prospect qui répond ne se sent pas traité comme une ligne de tableur.",
      },
      {
        title: "Suivi de la consommation d'API",
        body: "Le dashboard affiche en temps réel les soldes de crédits des services tiers utilisés par le pipeline. Un pipeline autonome qui s'arrête faute de crédits est un pipeline qui échoue silencieusement : la jauge est là pour que ça ne puisse pas arriver sans prévenir.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  4. Bastide Confort Médical                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "bastide",
    client: "Matys Nsir · Bastide Confort Médical",
    sector: "Matériel médical",
    duration: "février 2026 · en production",
    title: "Des SMS d'anniversaire qui partent sans que personne y pense.",
    kicker: "Automatisation n8n",
    problem:
      "Les anniversaires clients étaient suivis à la main depuis des exports CSV irréguliers. Numéros saisis dans des formats hétérogènes, doublons entre fichiers, dates au mauvais format pour le CRM, et un envoi manuel qui sautait dès qu'une semaine était chargée. Le geste commercial existait sur le papier et disparaissait en pratique.",
    architecture: [
      { id: "csv", label: "Import CSV", sub: "extraction et validation" },
      { id: "norm", label: "Normalisation", sub: "format E.164 + dates CRM" },
      { id: "dedup", label: "Dédoublonnage", sub: "algorithmes JavaScript" },
      { id: "cron", label: "Cron 8 h", sub: "exécution quotidienne autonome" },
      { id: "log", label: "Google Sheets", sub: "journal temps réel" },
    ],
    archNote:
      "Le vrai travail n'était pas l'envoi mais la donnée en amont : normaliser des numéros saisis dans six formats différents, reformater les dates de naissance aux normes du CRM, dédoublonner sans jamais perdre un client, et rendre chaque exécution auditable. Deux workflows coexistent : un import manuel pour les nouveaux clients, et un cron quotidien totalement autonome.",
    stack: ["n8n", "JavaScript", "Google Sheets API", "API SMS", "CRM Universal", "Cron"],
    results: [
      { value: "0", label: "envoi manuel restant dans le processus" },
      { value: "8 h", label: "déclenchement quotidien, sans supervision" },
      { value: "2", label: "workflows : import manuel et exécution autonome" },
      { value: "5,0", label: "avis sur Upwork et sur Malt" },
    ],
    quote: {
      text: "Oussama est un freelance réactif, professionnel et très agréable dans la collaboration. Il a su réaliser les deux workflows demandés avec sérieux et efficacité, tout en prenant le temps d'expliquer clairement les étapes et le fonctionnement.",
      author: "Matys",
      role: "Malt · 5,0 · 01/03/2026",
      source: "Malt",
      url: "https://www.malt.fr/profile/oussamaabassi1",
    },
    featured: true,
    images: [
      { src: "/projets/bastide-1.webp", alt: "Workflow n8n d'envoi automatisé de SMS" },
      { src: "/projets/bastide-2.webp", alt: "Étape de nettoyage et de normalisation des numéros de téléphone" },
      { src: "/projets/bastide-3.webp", alt: "Journalisation des envois dans Google Sheets" },
      { src: "/projets/bastide-4.webp", alt: "Détail du dédoublonnage et du filtrage des destinataires du jour" },
    ],
    detail: [
      {
        title: "La donnée avant l'automatisation",
        body: "Un numéro de téléphone français peut s'écrire d'au moins six façons dans un export client. Tant que ce n'est pas résolu, aucune automatisation d'envoi ne tient : elle échoue silencieusement sur une partie de la base et personne ne s'en aperçoit. La normalisation au format international E.164 est la première étape du workflow, pas une option.",
      },
      {
        title: "Un journal qu'on peut relire",
        body: "Chaque exécution écrit en temps réel dans une feuille Google : qui a reçu, à quelle heure, avec quel statut, et pourquoi un destinataire a été écarté. Le client peut vérifier lui-même, sans me solliciter. C'est la différence entre un système qu'on subit et un système qu'on contrôle.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Compactes                                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "talentscout",
    client: "TalentScout AI",
    sector: "SaaS · RH · IA vocale",
    duration: "Produit complet",
    title: "Un ATS complet avec agents vocaux de préqualification.",
    kicker: "SaaS · recrutement",
    problem:
      "La préqualification téléphonique consomme l'essentiel du temps d'un recruteur, et ce temps est passé majoritairement sur des candidatures qui ne passeront pas le premier filtre.",
    architecture: [
      { id: "ats", label: "ATS", sub: "pipeline candidats" },
      { id: "whisper", label: "Whisper", sub: "transcription des entretiens" },
      { id: "gpt", label: "GPT-4 Turbo", sub: "scoring et synthèse" },
      { id: "db", label: "Neon + Prisma", sub: "données structurées" },
    ],
    archNote:
      "L'agent vocal ne remplace pas le recruteur : il absorbe le premier filtre et rend une synthèse structurée. Le recruteur reprend la main sur les profils qui le méritent, avec la transcription complète et le raisonnement du score sous les yeux.",
    stack: ["Next.js", "OpenAI GPT-4 Turbo", "Whisper", "Neon", "Prisma"],
    results: [
      { value: "10×", label: "vitesse de préqualification" },
      { value: "−80 %", label: "de temps de qualification" },
      { value: "24", label: "pages de documentation technique" },
    ],
    featured: false,
    images: [
      { src: "/projets/talentscout-1.webp", alt: "Interface de TalentScout AI" },
    ],
  },
  {
    slug: "moon-mobility",
    client: "Mouna Baatout · Moon Mobility",
    sector: "VTC · transport",
    duration: "Moteur métier",
    title: "Le moteur de tarification d'une flotte VTC.",
    kicker: "Python · logique métier",
    problem:
      "La tarification combinait des paliers kilométriques, des majorations horaires, des forfaits aéroport et des règles d'attente et d'annulation. Chaque cas particulier était appliqué à la main, avec les écarts que cela implique d'une course à l'autre.",
    architecture: [
      { id: "tiers", label: "Paliers km", sub: "grille progressive" },
      { id: "surge", label: "Majoration", sub: "selon créneau horaire" },
      { id: "flat", label: "Forfaits", sub: "trajets aéroport" },
      { id: "rules", label: "Règles", sub: "attente et annulation" },
    ],
    archNote:
      "Toute la logique tarifaire est isolée dans un moteur testable indépendamment de l'application. Modifier une grille ne demande pas de toucher au reste du système, et une erreur de tarif se reproduit dans un test plutôt qu'en production.",
    stack: ["Python", "Tests unitaires", "API REST"],
    results: [
      { value: "1", label: "source de vérité tarifaire" },
      { value: "5,0", label: "avis Malt de la cliente" },
    ],
    quote: {
      text: "Il comprend rapidement les enjeux business et techniques, pose les bonnes questions et propose des solutions pertinentes et structurées. Il ne se contente pas d'exécuter : il réfléchit, optimise et apporte une réelle valeur ajoutée au projet.",
      author: "Mouna Baatout",
      role: "Malt · 5,0 · 27/02/2026",
      source: "Malt",
      url: "https://www.malt.fr/profile/oussamaabassi1",
    },
    featured: false,
    images: [{ src: "/projets/moon-mobility-1.webp", alt: "Moteur de tarification Moon Mobility" }],
  },
  {
    slug: "bc-enterprise",
    client: "B&C Enterprise",
    sector: "Industrie · Belgique",
    duration: "Mission data",
    title: "270 sites industriels enrichis, au site près.",
    kicker: "Enrichissement de données",
    problem:
      "Les bases d'entreprises classiques renvoient l'adresse du siège social. Pour une prospection industrielle, c'est inutilisable : ce qui compte est le site de production, pas le bureau administratif — on ne vend pas un équipement lourd à un service juridique.",
    architecture: [
      { id: "src", label: "Sources", sub: "registres et web" },
      { id: "geo", label: "Google Maps API", sub: "géolocalisation précise" },
      { id: "match", label: "Rapprochement", sub: "site ≠ siège social" },
    ],
    archNote:
      "Un script Python couplé à l'API Google Maps établit la correspondance entre entités juridiques et implantations physiques réelles, avec une granularité au site.",
    stack: ["Python", "Google Maps API", "PostgreSQL"],
    results: [
      { value: "270", label: "sites industriels cartographiés" },
      { value: "site", label: "granularité obtenue, pas siège social" },
    ],
    featured: false,
  },
  {
    slug: "flowaudit",
    client: "FlowAudit AI",
    sector: "SaaS · IA générative",
    duration: "Produit",
    title: "Un processus métier converti en workflow n8n en 30 secondes.",
    kicker: "Génération de workflows",
    problem:
      "Décrire un processus est facile, le transformer en automatisation fonctionnelle ne l'est pas. La marche entre l'idée et le premier workflow qui tourne décourage la plupart des équipes.",
    architecture: [
      { id: "input", label: "Description", sub: "processus en langage naturel" },
      { id: "gpt", label: "GPT-4o", sub: "génération du schéma" },
      { id: "json", label: "JSON n8n", sub: "export importable tel quel" },
    ],
    archNote:
      "La sortie n'est pas un conseil mais un fichier : un JSON n8n valide, importable directement dans l'interface. C'est la différence entre un assistant et un outil.",
    stack: ["Next.js", "OpenAI GPT-4o", "Stripe", "Prisma", "Neon"],
    results: [
      { value: "182 h", label: "économisées par an en moyenne" },
      { value: "30 s", label: "de la description au workflow" },
      { value: "JSON", label: "export n8n direct" },
    ],
    featured: false,
  },
  {
    slug: "leadscout",
    client: "LeadScout AI",
    sector: "Agent IA · génération de leads",
    duration: "Produit",
    title: "Un agent qui cherche, qualifie et rédige tout seul.",
    kicker: "Agent autonome de prospection",
    problem:
      "La recherche de prospects et la rédaction des approches sont deux tâches distinctes, toutes deux chronophages, et rarement bien faites en même temps par la même personne.",
    architecture: [
      { id: "search", label: "Tavily", sub: "recherche web" },
      { id: "crawl", label: "Firecrawl", sub: "extraction de contenu" },
      { id: "agent", label: "Agent GPT-4o", sub: "qualification et rédaction" },
      { id: "out", label: "n8n + Sheets", sub: "livraison" },
    ],
    archNote:
      "L'agent conduit son propre cycle de recherche : il décide quoi chercher, lit les pages qu'il trouve, et n'écrit qu'une fois qu'il a de quoi personnaliser réellement.",
    stack: ["Next.js", "Vercel AI SDK", "OpenAI GPT-4o", "Tavily API", "Firecrawl"],
    results: [
      { value: "100 %", label: "de recherche autonome" },
      { value: "auto", label: "emails personnalisés" },
    ],
    featured: false,
  },
  {
    slug: "darkosclaw",
    client: "DarkosClaw",
    sector: "Open source · agent IA",
    duration: "Projet libre",
    title: "Un OS d'agents IA, 25 outils, coût d'exploitation nul.",
    kicker: "Open source",
    problem:
      "Les environnements d'agents IA supposent presque tous un abonnement à une API payante. Rien n'empêche techniquement de construire l'équivalent sur des modèles ouverts.",
    architecture: [
      { id: "core", label: "Cœur", sub: "orchestration d'outils" },
      { id: "tools", label: "25 outils", sub: "recherche, fichiers, code" },
      { id: "llm", label: "Groq + OpenRouter", sub: "modèles interchangeables" },
    ],
    archNote:
      "L'abstraction du fournisseur de modèle est faite dès le départ : changer de LLM est une variable d'environnement, pas une réécriture.",
    stack: ["Next.js", "Vercel AI SDK", "Groq LLaMA 3.3", "OpenRouter", "Tavily API"],
    results: [
      { value: "25", label: "outils intégrés" },
      { value: "0 €", label: "de coût d'exploitation" },
    ],
    featured: false,
  },
];
