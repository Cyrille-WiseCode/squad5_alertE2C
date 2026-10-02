import { Router } from 'express'
import { requireJwt, requireAgent } from '../middlewares/requireJwt.js'
import * as reportsService from '../services/reportsService.js'

const router = Router()

router.use(requireJwt, requireAgent) // RM-09 : réservé à l'Agent E2C

// US-14 — Liste globale
router.get('/reports', (req, res, next) => {
  try {
    res.json(reportsService.listerTousLesSignalements())
  } catch (err) {
    next(err)
  }
})

// US-15 — Détail
router.get('/reports/:id', (req, res, next) => {
  try {
    res.json(reportsService.obtenirSignalementAgent(req.params.id))
  } catch (err) {
    next(err)
  }
})

// US-16 — Changer le statut (RM-05, RM-06, RM-07)
router.patch('/reports/:id/status', (req, res, next) => {
  try {
    const { statut } = req.body
    res.json(reportsService.changerStatut(req.params.id, statut))
  } catch (err) {
    next(err)
  }
})

export default router
