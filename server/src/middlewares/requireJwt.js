import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/apiError.js'

// RM-01 : un utilisateur non authentifié ne peut pas accéder à son espace
export function requireJwt(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentification requise'))
  }
  try {
    const token = header.split(' ')[1]
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.auth = { userId: payload.sub, role: payload.role }
    next()
  } catch {
    next(new ApiError(401, 'Token invalide ou expiré'))
  }
}

// RM-09 : seul un Agent E2C peut accéder à la liste globale
export function requireAgent(req, res, next) {
  if (req.auth?.role !== 'agent') {
    return next(new ApiError(403, 'Réservé aux Agents E2C'))
  }
  next()
}
