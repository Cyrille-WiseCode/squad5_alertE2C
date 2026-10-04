import { db, sauvegarderDb } from '../models/store.js'
import { ApiError } from '../utils/apiError.js'

function genererReference() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  let sequence = db.reports.filter((report) => report.reference?.startsWith(`E2C-${date}-`)).length + 1
  let reference = `E2C-${date}-${String(sequence).padStart(3, '0')}`
  while (db.reports.some((report) => report.reference === reference)) {
    sequence += 1
    reference = `E2C-${date}-${String(sequence).padStart(3, '0')}`
  }
  return reference
}

// US-04 à US-10 — Créer et soumettre un signalement
// RM-02 : champ obligatoire absent → bloqué
// RM-03 : référence générée seulement si validation réussie
// RM-04 : statut initial = "Nouveau"
export function creerSignalement(userId, { type, description, adresse, photoUrl, latitude, longitude }) {
  if (!type) throw new ApiError(400, 'Le champ "type" est obligatoire')
  if (!description) throw new ApiError(400, 'Le champ "description" est obligatoire')
  if (!adresse) throw new ApiError(400, 'Le champ "adresse" est obligatoire')
  if (!photoUrl) throw new ApiError(400, 'Une photo est obligatoire')

  const parsedLatitude = latitude === undefined || latitude === '' ? null : Number(latitude)
  const parsedLongitude = longitude === undefined || longitude === '' ? null : Number(longitude)
  if ((parsedLatitude === null) !== (parsedLongitude === null)) {
    throw new ApiError(400, 'Les deux coordonnées GPS sont nécessaires')
  }
  if ((parsedLatitude !== null && (!Number.isFinite(parsedLatitude) || parsedLatitude < -90 || parsedLatitude > 90)) ||
      (parsedLongitude !== null && (!Number.isFinite(parsedLongitude) || parsedLongitude < -180 || parsedLongitude > 180))) {
    throw new ApiError(400, 'Coordonnées GPS invalides')
  }

  const report = {
    id: db.reports.length + 1,
    reference: genererReference(),
    userId,
    type,
    description,
    adresse,
    latitude: parsedLatitude,
    longitude: parsedLongitude,
    photoUrl,
    statut: 'Nouveau',
    createdAt: new Date().toISOString()
  }
  db.reports.push(report)
  sauvegarderDb()
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

export function changerStatut(reportId, nouveauStatut, note = '', agentId = null) {
  if (!STATUTS_VALIDES.includes(nouveauStatut)) {
    throw new ApiError(400, 'Statut invalide')
  }
  const report = db.reports.find((r) => r.id === Number(reportId))
  if (!report) throw new ApiError(404, 'Signalement introuvable')

  report.statut = nouveauStatut
  report.updatedAt = new Date().toISOString()
  if (String(note).trim()) {
    if (!Array.isArray(report.notesIntervention)) report.notesIntervention = []
    report.notesIntervention.push({ texte: String(note).trim(), agentId, createdAt: report.updatedAt })
  }
  sauvegarderDb()
  return report
}
