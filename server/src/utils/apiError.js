export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

// Middleware d'erreur centralisé (à brancher en dernier dans server.js)
export function errorHandler(err, req, res, next) {
  const status = err.status || 500
  res.status(status).json({ error: err.message || 'Erreur interne' })
}
