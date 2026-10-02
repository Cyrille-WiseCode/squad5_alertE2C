import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './src/routes/authRoutes.js'
import reportsRoutes from './src/routes/reportsRoutes.js'
import agentRoutes from './src/routes/agentRoutes.js'
import { errorHandler } from './src/utils/apiError.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes) // AE-1 — US-01, US-02, US-03
app.use('/api/reports', reportsRoutes) // AE-2 / AE-3 — US-04 à US-13
app.use('/api/agent', agentRoutes) // AE-4 — US-14 à US-16

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use(errorHandler) // middleware d'erreur toujours en dernier

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`ALERT E2C API en écoute sur le port ${PORT}`))
