import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { db } from "../src/models/store.js";
import { registerCitoyen } from "../src/services/authService.js";

beforeEach(() => {
  db.users.length = 0; // réinitialise la base en mémoire avant chaque test
});

test("crée un compte citoyen avec des données valides", async () => {
  const user = await registerCitoyen({
    nom: "Amina Mbemba",
    telephone: "+242060000000",
    motDePasse: "motdepasse123",
  });

  assert.equal(user.nom, "Amina Mbemba");
  assert.equal(user.role, "citoyen");
  assert.equal(db.users.length, 1);
});

test("refuse la création si le nom est absent", async () => {
  await assert.rejects(
    () => registerCitoyen({ telephone: "+242060000001", motDePasse: "x" }),
    { status: 400, message: 'Le champ "nom" est obligatoire' },
  );
});

test("refuse la création si le téléphone est absent", async () => {
  await assert.rejects(
    () => registerCitoyen({ nom: "Test", motDePasse: "x" }),
    { status: 400, message: 'Le champ "telephone" est obligatoire' },
  );
});

test("refuse la création si le mot de passe est absent", async () => {
  await assert.rejects(
    () => registerCitoyen({ nom: "Test", telephone: "+242060000002" }),
    { status: 400, message: 'Le champ "motDePasse" est obligatoire' },
  );
});

test("refuse un doublon de numéro de téléphone", async () => {
  await registerCitoyen({
    nom: "Amina",
    telephone: "+242060000003",
    motDePasse: "x",
  });

  await assert.rejects(
    () =>
      registerCitoyen({
        nom: "Autre",
        telephone: "+242060000003",
        motDePasse: "y",
      }),
    { status: 409, message: "Un compte existe déjà avec ce numéro" },
  );
});
