import type { CaseStudy } from "./types";

/* ------------------------------------------------------------------ */
/*  FR                                                                 */
/* ------------------------------------------------------------------ */

export const casesFr: CaseStudy[] = [
  {
    slug: "lvi-control-center",
    client: "Maxime · LED Visual Innovation",
    sector: "Signalétique LED B2B",
    duration: "4 jours",
    title: "Un pipeline commercial qui tourne sans personne.",
    kicker: "Prospection B2B · 100 % autonome",
    problem:
      "L'équipe commerciale identifiait ses prospects à la main sur LinkedIn, rédigeait chaque approche une par une, puis suivait le tout dans un tableur. Le volume plafonnait à ce qu'une personne peut traiter dans une journée, et la qualité de la personnalisation baissait à mesure que le volume montait.",
    architecture: [
      { id: "apify", label: "Apify", sub: "scraping LinkedIn ciblé" },
      { id: "gpt", label: "GPT-4o", sub: "qualification + icebreaker" },
      { id: "lemlist", label: "Lemlist", sub: "déclenchement des campagnes" },
      { id: "supabase", label: "Supabase", sub: "état central, sync 30 s" },
    ],
    archNote:
      "Chaque étage est indépendant et rejouable : si un maillon tombe, l'état reste cohérent dans Supabase et la reprise se fait au dernier point validé. Le control center affiche l'état réel du pipeline, rafraîchi toutes les 30 secondes.",
    stack: ["Apify", "OpenAI GPT-4o", "Lemlist", "Supabase", "n8n", "Next.js"],
    results: [
      { value: "4 jours", label: "du brief à la production" },
      { value: "100 %", label: "du cycle sans intervention" },
      { value: "30 s", label: "latence de synchronisation" },
    ],
    quote: {
      text: "Il comprend rapidement les enjeux métier et techniques, pose les bonnes questions et propose des solutions pertinentes et structurées.",
      author: "Recommandation publique",
      role: "Malt · 5,0",
      source: "Malt",
      url: "https://www.malt.fr/profile/oussamaabassi1",
    },
    featured: true,
  },
  {
    slug: "africart",
    client: "Jean · AfricArt",
    sector: "Marché de l'art · enchères",
    duration: "Projet long",
    title: "50 000 œuvres agrégées depuis quatre maisons de vente.",
    kicker: "Pipeline data multi-sources",
    problem:
      "Les données d'enchères vivaient éclatées sur Drouot, Interencheres, Invaluable et LiveAuctioneers, chacune avec sa structure, ses doublons et ses champs manquants. Aucune vue unifiée n'existait, et un nettoyage manuel à cette échelle était hors de question — comme un nettoyage par IA au prix catalogue.",
    architecture: [
      { id: "scrape", label: "Scrapers", sub: "4 sources, checkpoints" },
      { id: "clean", label: "Nettoyage", sub: "dédup + classification" },
      { id: "llm", label: "GPT-4o-mini", sub: "normalisation par lots" },
      { id: "rds", label: "AWS EC2 + RDS", sub: "stockage + monitoring" },
      { id: "wp", label: "WordPress", sub: "sync via API REST" },
    ],
    archNote:
      "Le poste de coût réel n'était pas le scraping mais l'inférence. En regroupant les fiches par lots, en découpant les prompts et en basculant sur GPT-4o-mini là où la qualité le permettait, le nettoyage de 64 602 fiches est revenu à 5,51 $ au total. Les checkpoints permettent de reprendre n'importe quelle exécution sans repartir de zéro.",
    stack: ["Python", "AWS EC2", "AWS RDS", "GPT-4o-mini", "WordPress REST API", "PostgreSQL"],
    results: [
      { value: "50 000+", label: "œuvres agrégées" },
      { value: "64 602", label: "fiches nettoyées pour 5,51 $" },
      { value: "253 000", label: "textes alternatifs générés" },
    ],
    featured: true,
  },
  {
    slug: "bastide",
    client: "Matys Nsir · Bastide Confort Médical",
    sector: "Matériel médical",
    duration: "Livré et en production",
    title: "Des SMS d'anniversaire qui partent sans que personne y pense.",
    kicker: "Automatisation n8n · données patients",
    problem:
      "Les anniversaires clients étaient suivis à la main depuis des exports CSV irréguliers : numéros à des formats hétérogènes, doublons entre fichiers, et un envoi manuel qui sautait dès qu'une semaine était chargée.",
    architecture: [
      { id: "csv", label: "Import CSV", sub: "nettoyage + validation" },
      { id: "e164", label: "Normalisation", sub: "format E.164" },
      { id: "dedup", label: "Dédoublonnage", sub: "règles JS" },
      { id: "cron", label: "Cron 8 h", sub: "déclenchement quotidien" },
      { id: "sheets", label: "Google Sheets", sub: "journal temps réel" },
    ],
    archNote:
      "Le vrai travail n'était pas l'envoi mais la donnée en amont : normaliser des numéros saisis dans six formats différents, dédoublonner sans perdre de client, et rendre chaque exécution auditable. Le journal Google Sheets permet de vérifier en un coup d'œil ce qui est parti, à qui, et pourquoi un envoi a été écarté.",
    stack: ["n8n", "JavaScript", "Google Sheets API", "SMS gateway", "Cron"],
    results: [
      { value: "0", label: "envoi manuel restant" },
      { value: "8 h", label: "déclenchement quotidien automatique" },
      { value: "5,0", label: "avis Upwork et Malt" },
    ],
    quote: {
      text: "Il a rapidement compris le besoin, livré une solution fonctionnelle et est resté disponible pour les ajustements nécessaires. La communication a été fluide tout au long du projet.",
      author: "Matys Nsir",
      role: "Upwork · 5,0",
      source: "Upwork",
      url: "https://www.upwork.com/freelancers/~01e9d7e582881baac8",
    },
    featured: true,
  },
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
      { id: "gpt", label: "GPT-4 Turbo", sub: "scoring + synthèse" },
      { id: "db", label: "Neon + Prisma", sub: "données structurées" },
    ],
    archNote:
      "L'agent vocal ne remplace pas le recruteur : il absorbe le premier filtre et rend une synthèse structurée. Le recruteur reprend la main sur les profils qui le méritent, avec la transcription complète et le raisonnement du score sous les yeux.",
    stack: ["Next.js", "OpenAI GPT-4 Turbo", "Whisper", "Neon", "Prisma"],
    results: [
      { value: "10×", label: "vitesse de préqualification" },
      { value: "−80 %", label: "temps de qualification" },
      { value: "24", label: "pages de documentation technique" },
    ],
    featured: true,
  },

  /* ---- compactes ---- */
  {
    slug: "moon-mobility",
    client: "Mouna Baatout · Moon Mobility",
    sector: "VTC · transport",
    duration: "Moteur métier",
    title: "Le moteur de tarification d'une flotte VTC.",
    kicker: "Python · logique métier",
    problem:
      "La tarification combinait des paliers kilométriques, des majorations horaires, des forfaits aéroport et des règles d'attente et d'annulation. Chaque cas particulier était appliqué à la main, avec les écarts que ça implique.",
    architecture: [
      { id: "tiers", label: "Paliers km", sub: "grille progressive" },
      { id: "surge", label: "Surge", sub: "majoration horaire" },
      { id: "flat", label: "Forfaits", sub: "trajets aéroport" },
      { id: "rules", label: "Règles", sub: "attente + annulation" },
    ],
    archNote:
      "Toute la logique tarifaire est isolée dans un moteur testable indépendamment de l'application. Modifier une grille ne demande pas de toucher au reste du système.",
    stack: ["Python", "Tests unitaires", "API REST"],
    results: [
      { value: "1", label: "source de vérité tarifaire" },
      { value: "5,0", label: "recommandation Malt" },
    ],
    featured: false,
  },
  {
    slug: "bc-enterprise",
    client: "B&C Enterprise",
    sector: "Industrie · Belgique",
    duration: "Mission data",
    title: "270 sites industriels enrichis, au site près.",
    kicker: "Enrichissement B2B",
    problem:
      "Les bases d'entreprises classiques renvoient l'adresse du siège social. Pour une prospection industrielle, c'est inutilisable : ce qui compte est le site de production, pas le bureau administratif.",
    architecture: [
      { id: "src", label: "Sources", sub: "registres + web" },
      { id: "geo", label: "Google Maps API", sub: "géolocalisation précise" },
      { id: "match", label: "Matching", sub: "site ≠ siège" },
    ],
    archNote:
      "Un script Python couplé à l'API Google Maps établit la correspondance entre entités juridiques et implantations physiques réelles, avec une granularité au site.",
    stack: ["Python", "Google Maps API", "PostgreSQL"],
    results: [
      { value: "270", label: "sites industriels cartographiés" },
      { value: "site", label: "granularité, pas siège social" },
    ],
    featured: false,
  },
  {
    slug: "flowaudit",
    client: "FlowAudit AI",
    sector: "SaaS · IA générative",
    duration: "Produit",
    title: "Un processus métier converti en workflow n8n en 30 secondes.",
    kicker: "SaaS · génération de workflows",
    problem:
      "Décrire un processus est facile, le transformer en automatisation fonctionnelle ne l'est pas. La marche entre l'idée et le premier workflow qui tourne décourage la plupart des équipes.",
    architecture: [
      { id: "input", label: "Description", sub: "processus en langage naturel" },
      { id: "gpt", label: "GPT-4o", sub: "génération du schéma" },
      { id: "json", label: "JSON n8n", sub: "export direct importable" },
    ],
    archNote:
      "La sortie n'est pas un conseil mais un fichier : un JSON n8n valide, importable tel quel dans l'interface. C'est la différence entre un assistant et un outil.",
    stack: ["Next.js", "OpenAI GPT-4o", "Stripe", "Prisma", "Neon"],
    results: [
      { value: "182 h/an", label: "économisées en moyenne" },
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
    kicker: "Agent autonome B2B",
    problem:
      "La recherche de prospects et la rédaction des approches sont deux tâches distinctes, toutes deux chronophages, et rarement bien faites en même temps par la même personne.",
    architecture: [
      { id: "search", label: "Tavily", sub: "recherche web" },
      { id: "crawl", label: "Firecrawl", sub: "extraction de contenu" },
      { id: "agent", label: "Agent GPT-4o", sub: "qualification + rédaction" },
      { id: "out", label: "n8n + Sheets", sub: "livraison" },
    ],
    archNote:
      "L'agent conduit son propre cycle de recherche : il décide quoi chercher, lit les pages qu'il trouve, et n'écrit qu'une fois qu'il a de quoi personnaliser réellement.",
    stack: ["Next.js", "Vercel AI SDK", "OpenAI GPT-4o", "Tavily API", "Firecrawl"],
    results: [
      { value: "100 %", label: "recherche autonome" },
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
      { value: "0 €", label: "coût d'exploitation" },
    ],
    featured: false,
  },
];

/* ------------------------------------------------------------------ */
/*  EN                                                                 */
/* ------------------------------------------------------------------ */

export const casesEn: CaseStudy[] = [
  {
    slug: "lvi-control-center",
    client: "Maxime · LED Visual Innovation",
    sector: "B2B LED signage",
    duration: "4 days",
    title: "A sales pipeline that runs with nobody in it.",
    kicker: "B2B outbound · fully autonomous",
    problem:
      "The sales team found prospects by hand on LinkedIn, wrote every approach one at a time, then tracked it all in a spreadsheet. Volume was capped at what one person can process in a day, and personalisation quality dropped as volume climbed.",
    architecture: [
      { id: "apify", label: "Apify", sub: "targeted LinkedIn scraping" },
      { id: "gpt", label: "GPT-4o", sub: "qualification + icebreaker" },
      { id: "lemlist", label: "Lemlist", sub: "campaign triggering" },
      { id: "supabase", label: "Supabase", sub: "central state, 30s sync" },
    ],
    archNote:
      "Every stage is independent and replayable: if one link fails, state stays consistent in Supabase and processing resumes from the last confirmed checkpoint. The control center shows real pipeline state, refreshed every 30 seconds.",
    stack: ["Apify", "OpenAI GPT-4o", "Lemlist", "Supabase", "n8n", "Next.js"],
    results: [
      { value: "4 days", label: "from brief to production" },
      { value: "100%", label: "of the cycle unattended" },
      { value: "30s", label: "sync latency" },
    ],
    quote: {
      text: "He quickly understands business and technical challenges, asks the right questions and proposes relevant, structured solutions.",
      author: "Public recommendation",
      role: "Malt · 5.0",
      source: "Malt",
      url: "https://www.malt.fr/profile/oussamaabassi1",
    },
    featured: true,
  },
  {
    slug: "africart",
    client: "Jean · AfricArt",
    sector: "Art market · auctions",
    duration: "Long-running",
    title: "50,000 artworks aggregated from four auction houses.",
    kicker: "Multi-source data pipeline",
    problem:
      "Auction data lived scattered across Drouot, Interencheres, Invaluable and LiveAuctioneers, each with its own structure, duplicates and missing fields. No unified view existed, and manual cleaning at that scale was out of the question — as was AI cleaning at list price.",
    architecture: [
      { id: "scrape", label: "Scrapers", sub: "4 sources, checkpoints" },
      { id: "clean", label: "Cleaning", sub: "dedup + classification" },
      { id: "llm", label: "GPT-4o-mini", sub: "batched normalisation" },
      { id: "rds", label: "AWS EC2 + RDS", sub: "storage + monitoring" },
      { id: "wp", label: "WordPress", sub: "sync via REST API" },
    ],
    archNote:
      "The real cost centre wasn't scraping, it was inference. By batching records, splitting prompts and dropping to GPT-4o-mini wherever quality allowed, cleaning 64,602 records came to $5.51 total. Checkpoints let any run resume without starting over.",
    stack: ["Python", "AWS EC2", "AWS RDS", "GPT-4o-mini", "WordPress REST API", "PostgreSQL"],
    results: [
      { value: "50,000+", label: "artworks aggregated" },
      { value: "64,602", label: "records cleaned for $5.51" },
      { value: "253,000", label: "alt texts generated" },
    ],
    featured: true,
  },
  {
    slug: "bastide",
    client: "Matys Nsir · Bastide Confort Médical",
    sector: "Medical equipment",
    duration: "Shipped, in production",
    title: "Birthday texts that go out without anyone remembering.",
    kicker: "n8n automation · patient data",
    problem:
      "Client birthdays were tracked by hand from irregular CSV exports: numbers in inconsistent formats, duplicates across files, and a manual send that got skipped the moment a week got busy.",
    architecture: [
      { id: "csv", label: "CSV import", sub: "cleaning + validation" },
      { id: "e164", label: "Normalisation", sub: "E.164 format" },
      { id: "dedup", label: "Deduplication", sub: "JS rules" },
      { id: "cron", label: "Cron 8am", sub: "daily trigger" },
      { id: "sheets", label: "Google Sheets", sub: "real-time log" },
    ],
    archNote:
      "The real work wasn't sending, it was the data upstream: normalising numbers entered in six different formats, deduplicating without losing a client, and making every run auditable. The Google Sheets log shows at a glance what went out, to whom, and why a send was skipped.",
    stack: ["n8n", "JavaScript", "Google Sheets API", "SMS gateway", "Cron"],
    results: [
      { value: "0", label: "manual sends left" },
      { value: "8am", label: "automatic daily trigger" },
      { value: "5.0", label: "reviews on Upwork and Malt" },
    ],
    quote: {
      text: "He quickly understood the requirement, delivered a working solution and was always available to make necessary adjustments. Communication was smooth throughout the project.",
      author: "Matys Nsir",
      role: "Upwork · 5.0",
      source: "Upwork",
      url: "https://www.upwork.com/freelancers/~01e9d7e582881baac8",
    },
    featured: true,
  },
  {
    slug: "talentscout",
    client: "TalentScout AI",
    sector: "SaaS · HR · voice AI",
    duration: "Full product",
    title: "A complete ATS with voice agents doing first-round screening.",
    kicker: "SaaS · recruitment",
    problem:
      "Phone screening consumes most of a recruiter's time, and most of that time goes to applications that won't clear the first filter anyway.",
    architecture: [
      { id: "ats", label: "ATS", sub: "candidate pipeline" },
      { id: "whisper", label: "Whisper", sub: "interview transcription" },
      { id: "gpt", label: "GPT-4 Turbo", sub: "scoring + summary" },
      { id: "db", label: "Neon + Prisma", sub: "structured data" },
    ],
    archNote:
      "The voice agent doesn't replace the recruiter: it absorbs the first filter and returns a structured summary. The recruiter takes over on the profiles worth it, with the full transcript and the scoring rationale in front of them.",
    stack: ["Next.js", "OpenAI GPT-4 Turbo", "Whisper", "Neon", "Prisma"],
    results: [
      { value: "10×", label: "faster screening" },
      { value: "−80%", label: "qualification time" },
      { value: "24", label: "pages of technical documentation" },
    ],
    featured: true,
  },

  /* ---- compact ---- */
  {
    slug: "moon-mobility",
    client: "Mouna Baatout · Moon Mobility",
    sector: "Ride-hailing · transport",
    duration: "Domain engine",
    title: "The pricing engine behind a ride-hailing fleet.",
    kicker: "Python · business logic",
    problem:
      "Pricing combined distance tiers, time-based surges, airport flat rates, and waiting and cancellation rules. Every edge case was applied by hand, with the inconsistencies that implies.",
    architecture: [
      { id: "tiers", label: "Distance tiers", sub: "progressive grid" },
      { id: "surge", label: "Surge", sub: "time-based uplift" },
      { id: "flat", label: "Flat rates", sub: "airport trips" },
      { id: "rules", label: "Rules", sub: "waiting + cancellation" },
    ],
    archNote:
      "All pricing logic sits in an engine testable independently of the application. Changing a grid doesn't require touching the rest of the system.",
    stack: ["Python", "Unit tests", "REST API"],
    results: [
      { value: "1", label: "source of pricing truth" },
      { value: "5.0", label: "Malt recommendation" },
    ],
    featured: false,
  },
  {
    slug: "bc-enterprise",
    client: "B&C Enterprise",
    sector: "Industry · Belgium",
    duration: "Data engagement",
    title: "270 industrial sites enriched, site by site.",
    kicker: "B2B enrichment",
    problem:
      "Standard company databases return the registered head office. For industrial outbound that's useless: what matters is the production site, not the admin office.",
    architecture: [
      { id: "src", label: "Sources", sub: "registries + web" },
      { id: "geo", label: "Google Maps API", sub: "precise geolocation" },
      { id: "match", label: "Matching", sub: "site ≠ head office" },
    ],
    archNote:
      "A Python script paired with the Google Maps API maps legal entities to actual physical locations, at site-level granularity.",
    stack: ["Python", "Google Maps API", "PostgreSQL"],
    results: [
      { value: "270", label: "industrial sites mapped" },
      { value: "site", label: "granularity, not head office" },
    ],
    featured: false,
  },
  {
    slug: "flowaudit",
    client: "FlowAudit AI",
    sector: "SaaS · generative AI",
    duration: "Product",
    title: "A business process turned into an n8n workflow in 30 seconds.",
    kicker: "SaaS · workflow generation",
    problem:
      "Describing a process is easy; turning it into a working automation isn't. The gap between the idea and the first workflow that actually runs is where most teams give up.",
    architecture: [
      { id: "input", label: "Description", sub: "process in plain language" },
      { id: "gpt", label: "GPT-4o", sub: "schema generation" },
      { id: "json", label: "n8n JSON", sub: "directly importable export" },
    ],
    archNote:
      "The output isn't advice, it's a file: valid n8n JSON, importable as-is. That's the difference between an assistant and a tool.",
    stack: ["Next.js", "OpenAI GPT-4o", "Stripe", "Prisma", "Neon"],
    results: [
      { value: "182h/yr", label: "saved on average" },
      { value: "30s", label: "from description to workflow" },
      { value: "JSON", label: "direct n8n export" },
    ],
    featured: false,
  },
  {
    slug: "leadscout",
    client: "LeadScout AI",
    sector: "AI agent · lead generation",
    duration: "Product",
    title: "An agent that researches, qualifies and writes on its own.",
    kicker: "Autonomous B2B agent",
    problem:
      "Finding prospects and writing the outreach are two distinct tasks, both time-consuming, and rarely done well at the same time by the same person.",
    architecture: [
      { id: "search", label: "Tavily", sub: "web research" },
      { id: "crawl", label: "Firecrawl", sub: "content extraction" },
      { id: "agent", label: "GPT-4o agent", sub: "qualification + writing" },
      { id: "out", label: "n8n + Sheets", sub: "delivery" },
    ],
    archNote:
      "The agent drives its own research loop: it decides what to look for, reads what it finds, and only writes once it has something worth personalising with.",
    stack: ["Next.js", "Vercel AI SDK", "OpenAI GPT-4o", "Tavily API", "Firecrawl"],
    results: [
      { value: "100%", label: "autonomous research" },
      { value: "auto", label: "personalised emails" },
    ],
    featured: false,
  },
  {
    slug: "darkosclaw",
    client: "DarkosClaw",
    sector: "Open source · AI agent",
    duration: "Open project",
    title: "An AI agent OS, 25 tools, zero running cost.",
    kicker: "Open source",
    problem:
      "Almost every AI agent environment assumes a paid API subscription. Nothing technically prevents building the equivalent on open models.",
    architecture: [
      { id: "core", label: "Core", sub: "tool orchestration" },
      { id: "tools", label: "25 tools", sub: "search, files, code" },
      { id: "llm", label: "Groq + OpenRouter", sub: "interchangeable models" },
    ],
    archNote:
      "Model-provider abstraction is built in from the start: switching LLM is an environment variable, not a rewrite.",
    stack: ["Next.js", "Vercel AI SDK", "Groq LLaMA 3.3", "OpenRouter", "Tavily API"],
    results: [
      { value: "25", label: "integrated tools" },
      { value: "€0", label: "running cost" },
    ],
    featured: false,
  },
];
