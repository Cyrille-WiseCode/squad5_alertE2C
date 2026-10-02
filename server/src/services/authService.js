import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../models/store.js";
import { ApiError } from "../utils/apiError.js";

// US-01 — Créer un compte citoyen
export async function registerCitoyen({ nom, telephone, motDePasse }) {
  if (!nom) throw new ApiError(400, 'Le champ "nom" est obligatoire');
  if (!telephone)
    throw new ApiError(400, 'Le champ "telephone" est obligatoire');
  if (!motDePasse)
    throw new ApiError(400, 'Le champ "motDePasse" est obligatoire');

  const exists = db.users.find((u) => u.telephone === telephone);
  if (exists) throw new ApiError(409, "Un compte existe déjà avec ce numéro");

  const motDePasseHash = await bcrypt.hash(motDePasse, 10);
  const user = {
    id: db.users.length + 1,
    nom,
    telephone,
    motDePasseHash,
    role: "citoyen",
  };
  db.users.push(user);
  return { id: user.id, nom: user.nom, role: user.role };
}

// US-02 / US-03 — Connexion citoyen ou agent
export async function login({ telephone, motDePasse } = {}) {
  if (!telephone)
    throw new ApiError(400, 'Le champ "telephone" est obligatoire');
  if (!motDePasse)
    throw new ApiError(400, 'Le champ "motDePasse" est obligatoire');

  const user = db.users.find((u) => u.telephone === telephone);
  if (!user) throw new ApiError(404, "Utilisateur introuvable");

  const valid = await bcrypt.compare(motDePasse, user.motDePasseHash);
  if (!valid) throw new ApiError(401, "Identifiants incorrects");

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "7d",
    },
  );
  return { token, user: { id: user.id, nom: user.nom, role: user.role } };
}

export async function loginAgent({ telephone, motDePasse } = {}) {
  if (!telephone)
    throw new ApiError(400, 'Le champ "telephone" est obligatoire');
  if (!motDePasse)
    throw new ApiError(400, 'Le champ "motDePasse" est obligatoire');

  const user = db.users.find((u) => u.telephone === telephone);
  if (!user) throw new ApiError(404, "Identifiants incorrects");
  if (user.role !== "agent")
    throw new ApiError(403, "Accès réservé aux agents");

  const valid = await bcrypt.compare(motDePasse, user.motDePasseHash);
  if (!valid) throw new ApiError(401, "Identifiants incorrects");

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "7d",
    },
  );
  return { token, user: { id: user.id, nom: user.nom, role: user.role } };
}
