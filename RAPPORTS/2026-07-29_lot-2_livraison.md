# Compte rendu — Lot 2 : livraison

Date : 29 juillet 2026
Statut : **livré, build validé, poussé sur GitHub**

---

## 1. Sauvegardes en place

| Sauvegarde | Comment y revenir |
|---|---|
| Tag git `backup-v1-avant-refonte` | `git checkout backup-v1-avant-refonte` |
| Branche `backup/v1-avant-refonte` | `git checkout backup/v1-avant-refonte` |
| Copie fichiers `Downloads\Oussamadev\_BACKUP_v1_src` | copier par-dessus `src` |
| Historique GitHub | chaque commit est un point de retour |

---

## 2. Confidentialité — projet place de marché d'art

Supprimé du site : le nom du client, les quatre maisons de vente, et toute mention permettant de les identifier.
L'étude de cas parle désormais de « plusieurs sources externes », « sources protégées », « protections anti-robot de niveau entreprise ».

Une ligne a été ajoutée dans l'étude elle-même : « Aucune source n'est nommée publiquement, par respect du cadre contractuel ». Un prospect qui lit ça y voit un signal de sérieux, pas un manque.

---

## 3. Études de cas réécrites à partir de Malt

Le contenu de la v1 était une paraphrase de ton brief. Il vient maintenant de ton profil Malt, avec le niveau de détail qui distingue une étude de cas d'une description.

**10 projets**, structurés en deux niveaux : fiche courte sur la landing, étude complète sur sa page dédiée.

Ajouts issus de Malt qui n'existaient nulle part sur le site :

- le **marqueur d'idempotence** qui empêche de repayer les lignes déjà traitées
- les **8 formats d'image par œuvre** (AVIF + WebP, 400/800/1200/vignette/original) avec nommage SEO dynamique
- les **11 301 biographies** réécrites en cinq langues
- le run nocturne à **2 h UTC** pour ne pas concurrencer le trafic réel
- la correction du bug de préfixe de taxonomie
- la livraison GitHub avec README, runbook, schéma DB et **6 bugs corrigés avant push**
- pour Bastide : le CRM Universal, les deux workflows distincts (import manuel + cron autonome)

---

## 4. Nouveau projet — Executive Control Center

Étude complète, en tête de la section travaux. Cinq sections détaillées rédigées à partir de ce que tu m'as donné :

1. **La contrainte de sécurité tenue à la lettre** — accès bancaire strictement en lecture, clés côté serveur, aucune route d'écriture dans le code. L'argument est formulé ainsi : l'absence de la fonctionnalité est la garantie, pas une case décochée.
2. **Zéro dépendance ajoutée** — les trois refus avec leur justification technique (export PDF natif, CSS au lieu de Framer Motion, design system maison au lieu de Tremor incompatible React 19).
3. **Le mode clair structurellement incassable** — variables CSS par thème, audit de contraste sur 233 éléments, WCAG AA.
4. **Des erreurs qui se voient** — le dirigeant voyait 0 € pendant une panne réseau et pouvait décider dessus. C'est l'exemple le plus fort du lot.
5. **Deux assistants IA sous contrainte métier** — la séquence de réflexion en cinq étapes, et l'interdiction de reconnaître une responsabilité avant analyse technique.

Chiffres affichés : 6 modules · 8 tables avec RLS · 233 éléments audités · 0 dépendance ajoutée.
Avis de Maxime rattaché à l'étude.

---

## 5. Captures — 16 traitées et anonymisées

Vérification faite image par image avant traitement.

| Constat | Action |
|---|---|
| `LVI CONTROL CENTER 1` affichait « LED Visual Innovation » et 12 755 leads | Nom remplacé par « OUSSAMA ABASSI », chiffre remplacé par 12 000 |
| `LVI CONTROL CENTER 2 à 4` affichaient déjà « OUSSAMA ABASSI », contacts masqués | Aucune retouche nécessaire |
| `LVI CONTROL CENTER 5 à 7` sont des canevas n8n sans donnée | Aucune retouche nécessaire |
| `LVIF GROUP CENTER 1 à 3` déjà anonymisées (ABASSI Group, montants fictifs) | Aucune retouche nécessaire |

Toutes converties en WebP, largeur 1600 px. **672 ko au total pour 16 captures.**
Une mention apparaît sous chaque galerie : « Captures anonymisées — noms de clients masqués, montants et volumes fictifs ».

Affectation : Executive Control Center (3) · LVI Control Center (6) · Bastide (4) · Moon Mobility (1) · TalentScout (1).

---

## 6. Landing allégée et restructurée

Avant : quatre études de cas déroulées intégralement sur l'accueil, chacune avec son schéma d'architecture, sa stack, ses résultats et son avis. Le visiteur était épuisé avant d'atteindre le formulaire.

Après :

1. Hero
2. Bandeau de 4 chiffres
3. Grille bento des 8 domaines
4. **Un projet phare** en grand format avec capture et 3 chiffres
5. **Neuf cartes** compactes, lisibles d'un coup d'œil
6. Process · Stack · À propos · Avis · Contact

Le détail vit sur les pages dédiées. La hiérarchie est claire, le chemin vers le formulaire est court.

---

## 7. Chatbot en bulle flottante

Il n'est plus encastré dans la section contact. C'est maintenant une **bulle ronde en bas à droite, présente sur toutes les pages**, y compris les études de cas.

- Ouverture au clic, le panneau se déploie depuis la bulle
- Une seule sollicitation, après 14 secondes, avec une phrase d'accroche — puis plus jamais dans la session
- Fermeture par clic extérieur ou touche Échap
- Panneau limité à la largeur de l'écran sur mobile, safe-area respectée

La section contact garde le formulaire, élargi, avec les canaux directs (WhatsApp, email, LinkedIn) en appui.

---

## 8. Logos officiels

**39 logos de marque** récupérés depuis le jeu Simple Icons et **servis en local** — aucune requête vers un CDN externe, aucun risque de lien mort.

Ils sont rendus en `mask-image` plutôt qu'en `<img>` : la couleur suit la charte du site, le rendu reste monochrome et cohérent, et on évite 40 PNG aux styles hétérogènes.

Non couverts par le jeu d'icônes : Apify, Groq, Lemlist — affichés en texte, parfaitement lisibles.

Appliqués sur : la section stack, les chips de stack des études de cas, les badges de plateforme des avis.

---

## 9. Vérifications effectuées

- `npx tsc --noEmit` : aucune erreur de type
- `npx next build` : **compilation réussie**, 32 pages statiques générées (10 études de cas × 2 langues + accueil + légal + sitemap + robots)
- Rendu vérifié dans le navigateur sur le build de production : hero, grille bento, projet phare avec capture, process, bulle du chatbot
- Un bug corrigé au passage : la troisième ligne du titre du hero était tronquée, « votre entreprise » manquait

---

## 10. Reste à faire

1. Lecture de l'historique Upwork détaillé (7 missions) via le navigateur connecté
2. Exécuter la migration SQL dans Supabase et tester l'enregistrement d'un lead
3. Configurer Resend et tester un envoi réel
4. Renseigner les variables d'environnement sur Vercel
5. Revue finale : responsive mobile, Lighthouse, accessibilité

---

## 11. Points d'attention

- **Le token GitHub `ghp_7hGT…` doit être révoqué.** Il a servi au push, il n'a plus d'utilité : Vercel se connecte par OAuth.
- Le dépôt `OussamaAbassi0/Portfolio` est **public**. `PLAN.md` et ce dossier `RAPPORTS` y sont visibles. À passer en privé si tu préfères.
- Les captures des projets sans image (place de marché d'art, B&C, FlowAudit, LeadScout, DarkosClaw) : si tu en as, je les intègre.
