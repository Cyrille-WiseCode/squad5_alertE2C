// Stockage en mémoire — temporaire, à remplacer par une vraie base (MongoDB/PostgreSQL/json-server…)
// selon ce que la Squad décide. Permet de développer les routes sans attendre ce choix.

export const db = {
  users: [
    // { id, nom, telephoneOuEmail, motDePasseHash, role: 'citoyen' | 'agent' }
  ],
  reports: [
    // { id, reference, userId, type, description, photoUrl, adresse, statut, createdAt }
  ]
}
