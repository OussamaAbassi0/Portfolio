# Compte rendu — Lot 7 : domaine, favicon, SEO

Date : 29 juillet 2026
Statut : **livré, build validé, poussé**

---

## 1. Domaine branché

`oussamaabassi.com` et `www.oussamaabassi.com` sont rattachés au projet Vercel `oussama-abassi-portfolio`, tous deux en **Valid Configuration**.

Les enregistrements DNS pointaient déjà vers Vercel depuis ton ancien site, la bascule a donc été immédiate. J'ai vérifié au passage que l'ancien projet `oussama-dev` n'avait effectivement plus aucun domaine — tu l'avais bien détaché.

### Une adresse unique, pas deux

Avec et sans `www`, ce sont techniquement deux sites différents pour Google. S'ils affichent le même contenu, la popularité se répartit entre les deux au lieu de se concentrer, et aucune des deux ne monte.

J'ai retenu **`oussamaabassi.com` sans www** comme adresse de référence, parce que c'est celle que Google a déjà indexée pour ton ancien site : on conserve l'ancienneté acquise au lieu de repartir de zéro.

La redirection `www` → sans www est écrite dans `next.config.ts` en **308 permanent**. Je l'avais d'abord tentée dans l'interface Vercel, qui s'est révélée capricieuse — un mauvais enregistrement s'y est glissé, je l'ai retiré. Dans le code, c'est versionné, relu, et ça ne dépend plus d'un clic au bon endroit.

### Anciennes URL préservées

`/services`, `/work` et `/about` de la v1 sont déjà connues de Google. Elles renvoient maintenant en 301 vers l'accueil au lieu de tomber en 404 — une erreur 404 sur une page indexée, c'est du référencement jeté.

---

## 2. Ton visage dans l'onglet du navigateur

Comme sur la capture eWay-CRM que tu m'as envoyée.

J'ai découpé ta tête depuis la photo de la section À propos, appliqué un masque circulaire dessiné en haute résolution puis réduit — un cercle tracé directement en petit format donne des bords en escalier. Un anneau magenta fin borde l'icône aux grandes tailles seulement : en dessous de 128 px il mangerait le visage.

| Fichier | Usage |
|---|---|
| `favicon.ico` | onglet du navigateur, 16 / 32 / 48 px |
| `icon.png` (512) | onglets modernes, résultats Google |
| `apple-icon.png` (180) | écran d'accueil iPhone |
| `og-image.png` (1200×630) | aperçu LinkedIn, WhatsApp, Slack |
| `photo-oussama.png` | donnée structurée, manifest |

L'image de partage social a été composée aux couleurs du site : fond noir violacé, halos cramoisi et violet, ta photo en médaillon. C'est ce qui s'affichera quand quelqu'un partagera ton lien.

---

## 3. SEO — ce qui a été fait

### Les titres, d'abord

Le titre est ce que Google affiche en bleu dans ses résultats, et c'est le premier facteur sur lequel on peut agir.

**Avant** : « Oussama Abassi — Je conçois et je construis les systèmes qui font tourner votre entreprise »
Joli, mais personne ne tape ça dans Google.

**Après** : « Freelance automatisation IA & data — n8n, scraping, dashboards | Oussama Abassi »
Contient les termes réellement recherchés, et reste sous la limite avant troncature.

La description reprend les preuves — Top Rated Upwork, 5,0 sur Malt, réponse sous 24 h — parce qu'elle décide du clic une fois que tu es affiché.

### Données structurées

Google ne lit pas une page comme un humain. Les données structurées lui disent explicitement de quoi il s'agit.

| Type | Effet visé |
|---|---|
| `Person` | tes compétences déclarées (n8n, scraping, LLM, Next.js…), ta ville, tes profils publics |
| `ProfessionalService` + `OfferCatalog` | tes 8 prestations listées une par une |
| `AggregateRating` + `Review` ×5 | les **étoiles** dans les résultats de recherche |
| `FAQPage` | tes questions peuvent apparaître dépliées sous ton lien |
| `BreadcrumbList` | « oussamaabassi.com › Travaux › Nom du projet » au lieu d'une URL brute |
| `Article` | chaque étude de cas devient un contenu identifiable |
| `WebSite` | rattache tout à une entité unique |

### Le reste

- **Sitemap** hiérarchisé : les 4 projets approfondis en priorité 0,9, les fiches compactes 0,7, l'accueil 1,0
- **hreflang** FR / EN / x-default sur toutes les pages, canoniques propres
- **Open Graph et Twitter Card** complets, avec image dédiée par étude de cas
- **Directives Googlebot** : extrait long et grande image autorisés dans les résultats
- **Manifest** pour l'installation sur mobile
- **En-têtes de sécurité** : HSTS, nosniff, Referrer-Policy, Permissions-Policy — Google en tient compte, et un audit client les regarde
- **Cache immuable** sur les images de projets et du hero

---

## 4. Sur « être classé premier »

Je préfère être direct plutôt que te laisser attendre quelque chose qui n'arrivera pas.

**Ce que le travail ci-dessus garantit** : ton site est techniquement irréprochable. Rapide, structuré, compréhensible par Google, avec des étoiles et une FAQ qui peuvent apparaître dans les résultats. C'est la condition d'entrée — sans ça, rien n'est possible. Mais ça ne suffit pas à classer premier.

**Ce qui décide vraiment du classement** : la notoriété du domaine, c'est-à-dire le nombre et la qualité des sites qui pointent vers le tien, et l'ancienneté. Un site neuf ne bat pas un site établi depuis cinq ans sur une requête concurrentielle, quelle que soit sa qualité technique.

**Ce sur quoi tu peux être premier rapidement** : ton nom. « Oussama Abassi freelance », « Oussama Abassi automatisation » — là, aucune concurrence, tu devrais monter en quelques semaines.

**Les requêtes très concurrentielles** — « freelance automatisation », « expert n8n » — demandent des mois et surtout des liens entrants.

### Les cinq actions qui feront réellement bouger les choses

1. **Google Search Console** — déclare le site, envoie le sitemap. Sans ça, Google mettra des semaines à te découvrir. Gratuit, dix minutes.
2. **Des liens depuis tes profils** — mets `oussamaabassi.com` sur Malt, Upwork, LinkedIn, GitHub. Ce sont des sites très établis : un lien depuis eux vaut beaucoup.
3. **Écris.** Une étude de cas publique par mois, sur un problème précis que tu as résolu. C'est ce qui te positionne sur les recherches longues du type « automatiser envoi SMS anniversaire n8n » — moins de volume, mais des gens qui cherchent exactement ce que tu vends.
4. **Google Business Profile** — si tu acceptes une visibilité locale, tu apparais sur « freelance automatisation Paris » avec une fiche, ce qui est bien plus rapide qu'un référencement classique.
5. **Demande un lien à tes clients satisfaits.** Un lien depuis le site d'un client vaut plus que dix heures d'optimisation technique.

Je peux t'accompagner sur les points 1, 3 et 4 si tu veux.

---

## 5. Reste à faire

1. Créer la clé Resend, régénérer la clé Supabase, remplir les variables Vercel
2. Attendre la vérification du domaine Resend (en cours)
3. Tester le formulaire et le chatbot de bout en bout
4. Revue finale : responsive mobile, Lighthouse, accessibilité
5. Déclarer le site dans Google Search Console
