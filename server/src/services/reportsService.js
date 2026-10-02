import { nanoid } from 'nanoid'
import { db } from '../models/store.js'
import { ApiError } from '../utils/apiError.js'

function genererReference() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  return `E2C-${date}-${nanoid(4).toUpperCase()}`
}

// US-04 à US-10 — Créer et soumettre un signalement
// RM-02 : champ obligatoire absent → bloqué
// RM-03 : référence générée seulement si validation réussie
// RM-04 : statut initial = "Nouveau"
export function creerSignalement(userId, { type, description, adresse, photoUrl }) {
  if (!type) throw new ApiError(400, 'Le champ "type" est obligatoire')
  if (!description) throw new ApiError(400, 'Le champ "description" est obligatoire')
  if (!adresse) throw new ApiError(400, 'Le champ "adresse" est obligatoire')
  if (!photoUrl) throw new ApiError(400, 'Une photo est obligatoire')

  const report = {
    id: db.reports.length + 1,
    reference: genererReference(),
    userId,
    type,
    description,
    adresse,
    photoUrl,
    statut: 'Nouveau',
    createdAt: new Date().toISOString()
  }
  db.reports.push(report)
  return report
}

// US-11 à US-13 — Mes signalements (RM-08 : uniquement les siens)
export function listerSignalementsCitoyen(userId) {
  return db.reports.filter((r) => r.userId === userId)
}

export function obtenirSignalementCitoyen(userId, reportId) {
  const report = db.reports.find((r) => r.id === Number(reportId))
  if (!report) throw new ApiError(404, 'Signalement introuvable')
  if (report.userId !== userId) throw new ApiError(403, "Ce signalement ne vous appartient pas")
  return report
}

// US-14 à US-15 — Liste globale et détail (Agent E2C)
export function listerTousLesSignalements() {
  return db.reports
}

export function obtenirSignalementAgent(reportId) {
  const report = db.reports.find((r) => r.id === Number(reportId))
  if (!report) throw new ApiError(404, 'Signalement introuvable')
  return report
}

// US-16 — Changer le statut (RM-05, RM-06, RM-07)
const STATUTS_VALIDES = ['Nouveau', 'En cours', 'Résolu']

export function changerStatut(reportId, nouveauStatut) {
  if (!STATUTS_VALIDES.includes(nouveauStatut)) {
    throw new ApiError(400, 'Statut invalide')
  }
  const report = db.reports.find((r) => r.id === Number(reportId))
  if (!report) throw new ApiError(404, 'Signalement introuvable')

  report.statut = nouveauStatut
  return report
}
