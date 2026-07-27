# Plan de conception — oussamaabassi.com v2

Statut : **v2 — direction refondue, en attente de validation**
Date : 27 juillet 2026

---

## 0. Direction créative — « Aurora / Cinematic Neon »

### D'où viennent les couleurs
Elles ne sont pas inventées : elles sont **extraites de ta vidéo**, frame par frame.
Analyse de 13 frames échantillonnées, clustering HSV :

| Cluster | Part de l'image | Rôle dans la vidéo |
|---|---|---|
| `#4C092B` magenta profond | 19,2 % | fond, dégradé principal |
| `#19030E` / `#190911` noir-magenta | 23,7 % | noirs, ombres |
| `#110F19` / `#140F19` violet-bleu | 12,5 % | ombres froides côté gauche |
| `#7F0F22` cramoisi | 3,2 % | rim light sur le visage |
| `#B27A6F` rose chaud | 1,6 % | peau, hautes lumières |

Le sujet est éclairé en **cramoisi** sur un fond **noir violacé**, avec une bascule froide violet-indigo dans les ombres. C'est le même axe chromatique que tes trois références (violet → magenta → cyan). Les deux se rejoignent naturellement.

### Le parti pris
**Nuit cinématographique + aurore néon.** Fond noir violacé, dégradés de maille aurora animés en fond (cramoisi → magenta → violet → indigo), cartes en verre dépoli avec bordures lumineuses, typographie display massive et variable, grille bento.

Le site ne « rappelle » pas la vidéo : il **prolonge** la vidéo. On sort du hero, la lumière continue.

### Les trois signaux
1. **L'aurore vit.** Un maillage de dégradés animé (shader WebGL léger, ~3 Ko) respire lentement en fond, teinté aux couleurs de la vidéo. Jamais statique, jamais agité.
2. **Le verre.** Nav flottante en pilule glass, cartes en `backdrop-filter`, bordures qui s'allument au dégradé conique au survol. C'est le langage de tes références, exécuté proprement.
3. **Le mouvement est natif.** Toutes les animations au scroll utilisent les **CSS scroll-driven animations** (`animation-timeline: view()`), pas une librairie JS. Ça tourne sur le compositeur, hors thread principal : fluide même sur un téléphone d'entrée de gamme. C'est la différence entre un site de 2022 et un site de 2026.

---

## 1. Design tokens

### Couleurs — dérivées de la vidéo, étendues en OKLCH

```css
/* Fonds — issus des noirs de la vidéo */
--void:    oklch(0.13 0.030 320);  /* #0A0510  base de page  */
--abyss:   oklch(0.18 0.045 318);  /* #14091D  surfaces      */
--slate:   oklch(0.23 0.050 310);  /* #1E1129  cartes        */
--glass:   color-mix(in oklch, var(--slate) 55%, transparent);

/* Accents — issus du rim light et des ombres */
--crimson: oklch(0.58 0.215 12);   /* #E4174C  rim light     */
--magenta: oklch(0.65 0.245 350);  /* #FF2E86  glow          */
--violet:  oklch(0.58 0.235 295);  /* #7A3BF0  ombres froides*/
--indigo:  oklch(0.48 0.220 285);  /* #4B2ED9  profondeur    */
--cyan:    oklch(0.80 0.140 195);  /* #1FD9E8  contrepoint   */

/* Texte */
--white:   oklch(0.97 0.005 320);  /* #F7F3F8 */
--dim:     oklch(0.72 0.020 315);  /* #ABA1B0 */
--faint:   oklch(0.55 0.025 315);  /* #7A6E80 */

/* Dégradé signature */
--aurora: linear-gradient(115deg,
  var(--crimson) 0%, var(--magenta) 28%,
  var(--violet) 62%, var(--indigo) 100%);
```

Couleurs déclarées en **OKLCH** avec repli hex : sur les écrans P3 (tout Mac, tout iPhone, la plupart des OLED récents) les néons sortent réellement du gamut sRGB. C'est visible à l'œil nu et c'est gratuit.

Contrastes vérifiés : `white`/`void` ≈ 16:1 · `dim`/`void` ≈ 7,4:1 · `cyan`/`void` ≈ 11:1 · `magenta` réservé aux surfaces et aux gros titres (jamais sous 24px).

### Typographie

| Rôle | Police | Pourquoi |
|---|---|---|
| Display | **Bricolage Grotesque** (variable, axes `opsz` + `wdth`) | Grotesque contemporaine à axes variables. Se resserre automatiquement en gros corps. Rien à voir avec Inter/Space Grotesk. |
| Corps / UI | **Instrument Sans** | Neutre moderne, excellente en FR et EN, très lisible en petit corps sur fond sombre. |
| Mono | **Geist Mono** | Chiffres, labels techniques, stack, terminal du chatbot. |

Toutes sur Google Fonts, self-hosted via `next/font` → zéro requête externe, zéro CLS.

Échelle fluide, avec `font-variation-settings` piloté par la taille :
```
display-xl : clamp(3.4rem, 10vw, 9rem)    Bricolage 800 · lh .88 · tracking -.035em
display-l  : clamp(2.6rem, 6vw, 5rem)     Bricolage 700 · lh .95
h2         : clamp(2rem, 4.2vw, 3.5rem)   Bricolage 700
h3         : 1.375rem                      Instrument 600
body-l     : 1.125rem / 1.65               Instrument 400
body       : 1rem / 1.7                    Instrument 400
label      : .75rem                        Geist Mono · uppercase · tracking .14em
```
`text-wrap: balance` sur les titres, `text-wrap: pretty` sur les paragraphes.

### Formes, verre, lumière
- Rayons : 16px (cartes), 999px (pilules, nav, chips), 12px (champs). **Assumé rond** — c'est le langage de tes références.
- Verre : `background: var(--glass)` + `backdrop-filter: blur(24px) saturate(1.6)` + bordure 1px `color-mix(in oklch, white 12%, transparent)`.
- Bordure lumineuse au survol : dégradé conique tournant en `@property --angle`, masqué en anneau de 1px. Vraie animation GPU, pas une image.
- Halos : `radial-gradient` très diffus derrière les blocs clés, jamais de `box-shadow` coloré (flou, coûteux, daté).
- Grain : overlay SVG `feTurbulence` à 3 % — casse le banding des dégradés sombres. Détail invisible, différence énorme.

### Espace & grille
Base 4px · rythme 16 / 24 / 32 / 48 / 64 / 96 / 160 · sections `clamp(6rem, 13vh, 12rem)`
Conteneur 1360px · gouttière `clamp(1.25rem, 4vw, 4rem)` · **grille bento** 12 colonnes avec `subgrid`
Breakpoints 375 / 768 / 1024 / 1440

---

## 2. Fonctionnalités modernes — ce qui date le site de 2026

Aucune de ces techniques n'existait ou n'était utilisable il y a deux ans. C'est ce qui sépare ton site des templates.

| Fonctionnalité | Usage sur le site | Pourquoi c'est moderne |
|---|---|---|
| **CSS scroll-driven animations** (`animation-timeline: view() / scroll()`) | Toutes les révélations au scroll, la barre de progression, le parallax | Tourne sur le compositeur, hors thread principal. Remplace ScrollTrigger. Zéro JS. |
| **View Transitions API** (`@view-transition`) | Navigation vers les études de cas : la carte se transforme en page | Transitions natives entre documents. Sensation d'app, site statique. |
| **`@property`** | Dégradés animés, anneaux lumineux au survol | Permet d'interpoler des custom properties. Impossible avant. |
| **OKLCH + `color-mix()`** | Toute la palette | Néons réellement en gamut P3. Dérivés calculés, pas codés en dur. |
| **Popover API + CSS Anchor Positioning** | Menu mobile, tooltips, sélecteur de langue | Zéro librairie de positionnement, zéro piège de focus à gérer. |
| **`:has()` + container queries + `subgrid`** | Grille bento qui s'adapte à son conteneur, pas au viewport | Composants vraiment autonomes. |
| **Speculation Rules API** | Préchargement des études de cas au survol | Navigation instantanée. |
| **`content-visibility: auto`** | Sections sous la ligne de flottaison | Le navigateur saute le rendu du hors-écran. |
| **`field-sizing: content`** | Zone de saisie du chatbot | Le champ grandit tout seul, sans JS. |
| **React 19 Server Actions + `useActionState`** | Formulaire de contact | Pas de route API, fonctionne sans JS, validation progressive. |
| **`useOptimistic`** | Chatbot | Le message de l'utilisateur s'affiche instantanément. |
| **Next.js 15 PPR + streaming** | Toutes les pages | Coque statique servie depuis le CDN, contenu dynamique en flux. |
| **WebGL fragment shader** | Maillage aurora + étalonnage duotone du hero | ~3 Ko, 60 fps, désactivé si `prefers-reduced-motion`. |
| **Vercel AI SDK v5 + Groq streaming** | Secours LLM du chatbot | Réponses en flux, token par token. |

Repli systématique : si le navigateur ne supporte pas les scroll-driven animations (Safari ancien), `@supports` bascule sur un `IntersectionObserver` minimal. Rien ne casse.

---

## 3. Wireframe section par section

### 00 · Navigation — pilule de verre flottante
Barre flottante centrée, `backdrop-filter`, détachée du haut de 20px. Logo à gauche, liens au centre, `FR|EN` + CTA cramoisi à droite. Se rétracte au scroll vers le bas, réapparaît au scroll vers le haut. Mobile : Popover API plein écran.

### 01 · Hero — vidéo scrubée + aurore

```
┌────────────────────────────────────────────────────────────┐
│  ░░ maillage aurora animé en fond ░░                       │
│                                                            │
│  ╭──── pilule glass nav ────╮                              │
│                                                            │
│  ● Disponible                     ┌──────────────────┐     │
│                                   │                  │     │
│  JE CONÇOIS ET                    │   VIDÉO SCRUBÉE  │     │
│  JE CONSTRUIS LES                 │   étalonnage     │     │
│  SYSTÈMES ▸ QUI FONT              │   duotone shader │     │
│  TOURNER VOTRE                    │   masque radial  │     │
│  ENTREPRISE                       │                  │     │
│    ↑ dégradé aurora sur           └──────────────────┘     │
│      « SYSTÈMES »                                          │
│                                                            │
│  Pipelines de données, automatisation IA, dashboards,      │
│  sites et applications — de bout en bout, par une seule    │
│  personne qui livre.                                       │
│                                                            │
│  ╭ Démarrer un projet ╮  ╭ Voir mon travail ╮              │
│                                                            │
│  ★ 5.0 · Top Rated Upwork · 100% Job Success · UE          │
└────────────────────────────────────────────────────────────┘
```

**Mécanique :** 154 frames extraites en AVIF (~1400px), peintes sur `<canvas>` via WebGL. Le fragment shader applique l'étalonnage duotone cramoisi→violet et un léger déplacement chromatique sur les bords. La progression du scroll pilote l'index de frame. Budget : **< 2,2 Mo**, première frame en `<img fetchpriority="high">` pour le LCP.

Mobile / `prefers-reduced-motion` / connexion lente : frame unique, aurore figée, aucun WebGL. Économie ~2 Mo.

Le mot **SYSTÈMES** porte le dégradé aurora animé (`background-clip: text` + `@property`).

### 02 · Bandeau de preuve — bento 4 cases en verre
`64 602` fiches nettoyées pour 5,51 $ · `253 000` alt-texts · `4 jours` pipeline B2B livré · `270` sites enrichis.
Compteurs animés à l'entrée. Halo aurora derrière chaque chiffre.

> Je remplace « 47+ workflows / 12k heures / 98% rétention » du site actuel. Ces chiffres ne tiennent pas si un prospect creuse. Les quatre ci-dessus viennent de tes vrais projets. **À confirmer.**

### 03 · Ce que je construis — grille bento asymétrique
8 domaines. Pas 8 cartes identiques : une grande case (2×2, ton domaine phare), deux moyennes, cinq petites. C'est ce qui distingue une bento grid d'un tableau.
Cartes en verre, icônes SVG animées (stroke 1.5px, **aucun emoji**), spotlight qui suit le curseur, anneau conique lumineux au survol. Chaque case mène à une étude de cas.

### 04 · Études de cas — 4 en profondeur + 5 compactes
Colonne gauche sticky (numéro, client, durée) · contenu qui défile à droite.
**Problème → Architecture → Stack → Résultat.**
Les schémas d'architecture se **dessinent au scroll** (`stroke-dashoffset` piloté par `animation-timeline: view()`), les nœuds s'allument un à un en cramoisi.
Clic sur une carte → **View Transition** : la carte se transforme en page d'étude de cas.

Approfondies : LVI Control Center · Pipeline AfricArt · Bastide Confort Médical · TalentScout AI
Compactes : Moon Mobility · B&C Enterprise · FlowAudit AI · LeadScout AI · DarkosClaw

Visuels : emplacements réservés à ratio figé (zéro CLS). Schémas SVG que je dessine en attendant tes captures anonymisées.

### 05 · Comment je travaille
5 étapes, ligne verticale qui se remplit en aurora indexée sur la progression de scroll (`animation-timeline: scroll()`).
Signal/brief → Architecture → Build → Livraison → Maintenance.

### 06 · Stack technique
6 groupes en marquee horizontal alterné, arrêt au survol **et au focus clavier**. Logos SVG monochromes, colorés au survol.

### 07 · À propos
Layout asymétrique. Ta photo en duotone cramoisi/violet, cohérente avec le hero.
**Boucle vidéo parallax** en fond (2ᵉ usage, ~600 Ko WebM, `animation-timeline: scroll()`).
Solo · UE · interlocuteur unique · disponibilité. **Aucun tarif affiché.**

### 08 · Avis vérifiés
3 cartes verre, statiques (pas de carrousel — ça tue la lecture donc la conversion). Tes 3 avis en intégral, badge `★ 5.0`, lien vers l'avis public réel.

### 09 · Contact — formulaire + chatbot
Deux colonnes en verre.
**Gauche :** nom · email · entreprise · type de projet (chips) · besoin. Server Action React 19, validation à la sortie de champ, erreur sous le champ, `aria-live`, honeypot.
**Droite :** le chatbot, présenté comme une démo vivante de ton savoir-faire. Terminal en verre, réponses en flux.

> **Budget :** tu as dit « aucun budget » — j'ai retiré tout affichage de tarif du site. J'ai **gardé** le champ fourchette de budget dans le formulaire (tu l'avais demandé dans le brief initial, et il qualifie les leads sans rien exposer publiquement). Dis-moi si tu veux aussi le supprimer.

### 10 · Footer
Identité · navigation · contact (WhatsApp `+33 6 79 63 49 96`, LinkedIn, Upwork, Malt, email). Filet aurora 1px en haut.

---

## 4. Animations

| Élément | Technique | Détail |
|---|---|---|
| Fond aurora | Fragment shader WebGL | Bruit fBm lent, teinté vidéo, 60 fps |
| Hero vidéo | Canvas WebGL + scroll | 154 frames, duotone, scrub |
| Titre hero | Scroll-driven, par mot | Stagger 60ms, `clip-path` + `translateY` |
| Titres de section | `animation-timeline: view()` | Masque + montée, `entry 0% cover 40%` |
| Cartes bento | `view()` + stagger | 45ms entre cartes |
| Survol carte | `@property --angle` | Anneau conique tournant, 1px |
| Spotlight curseur | `radial-gradient` + pointer | Suit le curseur dans la carte |
| Schémas archi | `stroke-dashoffset` + `view()` | Tracé indexé sur le scroll |
| Chiffres | Count-up, une fois | `expo.out`, 1400ms |
| Process | `animation-timeline: scroll()` | Remplissage de ligne |
| Navigation | View Transitions API | Morph carte → page |
| Boutons | `scale(.97)` au press | 140ms |
| Scroll global | Lenis | `lerp: .085` |

`prefers-reduced-motion: reduce` → WebGL coupé, aurore figée, scrub coupé, tout devient un fondu de 120ms. Rien d'inaccessible.
Uniquement `transform` / `opacity` / propriétés composables. Jamais `width`, `height`, `top`, `left`.

---

## 5. Architecture technique

**Stack :** Next.js 15 (App Router, PPR) · React 19 · TypeScript strict · Tailwind v4 · Lenis · Vercel AI SDK v5 · Supabase · Resend · Groq · déploiement Vercel.

**Routes :** `/fr` `/en` · `/fr/travaux/[slug]` `/en/work/[slug]` · `/fr/services` `/en/services` · `/fr/mentions-legales` `/en/legal` · `/api/chat` · Server Action pour le contact.
`/fr` par défaut, `hreflang`, sitemap bilingue.

### Base de données — Supabase `boebkjuohvrgjeylluhx`

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null check (source in ('form','chat')),
  locale text not null default 'fr',
  name text not null,
  email text not null,
  company text,
  project_type text,
  budget_range text,
  message text,
  status text not null default 'new',
  email_sent boolean not null default false,
  email_error text,
  referrer text,
  utm jsonb,
  ip_hash text,          -- SHA-256 salé, jamais l'IP en clair (RGPD)
  user_agent text
);
create index on public.leads (created_at desc);

create table public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  locale text not null default 'fr',
  lead_id uuid references public.leads(id) on delete set null,
  step text not null default 'greeting',
  completed boolean not null default false,
  llm_calls int not null default 0,
  referrer text, utm jsonb
);

create table public.chat_messages (
  id bigserial primary key,
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  created_at timestamptz not null default now(),
  role text not null check (role in ('bot','user','llm')),
  step_key text,
  content text not null
);
create index on public.chat_messages (session_id, created_at);

alter table public.leads         enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
-- Aucune policy anon. Tout passe par le serveur avec la service_role key.
```

Livré en migration SQL à coller dans l'éditeur Supabase (ton projet n'est pas sur le compte relié à mes outils). Vérification ensuite via le dashboard.

### Chatbot
Flux scripté `greeting → name → email → project_type → budget → need → confirm`.
Chaque tour persisté immédiatement → **un abandon laisse quand même un lead partiel**. Un formulaire classique en aurait laissé zéro.
Secours LLM si l'utilisateur pose une question : **`openai/gpt-oss-20b`** sur Groq (~1000 t/s, 0,075 $/1M tokens en entrée — tier production, vérifié dans la doc Groq le 27/07/2026), repli `llama-3.1-8b-instant`. Plafond 5 appels par session. Base de connaissance courte. Interdictions dures : jamais de prix, jamais de délai promis, toujours ramener au formulaire.
Anti-abus : honeypot, contrôle de timing, throttle par hash d'IP.

### Formulaire + Resend
```
Server Action
  ├─ validation zod (+ honeypot, + timing)
  ├─ INSERT leads (email_sent=false)      ← la donnée est sauvée AVANT l'email
  ├─ Resend #1 → oussama.abassi.work@gmail.com   (reply-to = visiteur)
  ├─ Resend #2 → accusé de réception au visiteur (FR ou EN)
  └─ UPDATE email_sent=true  |  email_error
```
Si Resend tombe, le lead est déjà en base. Aucune perte possible.
Templates React Email aux couleurs du site.

### Variables d'environnement (injectées dans Vercel, jamais dans le chat)
```
NEXT_PUBLIC_SITE_URL · SUPABASE_URL · SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY · RESEND_FROM · CONTACT_TO_EMAIL · GROQ_API_KEY · IP_HASH_SALT
```

---

## 6. Performance, accessibilité, SEO

**Budgets :** LCP < 2,0 s · CLS < 0,05 · INP < 200 ms · JS initial < 150 Ko gzip.
Les scroll-driven animations natives ne coûtent presque rien en JS — c'est le principal gain face à un site à base de GSAP partout.

**Accessibilité (viser 100) :** contrastes tous > AA · focus visible 2px aurora, jamais supprimé · navigation clavier complète · skip-link · hiérarchie h1→h6 stricte · `prefers-reduced-motion` intégral · cibles ≥ 44px · animations interruptibles · labels visibles partout · `backdrop-filter` toujours doublé d'une couleur de repli opaque.

**SEO :** métadonnées par locale · `hreflang` fr/en/x-default · sitemap · JSON-LD `Person` + `ProfessionalService` + `Review` ×3 · OG images `@vercel/og` par étude de cas.

---

## 7. Ordre de construction (Étape 4)

| # | Livrable |
|---|---|
| 4.1 | Setup, tokens OKLCH, polices variables, i18n, grille bento, shader aurora |
| 4.2 | Nav verre + Hero + pipeline vidéo WebGL scrubée |
| 4.3 | Bandeau bento + grille des 8 domaines |
| 4.4 | Études de cas + schémas SVG + View Transitions |
| 4.5 | Process + Stack |
| 4.6 | À propos (parallax vidéo) + Avis |
| 4.7 | Contact : formulaire Server Action + chatbot |
| 4.8 | Footer + pages légales + SEO |

Puis Étape 5 (BDD), 6 (Resend), 7 (Vercel), 8 (revue).

---

## 8. À valider

1. **La direction** — aurore néon dérivée de ta vidéo (cramoisi → magenta → violet), verre, bento, scroll natif. Oui ?
2. **Les chiffres du bandeau** — je remplace les stats invérifiables par tes 4 chiffres réels ?
3. **Le champ budget dans le formulaire** — gardé (privé, qualifie les leads) ou supprimé lui aussi ?
