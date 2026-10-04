import { Router } from 'express'
import multer from 'multer'
import { mkdirSync } from 'node:fs'
import { requireJwt, requireAgent } from '../middlewares/requireJwt.js'
import * as reportsService from '../services/reportsService.js'

const router = Router()
const uploadDirectory = process.env.E2C_UPLOADS_DIR || 'uploads'
mkdirSync(uploadDirectory, { recursive: true })
const upload = multer({ dest: uploadDirectory }) // TODO: brancher un vrai stockage (S3, Cloudinary…)

// US-04 à US-10 — Créer un signalement
router.post('/', requireJwt, upload.single('photo'), (req, res, next) => {
  try {
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null
    const report = reportsService.creerSignalement(req.auth.userId, { ...req.body, photoUrl })
    res.status(201).json(report)
  } catch (err) {
    next(err)
  }
})

// Action réservée aux agents, exposée aussi sous /api/reports pour le client agent.
router.patch('/:id/status', requireJwt, requireAgent, (req, res, next) => {
  try {
    const { statut, note } = req.body
    res.json(reportsService.changerStatut(req.params.id, statut, note, req.auth.userId))
  } catch (err) {
    next(err)
  }
})

// US-11 — Mes signalements
router.get('/mine', requireJwt, (req, res, next) => {
  try {
    res.json(reportsService.listerSignalementsCitoyen(req.auth.userId))
  } catch (err) {
    next(err)
  }
})

// US-12 / US-13 — Détail d'un de mes signalements et son statut
router.get('/mine/:id', requireJwt, (req, res, next) => {
  try {
    res.json(reportsService.obtenirSignalementCitoyen(req.auth.userId, req.params.id))
  } catch (err) {
    next(err)
  }
})

export default router
