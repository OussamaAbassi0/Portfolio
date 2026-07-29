import type { CaseStudy } from "./types";

/**
 * Case studies — English version.
 * Same confidentiality rules as the French file: no scraped source is named,
 * the art marketplace client is not named, screenshots use fictional values.
 */

export const casesEn: CaseStudy[] = [
  {
    slug: "executive-control-center",
    client: "Maxime · French industrial group",
    sector: "Industry · LED displays · €4.5M revenue",
    duration: "Full design and development",
    title: "The owner was running €4.5M from spreadsheets.",
    kicker: "Executive control center",
    problem:
      "A French manufacturer of large-format LED displays turning over €4.5M was running the business from several Excel workbooks updated by hand. The sales CRM, the bank accounts, customer and supplier invoices, field operations and warranties each lived in their own corner. Answering a simple question — how much is still due to come in this month — meant opening four files and trusting whoever updated them last.",
    architecture: [
      { id: "crm", label: "eWay CRM", sub: "sales pipeline" },
      { id: "bank", label: "Qonto API", sub: "read-only, balances + transactions" },
      { id: "invoices", label: "Invoicing", sub: "customers and suppliers" },
      { id: "db", label: "Supabase", sub: "8 tables, RLS, daily job" },
      { id: "ai", label: "AI assistants", sub: "sales + after-sales, validated output" },
    ],
    archNote:
      "The three integrations feed a single database, refreshed by a daily scheduled job. The cockpit reads that database, never the APIs directly: a provider outage doesn't stop the owner from seeing his figures, it simply surfaces as stale data. API keys stay strictly server-side.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript strict",
      "Recharts",
      "Supabase",
      "PostgreSQL",
      "Row Level Security",
      "Anthropic API",
      "eWay CRM",
      "Qonto API",
      "Vercel",
    ],
    results: [
      { value: "6", label: "modules: cockpit, sales, finance, property, operations, AI" },
      { value: "8", label: "PostgreSQL tables protected by Row Level Security" },
      { value: "233", label: "elements contrast-audited, WCAG AA reached" },
      { value: "0", label: "npm dependencies added across the last six features" },
    ],
    quote: {
      text: "Osama guided us, advised us and met our needs with great efficiency. Thank you again!",
      author: "Maxime",
      role: "Upwork · 5.0",
      source: "Upwork",
      url: "https://www.upwork.com/freelancers/~01e9d7e582881baac8",
    },
    featured: true,
    images: [
      { src: "/projets/executive-control-center-1.webp", alt: "Executive cockpit — revenue and financing overview, fictional figures" },
      { src: "/projets/executive-control-center-2.webp", alt: "Control module of the executive control center" },
      { src: "/projets/executive-control-center-3.webp", alt: "AI assistant and alert centre of the executive control center" },
    ],
    detail: [
      {
        title: "A security constraint honoured to the letter",
        body: "The client's IT lead required strictly read-only banking access: balances and transactions, no transfer capability, ever. The scope was held without negotiation. API keys live server-side only, the browser never sees them, and no write route to the bank exists in the codebase — the absence of the feature is the guarantee, not a checkbox somewhere.",
      },
      {
        title: "Zero dependencies added",
        body: "Three requests could each have been solved with an npm install. Each was solved differently, and every time for a reason that holds up technically.",
        bullets: [
          "PDF export — an @media print stylesheet and the browser's native print engine instead of a generation library. Vector output, selectable text, no dependency to maintain.",
          "Animations — native CSS instead of Framer Motion. 120 kB saved on the bundle, and prefers-reduced-motion handled properly.",
          "Dashboard components — an in-house design system instead of Tremor, which requires React 18 while the project runs on React 19.",
        ],
      },
      {
        title: "A light mode that can't structurally break",
        body: "The codebase uses inline styles. Rather than adding thousands of conditional classes, every colour resolves through CSS variables declined per theme. Background and text always come from the same palette: light-text-on-light-background becomes structurally impossible, not merely avoided case by case. An automated contrast audit across 233 elements confirmed the result, with the grey scale adjusted to reach WCAG AA.",
      },
      {
        title: "Errors you can actually see",
        body: "The initial code silently swallowed database errors. During a network outage the owner saw €0 displayed with no warning at all — and could make a decision on false figures. That's the kind of flaw you only notice once it has cost something. Replaced with an explicit error state, distinct from a zero value, with a retry path.",
      },
      {
        title: "Two AI assistants under business constraints",
        body: "A sales-reply generator applies a five-step reasoning sequence before writing, which makes its reasoning inspectable rather than magical. An after-sales assistant is constrained by strict vocabulary rules, including a ban on admitting liability before technical analysis — one badly chosen sentence in an after-sales exchange can cost a warranty claim. Outputs are structured JSON, validated before display.",
      },
    ],
  },

  {
    slug: "marketplace-art",
    client: "Art auction marketplace",
    sector: "E-commerce · art market",
    duration: "May – June 2026",
    title: "50,000 artworks aggregated, cleaned and published for $5.51.",
    kicker: "Data & LLM pipeline",
    problem:
      "A marketplace specialising in art auctions wanted to aggregate catalogues from several external sources. Each had its own structure, duplicates, missing fields and a different anti-bot posture. Manual cleaning at that scale was unthinkable — and AI cleaning at list price would have cost more than the value it added.",
    architecture: [
      { id: "collect", label: "Collection", sub: "protected sources, resumable" },
      { id: "clean", label: "GPT-4o-mini", sub: "idempotent cleaning" },
      { id: "img", label: "Image pipeline", sub: "8 formats per artwork" },
      { id: "seo", label: "GPT-4o vision", sub: "alt texts + biographies" },
      { id: "store", label: "EC2 + RDS", sub: "storage and monitoring" },
    ],
    archNote:
      "The real cost centre wasn't collection, it was inference. By batching records, splitting prompts by task and dropping to a lighter model wherever quality allowed, cleaning 64,602 records came to $5.51 in total. An idempotency marker guarantees an already-processed row is never paid for twice, even if the pipeline is re-run — that detail is what turns a runaway cost into a bounded one.",
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
      { value: "50,000", label: "artworks aggregated and published" },
      { value: "64,602", label: "records cleaned by AI for $5.51 in total" },
      { value: "253,000", label: "alt texts generated, around 3,000 a night" },
      { value: "11,301", label: "biographies rewritten for SEO across five languages" },
    ],
    featured: true,
    detail: [
      {
        title: "Collecting from protected sources",
        body: "The sources weren't open: subscription systems, enterprise-grade anti-bot protection, and for some a sale lifecycle to track over time rather than a simple snapshot. Each collector manages its own checkpoints: an interrupted run restarts from the last confirmed batch, never from zero.",
        bullets: [
          "Sale lifecycle tracked from pending through to completed",
          "Checkpoints on every batch, monitoring and failure logging",
          "No source is named publicly, out of respect for the contractual scope",
        ],
      },
      {
        title: "Making LLM cleaning economically viable",
        body: "Cleaning titles, classifying mediums, parsing dimensions and signatures: trivial one at a time, unmanageable across 64,602. The pipeline batches records, applies task-specific prompts, and drops to the lightest model that still holds the required quality. Result: $5.51 of tokens in total, with an idempotency marker preventing any budget from being spent twice.",
      },
      {
        title: "An image pipeline built for SEO",
        body: "Storage migrated to shared hosting, then eight formats generated per artwork in AVIF and WebP — 400px, 800px, 1200px, thumbnail and original — with dynamic search-oriented naming such as artist-title_800w.avif. A taxonomy prefix bug was fixed along the way: the prefix now applies only to the correct nomenclature category, not the whole catalogue.",
      },
      {
        title: "Editorial enrichment at scale",
        body: "253,000 alt texts generated by a vision model, around 3,000 a night on a slot scheduled at 2am UTC so it never competes with real traffic. 11,301 artist biographies rewritten for search across five languages: French, English, German, Italian, Spanish. JSON-LD Person and Artist structures, semantic HTML5, mobile accordions.",
      },
      {
        title: "A handover you can pick up without me",
        body: "Everything shipped to GitHub with a README, an operations runbook and the database schema. Six bugs were found and fixed before the final push. That's the part of the work nobody sees in a demo but which decides whether the client is independent or dependent.",
      },
    ],
  },

  {
    slug: "lvi-control-center",
    client: "Maxime · French industrial group",
    sector: "Industry · LED displays",
    duration: "4 days · May 2026",
    title: "A sales pipeline with nobody standing in it.",
    kicker: "Autonomous B2B outbound",
    problem:
      "The sales team spent dozens of hours a week on LinkedIn: finding prospects by hand, qualifying them, copy-pasting into the CRM, writing every message one at a time. Volume was capped at what one person can process in a day, and personalisation quality dropped as volume rose — exactly the wrong way round.",
    architecture: [
      { id: "collect", label: "Apify", sub: "targeted prospect extraction" },
      { id: "qualify", label: "GPT-4o", sub: "qualification + icebreaker" },
      { id: "campaign", label: "Lemlist", sub: "campaign triggering" },
      { id: "orchestrate", label: "n8n", sub: "end-to-end orchestration" },
      { id: "state", label: "Supabase", sub: "central state, 30s sync" },
    ],
    archNote:
      "Every stage is independent and replayable. If one link fails, state stays consistent in the database and processing resumes from the last confirmed checkpoint, with no duplicate sends on the campaign side. The control center shows live pipeline state rather than a summary computed after the fact: the sales team sees what is happening, not what happened.",
    stack: ["n8n", "Apify", "OpenAI GPT-4o", "Lemlist", "Supabase", "Next.js"],
    results: [
      { value: "4 days", label: "from brief to production" },
      { value: "100%", label: "of the cycle without human intervention" },
      { value: "30s", label: "dashboard synchronisation latency" },
      { value: "3", label: "automations in production: monitoring, campaigns, trade shows" },
    ],
    featured: true,
    images: [
      { src: "/projets/lvi-control-center-1.webp", alt: "Control center overview — outbound metrics, fictional values" },
      { src: "/projets/lvi-control-center-2.webp", alt: "Trade-show opportunities module — leads qualified and rejected by AI" },
      { src: "/projets/lvi-control-center-3.webp", alt: "Campaign module — contact base and AI-generated drafts" },
      { src: "/projets/lvi-control-center-4.webp", alt: "LinkedIn competitive monitoring, identifiers masked" },
      { src: "/projets/lvi-control-center-5.webp", alt: "n8n workflow for LinkedIn monitoring" },
      { src: "/projets/lvi-control-center-7.webp", alt: "n8n workflow for trade-show lead detection" },
    ],
    detail: [
      {
        title: "Three automations, one place to look",
        body: "The control center brings together continuous LinkedIn monitoring, a campaign trigger, and opportunity detection across the sector's trade shows. All three write to the same database, so there is exactly one place to look — the condition for a tool like this to actually get used.",
      },
      {
        title: "The generated icebreaker isn't a merge field",
        body: "The model receives the prospect's profile and the product context, then writes an opener grounded in something verifiable from that profile. The difference from a mail merge shows up in reply rate, and more importantly in the fact that a prospect who replies doesn't feel processed like a spreadsheet row.",
      },
      {
        title: "API consumption in plain sight",
        body: "The dashboard shows live credit balances for the third-party services the pipeline depends on. An autonomous pipeline that stops for lack of credits is a pipeline that fails silently: the gauge exists so that can't happen without warning.",
      },
    ],
  },

  {
    slug: "bastide",
    client: "Matys Nsir · Bastide Confort Médical",
    sector: "Medical equipment",
    duration: "February 2026 · in production",
    title: "Birthday texts that go out without anyone remembering.",
    kicker: "n8n automation",
    problem:
      "Client birthdays were tracked by hand from irregular CSV exports. Numbers entered in inconsistent formats, duplicates across files, dates in the wrong shape for the CRM, and a manual send that got skipped the moment a week got busy. The gesture existed on paper and disappeared in practice.",
    architecture: [
      { id: "csv", label: "CSV import", sub: "extraction and validation" },
      { id: "norm", label: "Normalisation", sub: "E.164 format + CRM dates" },
      { id: "dedup", label: "Deduplication", sub: "JavaScript rules" },
      { id: "cron", label: "Cron 8am", sub: "autonomous daily run" },
      { id: "log", label: "Google Sheets", sub: "real-time log" },
    ],
    archNote:
      "The real work wasn't sending, it was the data upstream: normalising numbers entered six different ways, reformatting birth dates to CRM standards, deduplicating without ever losing a client, and making every run auditable. Two workflows coexist: a manual import for new clients, and a fully autonomous daily cron.",
    stack: ["n8n", "JavaScript", "Google Sheets API", "SMS API", "CRM Universal", "Cron"],
    results: [
      { value: "0", label: "manual sends left in the process" },
      { value: "8am", label: "daily trigger, unsupervised" },
      { value: "2", label: "workflows: manual import and autonomous run" },
      { value: "5.0", label: "reviews on Upwork and Malt" },
    ],
    quote: {
      text: "Oussama is a responsive, professional freelancer and a pleasure to work with. He delivered both requested workflows seriously and efficiently, while taking the time to clearly explain the steps and how it all works.",
      author: "Matys",
      role: "Malt · 5.0 · 01/03/2026",
      source: "Malt",
      url: "https://www.malt.fr/profile/oussamaabassi1",
    },
    featured: true,
    images: [
      { src: "/projets/bastide-1.webp", alt: "n8n workflow for automated SMS sending" },
      { src: "/projets/bastide-2.webp", alt: "Phone number cleaning and normalisation step" },
      { src: "/projets/bastide-3.webp", alt: "Send logging in Google Sheets" },
      { src: "/projets/bastide-4.webp", alt: "Deduplication and daily recipient filtering detail" },
    ],
    detail: [
      {
        title: "Data before automation",
        body: "A French phone number can be written at least six ways in a client export. Until that's resolved, no send automation holds: it fails silently on part of the base and nobody notices. Normalising to the international E.164 format is step one of the workflow, not an option.",
      },
      {
        title: "A log you can actually read",
        body: "Every run writes to a Google Sheet in real time: who received, at what time, with what status, and why a recipient was skipped. The client can check for himself, without asking me. That's the difference between a system you endure and a system you control.",
      },
    ],
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
      { id: "gpt", label: "GPT-4 Turbo", sub: "scoring and summary" },
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
    featured: false,
    images: [{ src: "/projets/talentscout-1.webp", alt: "TalentScout AI interface" }],
  },
  {
    slug: "moon-mobility",
    client: "Mouna Baatout · Moon Mobility",
    sector: "Ride-hailing · transport",
    duration: "Domain engine",
    title: "The pricing engine behind a ride-hailing fleet.",
    kicker: "Python · business logic",
    problem:
      "Pricing combined distance tiers, time-based surges, airport flat rates, and waiting and cancellation rules. Every edge case was applied by hand, with the inconsistencies that implies from one ride to the next.",
    architecture: [
      { id: "tiers", label: "Distance tiers", sub: "progressive grid" },
      { id: "surge", label: "Surge", sub: "by time slot" },
      { id: "flat", label: "Flat rates", sub: "airport trips" },
      { id: "rules", label: "Rules", sub: "waiting and cancellation" },
    ],
    archNote:
      "All pricing logic sits in an engine testable independently of the application. Changing a grid doesn't require touching the rest of the system, and a pricing mistake reproduces in a test rather than in production.",
    stack: ["Python", "Unit tests", "REST API"],
    results: [
      { value: "1", label: "source of pricing truth" },
      { value: "5.0", label: "Malt review from the client" },
    ],
    quote: {
      text: "He quickly understands business and technical challenges, asks the right questions and proposes relevant, structured solutions. He doesn't just execute: he thinks, optimises and brings real added value to the project.",
      author: "Mouna Baatout",
      role: "Malt · 5.0 · 27/02/2026",
      source: "Malt",
      url: "https://www.malt.fr/profile/oussamaabassi1",
    },
    featured: false,
    images: [{ src: "/projets/moon-mobility-1.webp", alt: "Moon Mobility pricing engine" }],
  },
  {
    slug: "bc-enterprise",
    client: "B&C Enterprise",
    sector: "Industry · Belgium",
    duration: "Data engagement",
    title: "270 industrial sites enriched, site by site.",
    kicker: "B2B enrichment",
    problem:
      "Standard company databases return the registered head office. For industrial outbound that's useless: what matters is the production site, not the admin office — you don't sell heavy equipment to a legal department.",
    architecture: [
      { id: "src", label: "Sources", sub: "registries and web" },
      { id: "geo", label: "Google Maps API", sub: "precise geolocation" },
      { id: "match", label: "Matching", sub: "site ≠ head office" },
    ],
    archNote:
      "A Python script paired with the Google Maps API maps legal entities to actual physical locations, at site-level granularity.",
    stack: ["Python", "Google Maps API", "PostgreSQL"],
    results: [
      { value: "270", label: "industrial sites mapped" },
      { value: "site", label: "granularity achieved, not head office" },
    ],
    featured: false,
  },
  {
    slug: "flowaudit",
    client: "FlowAudit AI",
    sector: "SaaS · generative AI",
    duration: "Product",
    title: "A business process turned into an n8n workflow in 30 seconds.",
    kicker: "Workflow generation",
    problem:
      "Describing a process is easy; turning it into a working automation isn't. The gap between the idea and the first workflow that actually runs is where most teams give up.",
    architecture: [
      { id: "input", label: "Description", sub: "process in plain language" },
      { id: "gpt", label: "GPT-4o", sub: "schema generation" },
      { id: "json", label: "n8n JSON", sub: "directly importable export" },
    ],
    archNote:
      "The output isn't advice, it's a file: valid n8n JSON, importable straight into the interface. That's the difference between an assistant and a tool.",
    stack: ["Next.js", "OpenAI GPT-4o", "Stripe", "Prisma", "Neon"],
    results: [
      { value: "182h", label: "saved per year on average" },
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
      { id: "agent", label: "GPT-4o agent", sub: "qualification and writing" },
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
