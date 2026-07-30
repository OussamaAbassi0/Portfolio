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
| `RESEND_FROM` | `Oussama Abassi <contact@oussamaabassi.com>` |
| `CONTACT_TO_EMAIL` | `oussama.abassi.work@gmail.com` |
| `IP_HASH_SALT` | `kjVEHfve3sLVS3iegs4-Wkxb39Ytin_z97RLsBb_7mc` |
| `GROQ_API_KEY` | ta clé Groq — facultative |

### Points à connaître

- **`RESEND_FROM`** : le domaine `oussamaabassi.com` est **vérifié** chez Resend (constaté le 29/07/2026, région Irlande). Les emails peuvent donc partir de `contact@oussamaabassi.com` — pas besoin de créer cette boîte, elle sert uniquement d'expéditeur. Les réponses arrivent quand même sur ton Gmail, puisque `CONTACT_TO_EMAIL` est le destinataire.
- **`IP_HASH_SALT`** : un mot de passe interne qui sert à brouiller les adresses IP des visiteurs. Le site a besoin de reconnaître une IP pour limiter le spam, mais il ne stocke jamais l'IP elle-même : il stocke `hash(IP + ce mot)`. Sans ce mot, l'empreinte est irréversible — même moi, avec un accès à la base, je ne peux pas remonter à l'adresse. C'est pour ça qu'il doit être long et aléatoire, et fixé une fois pour toutes : le changer rendrait les anciennes empreintes incomparables aux nouvelles.
- **`GROQ_API_KEY`** : sans elle, le chatbot fonctionne quand même. Il suit son script de qualification et enregistre les leads ; il perd seulement la capacité à répondre aux questions hors script.
- **Après avoir ajouté les variables, il faut redéployer.** Vercel ne les applique pas au déploiement déjà en ligne : Deployments → le plus récent → `…` → **Redeploy**.

### Les deux clés à régénérer d'abord

La clé `service_role` Supabase et la clé Resend sont passées en clair dans notre conversation. Régénère-les avant de les coller, et colle les nouvelles :

- Supabase → Settings → API → *Reset* la clé `service_role`
- Resend → API Keys → supprimer l'ancienne, en créer une nouvelle

Même chose pour les deux jetons GitHub échangés plus tôt : GitHub → Settings → Developer settings → Personal access tokens → *Revoke*.

---

## 3 bis. Ce que le test a révélé — les variables étaient sur le mauvais périmètre

Premier essai du formulaire en production : « L'envoi n'a pas fonctionné ». Les journaux du serveur donnent la raison exacte :

```
[leads] notification échouée: resend_not_configured
```

Et aucune trace d'écriture en base — donc Supabase n'était pas joignable non plus.

### La cause

Les huit variables existaient bien sur Vercel, mais toutes étaient rattachées au seul environnement **Development**. C'est l'environnement de la machine du développeur, pas celui du site en ligne. Le site en production ne voyait donc **aucune** de ces variables.

C'est un piège classique de l'interface Vercel : quand on ajoute une variable, le périmètre proposé n'est pas toujours « tous les environnements », et rien ne signale ensuite que la production est laissée de côté.

### Correction

Chaque variable est passée en **All Environments** (Production + Preview + Development) :

`SUPABASE_URL` · `SUPABASE_SERVICE_ROLE_KEY` · `RESEND_API_KEY` · `RESEND_FROM` · `CONTACT_TO_EMAIL` · `IP_HASH_SALT` · `GROQ_API_KEY`

J'ai aussi ajouté **`NEXT_PUBLIC_SITE_URL` = `https://oussamaabassi.com`**, qui manquait. Elle sert aux URL canoniques et aux images de partage : sans elle, les métadonnées pointaient vers l'adresse `.vercel.app` au lieu de ton domaine.

`OWNER_EMAIL` est laissée telle quelle : elle n'est pas utilisée par le code, c'est un reste. Tu peux la supprimer.

Puis redéploiement en production — les variables ne s'appliquent jamais à un déploiement déjà construit.

### Resend

Le domaine est **vérifié** (constaté le 29/07, région Irlande). `RESEND_FROM` est donc réglé sur `contact@oussamaabassi.com`.

---

## 3 ter. Google Search Console — validé

La propriété n'était **pas** validée : Google répondait « vous n'avez pas accès à cette propriété ». L'enregistrement TXT que tu as collé chez Hostinger est bien en place — vérifié par requête DNS directe :

```
oussamaabassi.com  TXT  google-site-verification=_SJ8F5WYV3xmExlDvyWHCylsc_-sATfoB8dkAWkvmWc
```

Il ne manquait que l'étape de validation côté Google, restée en suspens. Refaite :

- Propriété **Domaine** `oussamaabassi.com` — **validée**, méthode « fournisseur de nom de domaine »
- Sitemap `https://oussamaabassi.com/sitemap.xml` renvoyé le 30/07 pour forcer une nouvelle lecture (il y avait une lecture datant du 20 juillet, sur l'ancien site)

Ne supprime pas cet enregistrement TXT : Google revérifie régulièrement, et sa disparition ferait perdre la validation.

---

## 4. État général

| Élément | État |
|---|---|
| Site en ligne sur oussamaabassi.com | fait |
| Favicon « oa. » | fait, en ligne — cache navigateur à vider |
| Cartes services non cliquables, avec le « comment » | fait |
| SEO technique, données structurées | fait |
| Message d'erreur du formulaire honnête | fait |
| Domaine Resend | **vérifié** — envoi depuis contact@oussamaabassi.com |
| Search Console | **validé**, sitemap renvoyé |
| Variables Vercel | **corrigées** — toutes en Production, + NEXT_PUBLIC_SITE_URL ajoutée, redéployé |
| Test bout en bout formulaire + chatbot | à finir (outil navigateur momentanément indisponible de mon côté) |
| Revue mobile, performance, accessibilité | à faire |
