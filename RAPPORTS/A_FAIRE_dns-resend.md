# À faire — vérifier oussamaabassi.com dans Resend

Date : 29 juillet 2026

---

## D'abord : à quoi ça sert, en une minute

Aujourd'hui, ton site ne peut envoyer d'emails que depuis `onboarding@resend.dev`, et **uniquement vers ta propre adresse**. Concrètement : tu reçois la notification quand quelqu'un remplit le formulaire, mais **le visiteur ne reçoit aucune confirmation**. Il ne sait pas si son message est parti.

Pour que Resend puisse écrire à n'importe qui depuis `contact@oussamaabassi.com`, il doit prouver que le domaine t'appartient. Cette preuve se fait en ajoutant quatre lignes dans les réglages DNS de ton domaine. C'est tout. Rien ne casse, rien ne change pour ton site actuel : ce sont des lignes qui s'ajoutent sur des sous-domaines (`send`, `resend._domainkey`, `_dmarc`) que personne n'utilise.

---

## Ce que j'ai déjà fait

- Le domaine `oussamaabassi.com` est **ajouté dans Resend**, région Irlande (eu-west-1 — tes données restent en Europe)
- Les enregistrements DNS sont générés et je les ai extraits en entier ci-dessous

## Où je me suis arrêté

Resend a détecté que ton DNS est géré chez **Hostinger**. La page de connexion Hostinger s'est affichée : **je ne saisis jamais de mot de passe**, donc je m'arrête là.

---

## Les 4 enregistrements à créer chez Hostinger

Connecte-toi sur `hpanel.hostinger.com`, va dans **Domaines → oussamaabassi.com → DNS / Serveurs de noms**, puis ajoute ces lignes une par une.

### 1. DKIM — signature des emails (obligatoire)

| Champ | Valeur |
|---|---|
| Type | `TXT` |
| Nom | `resend._domainkey` |
| TTL | laisser par défaut |

Valeur (une seule ligne, tout copier) :

```
p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDug+eVPEEeIoHZH9gD6r6g9nHv4MW/zvjipTzSa1c/0rcDe6vaqY3S3rFBYkpAxmY4eRFyZDAkHqnXhVWcazN43+raJKDQ+h2hGS5iQ/SPtfv6b21klhzQ53zVe7v3k0AIZrlfOrcyKbZTWkpeq2xEJzni2we4n6pZM3GcvX1pUwIDAQAB
```

### 2. MX — retours d'envoi (obligatoire)

| Champ | Valeur |
|---|---|
| Type | `MX` |
| Nom | `send` |
| Valeur | `feedback-smtp.eu-west-1.amazonses.com` |
| Priorité | `10` |
| TTL | `3600` |

### 3. SPF — autorisation d'envoi (obligatoire)

| Champ | Valeur |
|---|---|
| Type | `TXT` |
| Nom | `send` |
| Valeur | `v=spf1 include:amazonses.com ~all` |
| TTL | `3600` |

### 4. DMARC — politique anti-usurpation (facultatif mais recommandé)

| Champ | Valeur |
|---|---|
| Type | `TXT` |
| Nom | `_dmarc` |
| Valeur | `v=DMARC1; p=none;` |
| TTL | laisser par défaut |

---

## Attention en saisissant

- **Ne touche à aucune ligne existante.** Tes enregistrements A, CNAME et MX actuels font tourner ton site et ta messagerie. On ajoute, on ne modifie rien.
- Si Hostinger ajoute automatiquement `.oussamaabassi.com` à la fin du champ Nom, saisis juste `send` et non `send.oussamaabassi.com` — sinon tu obtiens `send.oussamaabassi.com.oussamaabassi.com`.
- Si tu as déjà un enregistrement SPF sur `send`, ne le duplique pas : un seul SPF par nom.

Une fois les quatre lignes créées, retourne sur `resend.com/domains` et clique **Verify**. La propagation prend de quelques minutes à une heure.

---

## Ensuite : la clé API

**La clé `re_EdewoV9Z…` que tu m'as envoyée dans le chat est à considérer comme compromise.** Elle est écrite en clair dans l'historique de cette conversation. N'importe qui ayant accès à ce fil peut envoyer des emails en ton nom.

1. `resend.com/api-keys` → supprimer `re_EdewoV9Z…`
2. **Create API key** → permission d'envoi → copier la nouvelle valeur
3. La coller directement dans Vercel, **sans jamais passer par le chat**

C'est la quatrième clé que tu m'envoies aujourd'hui (GitHub ×2, Supabase, Resend). Prends l'habitude inverse : tu me dis « c'est fait », je continue. Je n'ai jamais besoin de voir la valeur.

---

## Puis les variables Vercel

`vercel.com` → projet → Settings → Environment Variables, en Production **et** Preview :

```
NEXT_PUBLIC_SITE_URL        https://oussama-abassi-portfolio.vercel.app
SUPABASE_URL                https://boebkjuohvrgjeylluhx.supabase.co
SUPABASE_SERVICE_ROLE_KEY   (nouvelle clé, après rotation)
RESEND_API_KEY              (nouvelle clé Resend)
RESEND_FROM                 Oussama Abassi <contact@oussamaabassi.com>
CONTACT_TO_EMAIL            oussama.abassi.work@gmail.com
GROQ_API_KEY                (facultatif)
IP_HASH_SALT                (n'importe quelle chaîne aléatoire longue)
```

Tant que le domaine n'est pas vérifié, mets provisoirement :
`RESEND_FROM = Oussama Abassi <onboarding@resend.dev>`

Puis redéploie.

---

## Je peux aussi t'accompagner en direct

Si tu te connectes toi-même à Hostinger et que tu me le dis, **je remplis les quatre formulaires DNS à ta place** — saisir un enregistrement DNS n'est pas un identifiant, ça je peux le faire. Il n'y a que la connexion et les clés que je ne touche pas.

Dis-moi simplement « je suis connecté à Hostinger » et je prends la main.
