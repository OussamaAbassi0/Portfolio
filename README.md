# oussamaabassi.com — v2

Portfolio bilingue FR/EN. Next.js 16 · React 19 · Tailwind v4 · Supabase · Resend · Groq.

---

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs
npm run dev                  # http://localhost:3000 → redirige vers /fr
```

## Variables d'environnement

| Variable | Rôle | Obligatoire |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique, utilisée par le sitemap et les métadonnées | oui |
| `SUPABASE_URL` | `https://boebkjuohvrgjeylluhx.supabase.co` | pour la persistance |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service_role — **serveur uniquement** | pour la persistance |
| `RESEND_API_KEY` | Envoi des emails | pour les emails |
| `RESEND_FROM` | Expéditeur, ex. `Oussama Abassi <contact@domaine-verifie.com>` | pour les emails |
| `CONTACT_TO_EMAIL` | Destinataire des notifications | pour les emails |
| `GROQ_API_KEY` | Secours conversationnel du chatbot | facultatif |
| `IP_HASH_SALT` | Sel du hachage d'IP (RGPD) — chaîne aléatoire longue | recommandé |

Le site fonctionne sans aucune de ces clés : le formulaire et le chatbot dégradent proprement.
Avec Supabase mais sans Resend, les leads sont quand même enregistrés.

## Base de données

Exécuter `supabase/migrations/0001_leads_and_chat.sql` dans l'éditeur SQL du projet Supabase.
Le script est idempotent. Il crée `leads`, `chat_sessions`, `chat_messages`, active RLS sans
aucune policy publique, et ajoute la vue `leads_inbox` pour consulter les demandes.

## Structure

```
src/
  app/
    [locale]/            accueil, études de cas, mentions légales
    api/chat/step        parcours de qualification scripté
    api/chat/ask         secours LLM en flux (Groq)
    actions.ts           Server Action du formulaire de contact
    globals.css          tokens OKLCH, verre, animations scroll natives
  components/            sections et primitives
  content/               tout le texte du site, FR et EN
  lib/                   Supabase, Resend, validation, capture des leads
public/
  hero/                  77 images du scrub vidéo (2,2 Mo)
  media/                 poster + boucle parallax
supabase/migrations/     schéma SQL
```

## Régénérer les images du hero

Depuis la vidéo source :

```bash
ffmpeg -i source.mp4 \
  -vf "select='not(mod(n\,2))',crop=810:1080:620:0,scale=660:-2" \
  -c:v libwebp -q:v 60 -preset picture -an -vsync 0 \
  public/hero/f_%03d.webp
```

Si le nombre d'images change, ajuster `FRAME_COUNT` dans `src/components/HeroVideo.tsx`.

## Choix techniques

- **Animations au scroll natives** (`animation-timeline: view()`) plutôt qu'une librairie JS :
  elles tournent sur le compositeur, hors thread principal. Repli `IntersectionObserver`
  sur les navigateurs qui ne les supportent pas encore.
- **Couleurs en OKLCH** : gamut P3 sur les écrans compatibles, dérivées calculées via `color-mix()`.
  Palette extraite par échantillonnage de la vidéo (13 frames, clustering HSV).
- **La donnée est écrite avant l'email.** Si Resend tombe, le lead existe quand même.
- **Le chatbot persiste chaque tour.** Un abandon en cours de parcours laisse un lead partiel ;
  un formulaire classique n'aurait rien laissé.
- **Plafond de 5 appels LLM par session** : coût borné par visiteur.
- **`prefers-reduced-motion` respecté partout** : scrub, parallax, marquee et révélations coupés.
