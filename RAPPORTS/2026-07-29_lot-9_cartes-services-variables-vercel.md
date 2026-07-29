# Compte rendu — Lot 9 : cartes services, favicon, variables Vercel

Date : 29 juillet 2026

---

## 1. Les 8 cartes de services ne sont plus cliquables — FAIT

### Le problème que tu as vu

Chaque carte se terminait par « Lire l'étude de cas » et menait vers un projet. Un visiteur qui clique sur **E-commerce** atterrissait sur le projet de place de marché d'art. Le lien ne répondait pas à la question posée par la carte, et rien n'annonçait où il allait.

### Ce que j'ai fait

Le lien est supprimé. La carte n'est plus cliquable du tout. À la place, chaque carte dit elle-même **comment le travail est fait** — c'est l'information qu'un visiteur cherche à ce moment-là.

| Service | Ce qui est écrit maintenant (résumé) |
|---|---|
| Data & pipelines | API si elle existe, navigateur piloté sinon ; file d'attente, reprise après échec, déduplication par empreinte |
| Automatisation IA | n8n pour l'orchestration, modèle appelé en sortie structurée et non en texte libre ; chaque échec rejouable |
| Dashboards | agrégats calculés en base et non dans le navigateur ; droits au niveau base ; rafraîchissement sans rechargement |
| Développement web | Next.js 16, composants serveur, polices et images servies depuis le domaine ; Core Web Vitals mesurés avant mise en ligne |
| Applications | une base de code pour iOS, Android, desktop ; hors-ligne avec file de synchronisation |
| Chatbots | script déterministe d'abord, modèle en secours ; streaming ; jamais de prix ni de délai inventé |
| E-commerce | paiement délégué à un prestataire certifié, aucune donnée bancaire chez le client ; stock par webhooks ; fiches rendues côté serveur |
| Design | système de tokens plutôt que maquettes isolées ; contrastes vérifiés ; animations coupées si refusées |

Chaque texte décrit une pratique réellement appliquée — plusieurs sont visibles dans ce site même. Rien d'inventé.

Détail de mise en page : le trait de séparation est calé en bas de carte, donc aligné d'une carte à l'autre quelle que soit la longueur du texte au-dessus.

Les projets restent accessibles par la section **Projets**, plus bas, où le lien est explicite.

---

## 2. « Je ne vois pas le logo dans l'onglet »

Le favicon **est bien en ligne**. Le déploiement qui le contient est passé en production (commit « Favicon logo oa… », état READY).

Ce que tu vois est un cache. Les navigateurs gardent le favicon beaucoup plus longtemps que le reste d'une page — parfois plusieurs jours — et un rechargement normal ne le renouvelle pas.

Pour le forcer :

1. Ouvre directement **`https://oussamaabassi.com/favicon.ico`** — si le logo « oa. » s'affiche, le fichier est bon et il ne reste que le cache.
2. Puis `Ctrl` + `Maj` + `R` sur le site, ou ouvre-le dans une fenêtre de navigation privée.

En navigation privée, le résultat est immédiat et sans ambiguïté : c'est le test à faire en premier.

---

## 3. Variables d'environnement Vercel

À coller dans **Vercel → Projet → Settings → Environment Variables**, en cochant les trois environnements (Production, Preview, Development).

| Nom | Valeur |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://oussamaabassi.com` |
| `SUPABASE_URL` | `https://boebkjuohvrgjeylluhx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | ta clé `service_role` Supabase |
| `RESEND_API_KEY` | ta clé Resend |
| `RESEND_FROM` | `Oussama Abassi <onboarding@resend.dev>` |
| `CONTACT_TO_EMAIL` | `oussama.abassi.work@gmail.com` |
| `IP_HASH_SALT` | une longue chaîne aléatoire, choisie une fois et jamais changée |
| `GROQ_API_KEY` | ta clé Groq — facultative |

### Points à connaître

- **`RESEND_FROM`** : garde `onboarding@resend.dev` tant que le domaine n'est pas vérifié chez Resend. Dès qu'il l'est, remplace par `Oussama Abassi <contact@oussamaabassi.com>` — les emails partiront de ton domaine et arriveront beaucoup mieux.
- **`IP_HASH_SALT`** : sert à hacher les adresses IP des visiteurs. L'IP n'est jamais stockée en clair, seule son empreinte l'est. Si tu changes cette valeur plus tard, les anciennes empreintes deviennent incomparables aux nouvelles — donc on la fixe une fois.
- **`GROQ_API_KEY`** : sans elle, le chatbot fonctionne quand même. Il suit son script de qualification et enregistre les leads ; il perd seulement la capacité à répondre aux questions hors script.
- **Après avoir ajouté les variables, il faut redéployer.** Vercel ne les applique pas au déploiement déjà en ligne : Deployments → le plus récent → `…` → **Redeploy**.

### Les deux clés à régénérer d'abord

La clé `service_role` Supabase et la clé Resend sont passées en clair dans notre conversation. Régénère-les avant de les coller, et colle les nouvelles :

- Supabase → Settings → API → *Reset* la clé `service_role`
- Resend → API Keys → supprimer l'ancienne, en créer une nouvelle

Même chose pour les deux jetons GitHub échangés plus tôt : GitHub → Settings → Developer settings → Personal access tokens → *Revoke*.

---

## 4. État général

| Élément | État |
|---|---|
| Site en ligne sur oussamaabassi.com | fait |
| Favicon « oa. » | fait, en ligne — cache navigateur à vider |
| Cartes services non cliquables, avec le « comment » | fait |
| SEO technique, données structurées | fait |
| Message d'erreur du formulaire honnête | fait |
| Domaine Resend | en attente de propagation |
| Search Console | TXT collé par toi — validation à confirmer |
| Variables Vercel | à coller (liste ci-dessus) |
| Test bout en bout formulaire + chatbot | après les variables |
| Revue mobile, performance, accessibilité | à faire |
