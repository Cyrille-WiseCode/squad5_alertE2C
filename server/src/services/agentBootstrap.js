import bcrypt from 'bcryptjs'
import { db, sauvegarderDb } from '../models/store.js'
import { normaliserTelephone } from './authService.js'

// Creates the dedicated demonstration agent only when deployment secrets are configured.
// Repeated restarts are safe: an existing agent is kept and its password is never reset.
export async function bootstrapAgentDemo() {
  const nom = process.env.E2C_AGENT_NAME?.trim()
  const telephoneBrut = process.env.E2C_AGENT_PHONE?.trim()
  const motDePasse = process.env.E2C_AGENT_PASSWORD
  const configuredValues = [nom, telephoneBrut, motDePasse].filter(Boolean).length

  if (configuredValues === 0) return false
  if (configuredValues !== 3) {
    throw new Error('Configuration incomplète du compte agent de démonstration (E2C_AGENT_NAME, E2C_AGENT_PHONE, E2C_AGENT_PASSWORD).')
  }
  if (motDePasse.length < 12) {
    throw new Error('Le mot de passe agent de démonstration doit contenir au moins 12 caractères.')
  }

  const telephone = normaliserTelephone(telephoneBrut)
  if (!telephone) throw new Error('Le numéro du compte agent de démonstration est invalide.')

  const existing = db.users.find((user) => normaliserTelephone(user.telephone) === telephone)
  if (existing) {
    if (existing.role === 'agent') return false
    throw new Error('Le numéro configuré pour l’agent existe déjà avec un autre rôle.')
  }

  db.users.push({
    id: db.users.reduce((maximum, user) => Math.max(maximum, Number(user.id) || 0), 0) + 1,
    nom,
    telephone,
    motDePasseHash: await bcrypt.hash(motDePasse, 12),
    role: 'agent'
  })
  sauvegarderDb()
  return true
}
