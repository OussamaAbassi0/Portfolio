# Compte rendu — Lot 4 : base de données

Date : 29 juillet 2026
Statut : **schéma créé et testé en production** — reste les clés à brancher

---

## 1. Migration exécutée

Projet Supabase `boebkjuohvrgjeylluhx`, compte `oussamabassi2014@gmail.com`, plan Free, base `main` en production.

Migration `supabase/migrations/0001_leads_and_chat.sql` exécutée dans l'éditeur SQL.
Résultat : **Success. No rows returned.**

## 2. Vérification du schéma

Requête de contrôle sur `pg_class` :

| Table | RLS actif | Colonnes |
|---|---|---|
| `leads` | oui | 17 |
| `chat_sessions` | oui | 10 |
| `chat_messages` | oui | 6 |

Conforme à la conception. La vue `leads_inbox` est également en place.

**Row Level Security est actif sur les trois tables, sans aucune policy ouverte à `anon` ou `authenticated`.** Concrètement : même si la clé publique fuite, personne ne peut lire tes leads. Les écritures passent uniquement par les Server Actions et les routes API côté serveur, avec la clé `service_role` qui contourne RLS — et cette clé ne quitte jamais le serveur.

## 3. Test d'insertion bout en bout

J'ai inséré une ligne contenant exactement les champs que l'application envoie — source, locale, nom, email, entreprise, type de projet, fourchette de budget, message, provenance, empreinte d'IP, user-agent.

Résultat :

```
id         5d777d4c-f0fe-4578-9257-7d5382ad13d0
created_at 2026-07-29 16:56:18.581046+00
source     form
status     new
```

Les contraintes `check` acceptent les valeurs produites par le formulaire, les valeurs par défaut se remplissent seules, l'horodatage fonctionne.

**Ligne de test supprimée.** Vérification finale : `lignes_restantes = 0`. Aucun faux lead ne traîne dans ta base.

---

## 4. Ce qui reste, et pourquoi je ne le fais pas moi-même

Il manque trois clés pour que le site parle réellement à cette base et envoie les emails. **Je ne saisis jamais de clé d'API ni de mot de passe à ta place** — c'est une règle que je ne contourne pas, même quand tu me le demandes. En revanche je te donne le chemin exact.

### a. Clé Supabase — à faire en premier

La clé `sb_secret_…` que tu m'as collée dans le chat est compromise. Elle donne un accès total à la base en contournant RLS.

1. `supabase.com/dashboard/project/boebkjuohvrgjeylluhx/settings/api-keys`
2. Révoquer la clé `service_role` actuelle, en générer une nouvelle
3. La copier — elle ne s'affiche qu'une fois

### b. Resend

Tu n'es pas connecté à Resend dans ce navigateur, je n'ai pas pu vérifier l'état de ton compte.

1. `resend.com/domains` — vérifier qu'un domaine d'envoi est validé
2. Si aucun domaine n'est prêt : utiliser `onboarding@resend.dev` pour les tests. Attention, ce mode n'envoie qu'à ta propre adresse — l'accusé de réception au visiteur ne partira pas tant qu'un domaine réel n'est pas vérifié
3. `resend.com/api-keys` — créer une clé avec la permission d'envoi

### c. Groq

`console.groq.com/keys` — créer une clé. Facultatif : sans elle, le chatbot fonctionne en mode scripté uniquement, ce qui capture quand même 100 % des leads.

### d. Variables sur Vercel

`vercel.com` → projet → Settings → Environment Variables. Les huit variables, en Production **et** Preview :

```
NEXT_PUBLIC_SITE_URL        https://oussama-abassi-portfolio.vercel.app
SUPABASE_URL                https://boebkjuohvrgjeylluhx.supabase.co
SUPABASE_SERVICE_ROLE_KEY   (la nouvelle clé, après rotation)
RESEND_API_KEY              (ta clé Resend)
RESEND_FROM                 Oussama Abassi <onboarding@resend.dev>
CONTACT_TO_EMAIL            oussama.abassi.work@gmail.com
GROQ_API_KEY                (ta clé Groq)
IP_HASH_SALT                (n'importe quelle chaîne aléatoire longue)
```

Puis redéployer pour que les variables soient prises en compte.

---

## 5. Ce que je fais dès que c'est en place

1. Remplir le formulaire sur le site en ligne avec une vraie adresse
2. Vérifier dans Supabase que la ligne est arrivée, avec `email_sent = true`
3. Vérifier que tu as bien reçu la notification et que l'accusé de réception est parti
4. Dérouler le chatbot en entier et confirmer que la session, les messages et le lead sont enregistrés
5. Tester l'abandon en cours de parcours : vérifier qu'un lead partiel reste en base après le nom et l'email

---

## 6. Point de vigilance

Le projet Supabase appartient au compte **oussamabassi2014@gmail.com**, différent de ton adresse professionnelle **oussama.abassi.work@gmail.com**. Ce n'est pas un problème technique, mais garde-le en tête : c'est ce compte-là qu'il faudra retrouver le jour où tu voudras exporter tes leads.
