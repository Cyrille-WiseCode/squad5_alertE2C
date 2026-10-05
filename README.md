# ALERT E2C

Signalement et suivi des dysfonctionnements électriques — Squad 5, Akieni Academy, Évaluation 2.

MVP (3 jours) : 2 rôles — Citoyen et Agent E2C. Statuts : Nouveau → En cours → Résolu.

## Structure

```
alert-e2c/
├── client/   → React + Vite + Tailwind CSS
└── server/   → Node.js + Express
```

## Démarrage

### Backend
```bash
cd server
npm install
cp .env.example .env
npm run dev
```
API disponible sur http://localhost:4000

### Frontend
```bash
cd client
npm install
npm run dev
```
App disponible sur http://localhost:5173

## Compte agent de démonstration

L'inscription publique crée uniquement des comptes citoyens. Pour obtenir un compte agent dédié à la démonstration, configurez les variables `E2C_AGENT_NAME`, `E2C_AGENT_PHONE` et `E2C_AGENT_PASSWORD` dans `server/.env` en local ou dans les variables secrètes de la plateforme d'hébergement. Le mot de passe doit contenir au moins 12 caractères.

Au premier démarrage, le serveur crée l'agent et enregistre uniquement son hash bcrypt dans `db.json`. Aux redémarrages suivants, le compte existant n'est pas recréé et son mot de passe n'est pas réinitialisé. Si le numéro existe déjà avec le rôle citoyen, le démarrage échoue pour éviter une promotion accidentelle. Connectez-vous ensuite à `/agent/login`.

Ne versionnez jamais le vrai fichier `.env`, le mot de passe ou un `db.json` contenant des comptes. En hébergement, le stockage local peut être éphémère : montez un disque persistant et définissez `E2C_DATA_DIR` et `E2C_UPLOADS_DIR` vers des dossiers situés sur ce disque. Sans stockage persistant, les comptes, signalements et photos enregistrés peuvent disparaître au redéploiement ; le compte de démonstration configuré sera recréé au démarrage, mais ses anciens signalements ne le seront pas. Pour une application utilisée au-delà de la démonstration, migrez le stockage JSON vers une base de données gérée.

## Déploiement Vercel + Render

### 1. Frontend sur Vercel

- Importez le dépôt Git dans Vercel et choisissez `client` comme **Root Directory**.
- Framework : Vite ; commande de build : `npm run build` ; dossier de sortie : `dist`.
- Déployez une première fois pour obtenir le domaine public Vercel. `client/vercel.json` gère les routes React lors d'un rechargement direct.

### 2. Backend sur Render

- Créez un **Web Service** depuis le même dépôt et choisissez `server` comme **Root Directory**.
- Build Command : `npm ci` ; Start Command : `npm start`.
- Définissez `NODE_ENV=production`, `JWT_SECRET` (valeur aléatoire longue), `CLIENT_ORIGINS` (domaine Vercel exact, sans slash final), ainsi que `E2C_AGENT_NAME`, `E2C_AGENT_PHONE` et `E2C_AGENT_PASSWORD` pour le compte de démo.
- Pour garder `db.json` et les photos, attachez un disque persistant monté sur `/var/data`, puis définissez `E2C_DATA_DIR=/var/data` et `E2C_UPLOADS_DIR=/var/data/uploads`.
- Attendez la fin du déploiement et copiez l'URL `https://…onrender.com` du service.

### 3. Relier le frontend à l'API

- Dans les variables Vercel pour Production, définissez `VITE_API_URL=https://…onrender.com/api` avec l'URL Render réelle.
- Redéployez Vercel après avoir ajouté cette variable : Vite l'intègre au build.
- Vérifiez l'API en ouvrant `https://…onrender.com/api/health`, puis testez l'inscription citoyenne, la connexion agent et l'envoi d'une photo.

Les aperçus Vercel utilisent souvent des domaines différents : ajoutez leur domaine à `CLIENT_ORIGINS` si vous voulez y tester l'API. Le service web gratuit Render peut s'endormir après une période sans trafic et ne permet pas les disques persistants ; dans ce cas, les fichiers JSON et photos de cette version ne sont pas fiables pour conserver les données. Render décrit ces limites dans sa [FAQ stockage](https://render.com/docs/faq) et ses [options de disque persistant](https://render.com/docs/disks).

## Palette (logo E2C)

| Couleur | Hex |
|---|---|
| Bleu marine | `#1B1E4B` |
| Bleu | `#2C3E8C` |
| Jaune | `#F5B942` |
| Orange | `#E8482E` |
| Vert (statut résolu) | `#1F9D55` |

## Découpage MVP (16 User Stories, 4 Epics)

- **AE-1** — Accès et authentification (US-01 à US-03)
- **AE-2** — Signalement citoyen (US-04 à US-10)
- **AE-3** — Suivi citoyen (US-11 à US-13)
- **AE-4** — Traitement Agent E2C (US-14 à US-16)

Voir le dossier BA pour le détail des User Stories, règles métier et critères d'acceptation.


## Squad 5 : Meta_Builders

9 membres · 1 Product Manager · 2 Business Analysts · 6 Fullstack

| Nom | Parcours | Email | Téléphone | Rôle attribué |
|-|-|-|-|-|
| Kedja Jean Lecam PAPA | Product Manager | lecampapa11@gmail.com | +250788730445 | / |
| Arhis Marvel Chrisnovie KOUATOUKA | Business Analyst | marvelkam03@gmail.com | 067097820 | Lead du projet |
| Junior Rex OMBOULA KANGA | Business Analyst | juniorrex991@gmail.com | 066919280 | / |
| Brissam Josué MOUKOUANGA TOMBET | Développeur Fullstack | brissammoukouanga@gmail.com | 064201332 | / |
| Jaurez Mardochey LOUKINZOU | Développeur Fullstack | mardocheyloukinzou@gmail.com | 068300863 | / |
| Loïc Divin Céleste MILANDOU | Développeur Fullstack | celestemilandou353@gmail.com | 065436381 | / |
| Ferol Jeansmy EBATA-MOMBOULI | Développeur Fullstack | fmombouli532@gmail.com | 064646965 | Lead Fullstack |
| **TSIMBA Cyrille** | Développeur Fullstack | jorcynzaou11@gmail.com | 066646478 | **Repo Admin** |
| Exaucé Ryzal IBARA NOUNGOU AKIEBARY | Développeur Fullstack | ryzalibara@gmail.com | 065876401 | / |
