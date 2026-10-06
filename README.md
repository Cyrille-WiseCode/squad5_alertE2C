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


## Déploiement Vercel + Render

### 1. Frontend sur Vercel

- Importez le dépôt Git dans Vercel et choisissez `client` comme **Root Directory**.
- Framework : Vite ; commande de build : `npm run build` ; dossier de sortie : `dist`.
- Déployez une première fois pour obtenir le domaine public Vercel. `client/vercel.json` gère les routes React lors d'un rechargement direct.


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
