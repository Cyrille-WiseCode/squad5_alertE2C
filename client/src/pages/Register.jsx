import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerCitoyen } from "../lib/api.js";
import BrandPanel from "../components/BrandPanel.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErreur("");
    setChargement(true);
    try {
      await registerCitoyen({ nom, telephone, motDePasse });
      navigate("/login");
    } catch (err) {
      setErreur(err.response?.data?.error || "Inscription impossible");
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="auth-split h-screen w-full min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      <section className="auth-pane w-full flex flex-col justify-center min-h-screen p-4 md:h-full md:min-h-0 md:px-8 lg:px-16 md:overflow-y-auto">
        <div className="auth-card w-full max-w-md mx-auto p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-xl shadow-slate-200/50">
        <Link to="/" className="inline-flex mb-7" aria-label="Accueil E2C">
          <img src="/e2c-logo.svg" alt="E2C" className="w-32 h-auto" />
        </Link>

        <main className="auth-form-stage">
        <form onSubmit={onSubmit} className="auth-form w-full">
          <div className="auth-user-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 19v-1.4a6.5 6.5 0 0 1 13 0V19z"/></svg>
          </div>
          <p className="text-xs font-semibold text-blue tracking-wide uppercase mb-2">
            Rejoignez E2C
          </p>
          <h1 className="text-xl font-bold text-navy mb-2">
            L'énergie nous rapproche.
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Créez votre espace pour nous signaler un incident.
          </p>

          <label className="block text-xs text-gray-500 mb-2">
            Nom complet
          </label>
          <input
            type="text"
            required
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Ex. Amina Mbemba"
            className="auth-input w-full mb-4 bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-xl focus:bg-white"
          />

          <label className="block text-xs text-gray-500 mb-2">
            Numéro de téléphone
          </label>
          <div className="phone-field mb-4">
            <span className="phone-prefix">
              +242
            </span>
            <input
              type="tel"
              required
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="06 000 00 00"
              className="phone-input bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-xl focus:bg-white"
            />
          </div>

          <label className="block text-xs text-gray-500 mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            required
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className="auth-input w-full mb-4 bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-xl focus:bg-white"
          />

          {erreur && <p className="text-sm text-orange mb-4">{erreur}</p>}

          <button
            type="submit"
            disabled={chargement}
            className="auth-submit w-full bg-yellow text-navy font-semibold disabled:opacity-60"
          >
            <span>{chargement ? "Création..." : "Créer mon compte"}</span>
            {!chargement && <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>}
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
            Déjà un compte ? <Link to="/login" className="text-navy font-medium underline">Se connecter</Link>
          </p>
        </form>
        </main>
        </div>
      </section>
      <BrandPanel />
    </div>
  );
}
