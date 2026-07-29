import type { Dict } from "./types";

export const en: Dict = {
  meta: {
    title:
      "Freelance AI automation & data engineer — n8n, scraping, dashboards | Oussama Abassi",
    description:
      "Freelance engineer based in Paris. I automate your processes with n8n and AI, and build your data pipelines, dashboards, websites and apps. Top Rated on Upwork, 5.0 on Malt. Reply within 24h.",
  },

  nav: {
    work: "Work",
    services: "Services",
    process: "Process",
    about: "About",
    cta: "Start",
  },

  hero: {
    badge: "Available for new projects",
    title: ["I design and build", "the", "your business runs on"],
    accent: "systems",
    sub: "Data pipelines, AI automation, dashboards, websites and apps — engineered end-to-end, by one person who ships.",
    ctaPrimary: "Start a project",
    ctaSecondary: "See my work",
    proof: ["Top Rated on Upwork", "100% Job Success", "EU-based"],
  },

  metrics: [
    { value: "64,602", label: "records cleaned by AI for $5.51" },
    { value: "253,000", label: "alt texts generated" },
    { value: "4 days", label: "from brief to a live sales pipeline" },
    { value: "270", label: "industrial sites enriched, site by site" },
  ],

  services: {
    kicker: "What I build",
    title: "Eight disciplines. One person to talk to.",
    sub: "No agency, no subcontracting, no coordination overhead. You talk to the person writing the code.",
    items: [
      {
        key: "data",
        title: "Data & pipelines",
        line: "Scraping, cleaning, deduplication, enrichment, syncing. From raw source to data you can actually use.",
        caseSlug: "marketplace-art",
        span: "hero",
      },
      {
        key: "ai",
        title: "AI automation",
        line: "n8n, autonomous agents, LLMs in production. Repetitive work disappears from the calendar.",
        caseSlug: "bastide",
        span: "tall",
      },
      {
        key: "dashboards",
        title: "Dashboards & control centers",
        line: "An interface built to operate a system, not to admire it.",
        caseSlug: "executive-control-center",
        span: "unit",
      },
      {
        key: "web",
        title: "Web development",
        line: "Next.js, TypeScript, from design to deployment.",
        caseSlug: "flowaudit",
        span: "unit",
      },
      {
        key: "apps",
        title: "Mobile & desktop apps",
        line: "Cross-platform, wired into the systems you already run.",
        caseSlug: "talentscout",
        span: "unit",
      },
      {
        key: "chatbots",
        title: "Chatbots & AI assistants",
        line: "Qualification, support, lead capture. The one on this page is one of them.",
        caseSlug: "darkosclaw",
        span: "unit",
      },
      {
        key: "ecommerce",
        title: "E-commerce",
        line: "Catalogues, payments, stock and back-office syncing.",
        caseSlug: "marketplace-art",
        span: "unit",
      },
      {
        key: "design",
        title: "Design & branding",
        line: "Interfaces and visual identity that match the product.",
        caseSlug: "lvi-control-center",
        span: "unit",
      },
    ],
  },

  cases: {
    kicker: "Selected work",
    title: "Real clients. Systems in production.",
    sub: "For each project: the problem, the architecture, the stack, and what it produced.",
    readMore: "Read the case study",
    similar: "Need something similar?",
  },

  process: {
    kicker: "How I work",
    title: "Five steps. No surprises.",
    sub: "The same sequence on every project, from a 200-line script to a full platform.",
    steps: [
      {
        n: "01",
        title: "Signal / brief",
        body: "You describe the problem. I ask the questions nobody asks — the ones that reveal the real problem is somewhere else. Reply within 24 to 48 hours.",
      },
      {
        n: "02",
        title: "Architecture",
        body: "System diagram, stack decisions, failure points identified. Before the first line of code. You sign off on a plan, not a promise.",
      },
      {
        n: "03",
        title: "Build",
        body: "Delivered in visible increments. You watch the system run on your own data long before it's finished. No black box.",
      },
      {
        n: "04",
        title: "Handover",
        body: "Documentation, access, walkthrough. You're independent. The code is yours, with no hidden dependency on me.",
      },
      {
        n: "05",
        title: "Maintenance",
        body: "Optional. Monitoring, fixes, evolutions. Some clients never needed it — that's the point.",
      },
    ],
  },

  stack: {
    kicker: "Technical stack",
    title: "Production tools. Not fragile prototypes.",
    sub: "The same building blocks used by companies processing millions of events a day.",
    groups: [
      { label: "Automation", items: ["n8n", "Make", "Zapier", "Apify", "Playwright"] },
      { label: "AI & LLMs", items: ["OpenAI", "Anthropic", "Groq", "Gemini", "Vercel AI SDK"] },
      { label: "Data", items: ["PostgreSQL", "Supabase", "Airtable", "AWS RDS", "Redis"] },
      { label: "Web & apps", items: ["Next.js", "TypeScript", "React", "Tailwind", "React Native"] },
      { label: "Infra", items: ["Vercel", "AWS EC2", "Docker", "GitHub Actions", "Cloudflare"] },
      { label: "Delivery", items: ["Resend", "Stripe", "Twilio", "Lemlist", "Google APIs"] },
    ],
  },

  about: {
    kicker: "About",
    title: "One person. That's the strength, not the limit.",
    body: [
      "I'm Oussama Abassi, a freelance engineer based in Paris, working across Europe: industrial SMEs, consumer platforms, independents, startups. The size and the sector change, the starting point never does — someone shows me a process eating their week, and I turn it into a system that runs on its own.",
      "Working with me means one point of contact, no project-management layer, and the person designing the architecture is the person writing the code and answering your messages. On a four-day project as much as a three-month one.",
      "What interests me are systems that don't break the moment I stop watching them.",
    ],
    cta: "Start a project",
  },

  reviews: {
    kicker: "Verified reviews",
    title: "Public, verifiable, all 5.0.",
    sub: "Every review links back to its public source on Upwork or Malt.",
    items: [
      {
        name: "Maxime",
        role: "Industrial group · Control center & sales outbound",
        platform: "Upwork",
        url: "https://www.upwork.com/freelancers/~01e9d7e582881baac8",
        text: "Osama guided us, advised us and met our needs with great efficiency. Thank you again!",
      },
      {
        name: "Yassine Alomari",
        role: "Managing Director · Junto · Recommendation of 14/05/2026",
        platform: "Malt",
        url: "https://www.malt.fr/profile/oussamaabassi1",
        text: "I brought Oussama in to automate part of our internal processes. He delivered quickly, the result was clean and it has been running without a hitch since. No need to explain what we wanted twice — he gets it fast and proposes concrete solutions. I recommend him.",
      },
      {
        name: "Matys Nsir",
        role: "Bastide Confort Médical · n8n automation",
        platform: "Upwork",
        url: "https://www.upwork.com/freelancers/~01e9d7e582881baac8",
        text: "Oussama did excellent work on my automation project. He was very responsive, professional and effective from start to finish. He quickly understood the requirement, delivered a working solution and was always available to make necessary adjustments. Communication was smooth throughout the project. I'm very satisfied with this collaboration and would work with him again without hesitation.",
      },
      {
        name: "Mouna Baatout",
        role: "Automation Engineer · Public recommendation",
        platform: "Malt",
        url: "https://www.malt.fr/profile/oussamaabassi1",
        text: "I had the chance to work with this engineer and can only recommend him 100%. He's an exceptional person — attentive, committed and extremely professional. He quickly understands business and technical challenges, asks the right questions and proposes relevant, structured solutions. He doesn't just execute: he thinks, optimizes and brings real added value. A rare profile — technically sharp and results-oriented.",
      },
      {
        name: "Sara Moujahid",
        role: "Project Manager · Zenko · Public recommendation",
        platform: "Malt",
        url: "https://www.malt.fr/profile/oussamaabassi1",
        text: "I had the opportunity to work with Oussama on automation projects and strongly recommend him. He has perfect command of n8n and was able to transform complex manual processes into smooth, efficient workflows. Oussama is not only technical — he also has a genuine business vision to save time. A reliable and highly responsive expert.",
      },
    ],
    all: "See all Upwork reviews",
  },

  faq: {
    kicker: "Frequently asked",
    title: "The questions people ask before signing.",
    sub: "Honest answers, including the ones that don't flatter me.",
    items: [
      {
        q: "Do you really work alone?",
        a: "Yes. One point of contact, no project-management layer, and the person designing the architecture is the person writing the code and answering your messages. On very large projects I can bring in trusted partners, but you keep a single point of contact: me.",
      },
      {
        q: "How long does a project take?",
        a: "It depends entirely on scope, and I won't quote a number before I understand it. For a sense of scale: an autonomous sales pipeline shipped in 4 days, a large-scale data project ran across two months. After our first conversation you get a reasoned estimate — not a figure pulled out of the air.",
      },
      {
        q: "How does billing work?",
        a: "Fixed price on a defined scope, or time-based on longer engagements. A deposit is required to start. Budget is discussed once the need is framed: I'd rather quote fairly after understanding the problem than publish a rate card that fits nobody.",
      },
      {
        q: "What happens if the system breaks after delivery?",
        a: "You get the documentation, the operations runbook and full access to the code — you're independent, with no hidden dependency on me. A maintenance contract is available but optional. Some clients have never needed one, and that's exactly what I aim for when building.",
      },
      {
        q: "Is my data safe?",
        a: "NDA signed on request, before any detail is exchanged. API keys stay server-side, never in the browser. On a recent project the client's IT lead required strictly read-only banking access: the scope was honoured to the letter, no write route exists in the codebase.",
      },
      {
        q: "Do you take over existing projects or only new builds?",
        a: "Both. A good share of my work is picking up infrastructure already in place, fixing its blind spots and making it operable. Taking over existing code often demands more rigour than starting from scratch.",
      },
    ],
    cta: "Another question? Write to me.",
  },

  contact: {
    kicker: "Start a project",
    title: "Describe your project.",
    sub: "I read every message myself and reply within 24 hours. No automated quote, no form disappearing into a void.",
    fields: {
      name: "Name",
      email: "Email",
      company: "Company",
      type: "Project type",
      budget: "Budget range",
      message: "What you need",
    },
    types: [
      { value: "automation", label: "Automation" },
      { value: "web", label: "Website" },
      { value: "app", label: "Application" },
      { value: "data", label: "Data" },
      { value: "design", label: "Design" },
      { value: "other", label: "Other" },
    ],
    budgets: [
      { value: "lt2k", label: "under €2k" },
      { value: "2-5k", label: "€2 – 5k" },
      { value: "5-15k", label: "€5 – 15k" },
      { value: "gt15k", label: "over €15k" },
      { value: "tbd", label: "to be defined" },
    ],
    submit: "Send",
    sending: "Sending…",
    success: "Message received.",
    successBody:
      "You'll get a confirmation email. I'll reply personally within 24 hours.",
    error:
      "That didn't go through. Email me directly at oussama.abassi.work@gmail.com or message me on WhatsApp — I'll reply straight away.",
    errorEmail:
      "Your message is saved, I'll see it. The automatic confirmation didn't go out — if it's urgent, reach me on WhatsApp.",
    guarantees: ["Reply within 24h", "NDA on request", "EU-based"],
    optional: "optional",
    required: "required",
  },

  chat: {
    kicker: "Assistant · live demo",
    intro:
      "This chatbot is an example of what I build. It qualifies, it records, it never sleeps. Ask it a question or let it guide you.",
    start: "Start the conversation",
    placeholder: "Type your answer…",
    send: "Send",
    restart: "Start over",
    steps: {
      greeting:
        "Hi. I'm Oussama's assistant. A few quick questions and he'll get back to you within 24 hours — or just ask me anything.",
      name: "First things first, what's your name?",
      email: "Great. What email should he reply to?",
      type: "What kind of project is this?",
      budget: "What budget do you have in mind? A range is fine.",
      need: "Last one: describe what you need in a few lines.",
      confirm:
        "Noted and sent to Oussama. You'll receive a confirmation email, and he'll reply personally within 24 hours.",
    },
    invalidEmail: "That address doesn't look right. Could you check it?",
    thinking: "thinking…",
  },

  footer: {
    tagline:
      "I design and build the systems your business runs on. Data pipelines, AI automation, dashboards, websites and apps.",
    nav: "Navigate",
    contact: "Contact",
    rights: "All rights reserved.",
    legal: "Legal notice",
  },
};
