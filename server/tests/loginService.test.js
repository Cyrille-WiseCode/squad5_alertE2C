import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import jwt from 'jsonwebtoken'
import { db } from '../src/models/store.js'
import { login, registerCitoyen } from '../src/services/authService.js'

const jwtSecret = 'secret-de-test'
process.env.JWT_SECRET = jwtSecret

beforeEach(() => {
  db.users.length = 0
})

test('connecte un citoyen et renvoie un JWT valide', async () => {
  await registerCitoyen({
    nom: 'Amina Mbemba',
    telephone: '+242060000000',
    motDePasse: 'motdepasse123',
  })

  const result = await login({
    telephone: '+242060000000',
    motDePasse: 'motdepasse123',
  })
  const payload = jwt.verify(result.token, jwtSecret)

  assert.deepEqual(result.user, { id: 1, nom: 'Amina Mbemba', role: 'citoyen' })
  assert.equal(payload.sub, 1)
  assert.equal(payload.role, 'citoyen')
})

test('refuse la connexion si le téléphone est absent', async () => {
  await assert.rejects(
    () => login({ motDePasse: 'motdepasse123' }),
    { status: 400, message: 'Le champ "telephone" est obligatoire' },
  )
})

test('refuse la connexion si le mot de passe est absent', async () => {
  await assert.rejects(
    () => login({ telephone: '+242060000000' }),
    { status: 400, message: 'Le champ "motDePasse" est obligatoire' },
  )
})

test('renvoie 404 si aucun utilisateur ne correspond au téléphone', async () => {
  await assert.rejects(
    () => login({ telephone: '+242060000000', motDePasse: 'motdepasse123' }),
    { status: 404, message: 'Utilisateur introuvable' },
  )
})

test('refuse un mot de passe incorrect', async () => {
  await registerCitoyen({
    nom: 'Amina Mbemba',
    telephone: '+242060000000',
    motDePasse: 'motdepasse123',
  })

  await assert.rejects(
    () => login({ telephone: '+242060000000', motDePasse: 'incorrect' }),
    { status: 401, message: 'Identifiants incorrects' },
  )
})
