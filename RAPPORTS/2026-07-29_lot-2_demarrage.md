# Compte rendu — Lot 2 : refonte du contenu et de la structure

Date : 29 juillet 2026
Statut : **en cours** — sauvegarde faite, recherche terminée, en attente de 4 réponses

---

## 1. Sauvegarde — FAIT

Rien n'a encore été modifié dans le site. Trois filets de sécurité sont en place :

| Sauvegarde | Emplacement | Comment revenir en arrière |
|---|---|---|
| Tag git | `backup-v1-avant-refonte` | `git checkout backup-v1-avant-refonte` |
| Branche git | `backup/v1-avant-refonte` | `git checkout backup/v1-avant-refonte` |
| Copie de fichiers | `Downloads\Oussamadev\_BACKUP_v1_src` | copier-coller par-dessus `src` |

Le dépôt GitHub `OussamaAbassi0/Portfolio` contient déjà la v1 complète — c'est un quatrième filet.

---

## 2. Photos — inventaire et affectation

Dossier source : `C:\Users\HP\Downloads\Photos` (copié dans `_photos_src`).
J'ai ouvert les captures pour vérifier à quel projet chacune appartient, plutôt que de me fier au nom de fichier.

| Fichier | Contenu vérifié | Projet |
|---|---|---|
| `LVI CONTROL CENTER 1-7` | Overview KPIs, Auto 1 Veille LinkedIn, Auto 2 Campagnes Lemlist, Auto 3 Opportunités Salons | **LVI Control Center** (prospection B2B) |
| `LVIF GROUP CENTER 1-3` | Cockpit exécutif, CA réalisé YTD, financement, historique CA | **Executive Control Center** (nouveau projet) |
| `Bastide 1-4` | — | **Bastide Confort Médical** |
| `Moon.png` | — | **Moon Mobility** |
| `TalentScoutAi.png` | — | **TalentScout AI** |

Aucune capture pour : Artlovings/AfricArt, B&C Enterprise, FlowAudit, LeadScout, DarkosClaw.

**Point de vigilance** : `LVI CONTROL CENTER 1` affiche en clair le nom du client (LED Visual Innovation) et des chiffres réels (12 755 leads identifiés, 25 murs LED, 5 salons). `LVIF GROUP CENTER 1` est déjà anonymisé (ABASSI Group, montants à 1 000 000 €). Voir question 3.

---

## 3. Profil Malt — lu et exploité

Le profil contient beaucoup plus de matière que ce que j'avais écrit en v1. Éléments récupérés :

**Positionnement** — « Automatisation & Data | n8n · Scraping · Lead Gen » · Paris FR · 3-7 ans · délai de réponse moyen 1 h · télétravail uniquement · FR/EN/AR bilingue.

**Mission art (Artlovings, mai-juin 2026)** — bien plus dense que ma version :
- Infrastructure existante EC2 + RDS MySQL + O2Switch
- 2 scrapers, contournement Imperva Incapsula via ScrapFly, tunnel Cloudflare WARP
- Cycle de vie des ventes PENDING → COMPLETED
- 64 602 fiches nettoyées par GPT-4o-mini pour 5,51 $, **marqueur d'idempotence** pour ne pas repayer les lignes déjà traitées
- Pipeline images : migration S3 → FTP, **8 formats par œuvre** (AVIF + WebP, 400/800/1200/thumb/original), nommage SEO dynamique
- 253 000 alt texts GPT-4o vision, ~3 000 par nuit, run à 2 h UTC
- **11 301 biographies** réécrites en SEO multilingue (FR/EN/DE/IT/ES)
- JSON-LD Person/Artist, HTML5 sémantique, accordéons mobile
- Livraison GitHub : README, runbook, schéma DB, 6 bugs corrigés avant push

**Bastide (via PLATINUMAAA, février 2026)** — CRM Universal, format E.164, dédoublonnage JavaScript, workflow d'import manuel + cron 8 h, logging Google Sheets.

**LVI Control Center (LED Visual Innovation, mai 2026, Paris)** — 4 jours, suppression de plusieurs dizaines d'heures de prospection manuelle par semaine.

**Avis Malt** : Matys (01/03/2026, PLATINUMAAA) · Mouna Baatout (27/02/2026).
**Recommandations Malt** : Yassine Alomari · Sara Moujahid.

**Formation** : Master en ingénierie, ESI Green & Social Business School (2025) · Licence Pro Management PME-PMI, Rabat (2022).
**Certifications** : Python for Data Science and ML · R for Data Science and ML (Sololearn, 2023).

---

## 4. Profil Upwork — partiellement lu

La page publique ne montre que l'en-tête. L'historique des missions et les avis détaillés sont derrière la connexion.

Récupéré : « AI Automation, Web Scraping & Lead Gen Systems | n8n, Python » · Top Rated · 100 % Job Success · **5,0 sur 3 avis** · **7 missions** · Saint-Étienne-du-Rouvray, France.

Je lirai le détail via le navigateur (session connectée) à la prochaine étape.

---

## 5. Écarts relevés entre ce qui est sur le site v1 et la réalité

À corriger :

| Sujet | Site v1 | Réalité vérifiée |
|---|---|---|
| Client du projet art | « Jean · AfricArt » | **Artlovings** sur Malt |
| Maisons de vente | Nommées explicitement | **À supprimer** (confidentiel) |
| Ville | « France » | Malt dit Paris, Upwork dit Saint-Étienne-du-Rouvray |
| Avis Upwork | 1 cité | 3 avis, 5,0 |
| Expérience | non affichée | 3-7 ans |
| Délai de réponse | « sous 24 h » | Malt affiche **1 h de moyenne** — argument plus fort |

---

## 6. Ce qui reste à faire dans ce lot

1. Supprimer les noms des sources scrapées du projet art
2. Réécrire les 9 études de cas en profondeur à partir de Malt + Upwork
3. Ajouter le 10ᵉ projet : Executive Control Center (Maxime)
4. Intégrer les 16 captures dans les bons projets
5. Ajouter les 2 nouveaux avis (Yassine Alomari, Maxime)
6. Alléger et restructurer la landing page
7. Récupérer les vrais logos des outils et plateformes
8. Chatbot en bulle flottante ronde sur toutes les pages
9. Base de données + formulaire Resend (étapes 5 et 6)

---

## 7. Décisions prises (validées par Oussama)

1. **Projet art** → anonymisation complète. Aucun nom de client, aucune source scrapée nommée.
2. **Captures LVI Control Center** → chiffres à remplacer par des valeurs fictives, comme sur les captures LVIF.
3. **Moon Mobility** → c'est le projet de Mouna Baatout. Fiche conservée, avec son avis Malt 5,0 en preuve.
4. **Ville affichée** → Paris.

---

## 8. Travaux réalisés dans ce lot

### Contenu des études de cas — FAIT

Les données ont été scindées en `cases.fr.ts` et `cases.en.ts` (le fichier `cases.ts` ne fait plus que ré-exporter). Le type `CaseStudy` accepte désormais `images[]` et `detail[]`, ce qui permet d'avoir une fiche courte sur la landing et une étude complète sur la page dédiée.

**10 projets**, dont 4 approfondis :

| Projet | Statut |
|---|---|
| Executive Control Center (Maxime) | **nouveau** — 5 sections détaillées, 4 chiffres, avis Upwork de Maxime |
| Place de marché d'art | **anonymisé et enrichi** — 5 sections, données Malt |
| LVI Control Center | enrichi — 3 sections, 4 chiffres |
| Bastide Confort Médical | enrichi — 2 sections, avis Malt de Matys |
| TalentScout, Moon Mobility, B&C, FlowAudit, LeadScout, DarkosClaw | fiches compactes |

Ce qui a été retiré du projet art : le nom du client, les quatre maisons de vente, et toute mention permettant de les identifier. Ce qui a été ajouté depuis Malt : le marqueur d'idempotence, les 8 formats d'image par œuvre, les 11 301 biographies en cinq langues, le run nocturne à 2 h UTC, la livraison GitHub avec runbook.

Pour l'Executive Control Center, les quatre décisions d'architecture que tu voulais mettre en avant sont rédigées comme des sections à part entière : la contrainte bancaire en lecture seule, les trois refus de dépendance avec leur justification, le mode clair structurellement incassable et l'audit sur 233 éléments, et les erreurs de base de données rendues visibles.

### Avis — FAIT

Les deux nouveaux avis sont intégrés en FR et en EN, et placés en tête de section :
- **Maxime** (Upwork) — le client de l'Executive Control Center
- **Yassine Alomari**, directeur général de Junto (Malt, 14/05/2026)

Total : 5 avis vérifiés, tous en 5,0.

### Autres corrections — FAIT

- Ville : Paris
- Liens des cartes de services recâblés vers les nouveaux slugs (`marketplace-art`, `executive-control-center`)

---

## 9. Reste à faire

1. Traitement des 16 captures : recadrage, remplacement des chiffres réels par des valeurs fictives sur les captures LVI, conversion en WebP, intégration
2. Logos officiels des outils et plateformes
3. Allègement et restructuration de la landing page
4. Chatbot en bulle ronde flottante sur toutes les pages
5. Affichage des sections `detail` et des captures sur les pages d'études de cas
6. Lecture de l'historique Upwork détaillé via le navigateur
7. Base de données + formulaire Resend (étapes 5 et 6)
8. Build et déploiement

---

## 10. Questions initiales (résolues)

1. **Nom du client art** : j'écris « Artlovings » (c'est public sur ton profil Malt) ou j'anonymise en « place de marché d'enchères d'art » ? D'où venaient « Jean » et « AfricArt » ?
2. **Captures LVI Control Center** : le nom LED Visual Innovation et les chiffres réels sont visibles. Je les floute, je les remplace par des valeurs fictives, ou je les laisse ?
3. **Moon Mobility et B&C Enterprise** : absents du profil Malt public. Tu me donnes le détail comme tu l'as fait pour l'Executive Control Center, ou je les garde en fiche courte ?
4. **Ville affichée** : Paris ou Saint-Étienne-du-Rouvray ?
