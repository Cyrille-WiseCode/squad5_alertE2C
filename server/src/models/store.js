import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Stockage local persistant pour le MVP. Le fichier reste ignoré par Git.
const defaultDataDirectory = join(dirname(fileURLToPath(import.meta.url)), '../../data')
const dataDirectory = process.env.E2C_DATA_DIR || defaultDataDirectory
const dataPath = join(dataDirectory, 'db.json')
mkdirSync(dataDirectory, { recursive: true })

function chargerDb() {
  if (!existsSync(dataPath)) return { users: [], reports: [] }
  return JSON.parse(readFileSync(dataPath, 'utf8'))
}

export function sauvegarderDb() {
  const tempPath = `${dataPath}.tmp`
  writeFileSync(tempPath, JSON.stringify(db, null, 2))
  renameSync(tempPath, dataPath)
}

export const db = chargerDb()
