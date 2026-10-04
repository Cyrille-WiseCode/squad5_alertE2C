import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import jwt from 'jsonwebtoken'
import { db } from '../src/models/store.js'
import { loginAgent, registerCitoyen } from '../src/services/authService.js'

const jwtSecret = 'secret-de-test'
process.env.JWT_SECRET = jwtSecret

beforeEach(() => {
  db.users.length = 0
})

async function createAgent() {
  await registerCitoyen({
    nom: 'Agent Exemple',
    telephone: '+242060000000',
    motDePasse: 'motdepasse123',
  })
  db.users[0].role = 'agent'
}

test('connecte un agent et renvoie un JWT valide', async () => {
  await createAgent()

  const result = await loginAgent({
    telephone: '+242060000000',
    motDePasse: 'motdepasse123',
  })
  const payload = jwt.verify(result.token, jwtSecret)

  assert.deepEqual(result.user, { id: 1, nom: 'Agent Exemple', role: 'agent' })
  assert.equal(payload.sub, 1)
  assert.equal(payload.role, 'agent')
})

test('refuse la connexion d’un citoyen', async () => {
  await registerCitoyen({
    nom: 'Citoyen Exemple',
    telephone: '+242060000001',
    motDePasse: 'motdepasse123',
  })

  await assert.rejects(
    () => loginAgent({ telephone: '+242060000001', motDePasse: 'motdepasse123' }),
    { status: 403, message: 'Accès réservé aux agents' },
  )
})

test('refuse la connexion si le téléphone est absent', async () => {
  await assert.rejects(
    () => loginAgent({ motDePasse: 'motdepasse123' }),
    { status: 400, message: 'Le champ "telephone" est obligatoire' },
  )
})

test('refuse la connexion si le mot de passe est absent', async () => {
  await assert.rejects(
    () => loginAgent({ telephone: '+242060000000' }),
    { status: 400, message: 'Le champ "motDePasse" est obligatoire' },
  )
})

test('renvoie 404 si aucun utilisateur ne correspond au téléphone', async () => {
  await assert.rejects(
    () => loginAgent({ telephone: '+242060000000', motDePasse: 'motdepasse123' }),
    { status: 404, message: 'Identifiants incorrects' },
  )
})

test('renvoie 401 si le mot de passe de l’agent est incorrect', async () => {
  await createAgent()

  await assert.rejects(
    () => loginAgent({ telephone: '+242060000000', motDePasse: 'incorrect' }),
    { status: 401, message: 'Identifiants incorrects' },
  )
})
