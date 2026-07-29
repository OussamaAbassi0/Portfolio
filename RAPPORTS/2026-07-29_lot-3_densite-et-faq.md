# Compte rendu — Lot 3 : densité, avis défilants, FAQ

Date : 29 juillet 2026
Statut : **code écrit, build à relancer**

---

## 1. Icônes des plateformes ajoutées

Malt, LinkedIn, WhatsApp et Upwork apparaissent désormais en pastilles rondes cliquables :

- **dans le hero**, sous la ligne de preuve sociale — la preuve devient vérifiable en un clic, ce qui vaut mieux que d'écrire « Top Rated » sans lien
- **dans le footer**, sous la baseline

Chaque pastille a un `aria-label` et un `title` explicites (« Profil Upwork — Top Rated, 100% Job Success »), pas juste un nom de marque.

---

## 2. Section stack — hauteur divisée par trois

**Le problème** : six bandeaux séparés, chacun avec son intitulé, occupaient presque un écran entier pour une information secondaire. La stack rassure, elle ne vend pas — elle ne mérite pas ce volume.

**La solution retenue** : deux lignes qui défilent en sens opposé, contenant les mêmes 30 outils. Les six familles restent lisibles en légende sous les pistes.

| | Avant | Après |
|---|---|---|
| Lignes défilantes | 6 | 2 |
| Intitulés empilés | 6 blocs | 1 ligne de légende |
| Hauteur approximative | ~950 px | ~320 px |

Pastilles resserrées (padding et police réduits), fondus latéraux pour que les pistes se perdent dans le fond au lieu d'être coupées net. Pause au survol et au focus clavier conservée.

---

## 3. Grille des services — l'espace mort supprimé

**Le problème** : la carte « Data & pipelines » occupait 2 colonnes sur 2 rangées. Sa hauteur était imposée par la grille, pas par son contenu — d'où le grand vide entre l'icône en haut et le titre en bas. Le même défaut touchait les cartes en `row-span-2`.

**La solution** : grille uniforme de 4 colonnes, chaque carte occupe une cellule, la hauteur suit le texte. L'icône passe sur la même ligne que le titre au lieu d'être isolée en haut. Padding réduit de 24 à 20 px.

Une grille bento à tailles variables est jolie quand les contenus ont des longueurs très différentes. Ici les huit descriptions font une à deux lignes chacune : l'uniformité est plus lisible et ne crée aucun trou.

---

## 4. Avis sur une seule ligne défilante

Les trois cartes empilées deviennent une piste horizontale, sur le même principe que la stack. Cinq avis défilent en continu.

- Arrêt au survol **et au focus clavier** — un avis qu'on ne peut pas finir de lire ne sert à rien
- Piste dupliquée pour boucler sans saut, la copie est masquée aux lecteurs d'écran (`aria-hidden`, `tabIndex={-1}`)
- Chaque carte reste un lien vers l'avis public réel
- Sous la piste : deux liens directs vers les profils Upwork et Malt, avec leurs logos

---

## 5. Captures retirées de la landing

Plus aucune image de projet sur la page d'accueil. Les visuels se découvrent en ouvrant le projet.

La carte du projet phare avait besoin d'autre chose pour rester forte : elle affiche maintenant **la chaîne d'architecture** en pastilles (eWay CRM → API Qonto → Facturation → Supabase → Assistants IA). Ça dit en une ligne ce que le système fait, et ça donne davantage envie de cliquer qu'une capture d'écran réduite à 300 px de large.

---

## 6. FAQ — l'idée reprise à l'agence, écrite autrement

De haaakoun.fr, j'ai retenu une seule chose : **la FAQ qui lève les objections juste avant le formulaire**. Ton ancien site en avait une, je l'avais perdue en refonte.

Six questions, placées entre les avis et le contact :

1. Vous travaillez vraiment seul ?
2. Combien de temps prend un projet ?
3. Comment se passe la facturation ?
4. Que se passe-t-il si le système tombe après la livraison ?
5. Mes données sont-elles en sécurité ?
6. Vous reprenez un projet existant ou seulement du neuf ?

Les réponses sont écrites pour désamorcer, pas pour vendre. Sur les délais : « je refuse de donner un chiffre avant d'avoir compris le périmètre ». Sur la maintenance : « certains clients n'en ont jamais eu besoin, et c'est exactement le but que je vise en construisant ». Sur la sécurité, l'exemple concret de l'accès bancaire en lecture seule.

Aucun tarif affiché, conformément à ta consigne — la facturation est expliquée sans chiffre.

**Technique** : balise `<details>` native. Accessible au clavier sans une ligne de JavaScript, ouvrable par la recherche du navigateur, et indexée par Google même repliée. Un balisage `FAQPage` en JSON-LD a été ajouté : les questions peuvent remonter directement dans les résultats de recherche.

---

## 7. Structure de la landing après ce lot

1. Hero — accroche, CTA, preuve sociale, **pastilles Upwork / Malt / LinkedIn / WhatsApp**
2. Quatre chiffres
3. Huit domaines — **grille uniforme, sans espace mort**
4. Projet phare — **chaîne d'architecture, sans capture**
5. Neuf cartes projets — **sans captures**
6. Process
7. Stack — **deux lignes au lieu de six**
8. À propos
9. Avis — **une ligne défilante**
10. **FAQ** (nouveau)
11. Contact
12. Footer — **pastilles des plateformes**

---

## 8. Reste à faire

1. Relancer le build et vérifier le rendu
2. Historique Upwork détaillé
3. Migration SQL Supabase + test d'enregistrement d'un lead
4. Resend + test d'envoi réel
5. Variables d'environnement sur Vercel
6. Revue finale : responsive, Lighthouse, accessibilité
