import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAgent, setAuthToken } from "../lib/api.js";
import BrandPanel from "../components/BrandPanel.jsx";

export default function AgentLogin() {
  const navigate = useNavigate();
  const [telephone, setTelephone] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErreur("");
    setChargement(true);
    try {
      const { token } = await loginAgent({ telephone, motDePasse });
      setAuthToken(token);
      navigate("/agent");
    } catch (err) {
      setErreur(err.response?.data?.error || "Connexion impossible");
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="auth-split agent-auth-split h-screen w-full min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      <section className="agent-auth-pane w-full min-h-screen flex flex-col justify-center items-center p-4 md:h-full md:min-h-0 md:px-8 lg:px-16 md:overflow-y-auto">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex mb-6" aria-label="Accueil E2C">
          <img src="/e2c-mark.svg" alt="" className="w-10 h-10 rounded-xl" />
        </Link>

        <form
          onSubmit={onSubmit}
          className="bg-[#222A4A]/70 backdrop-blur-md border border-white/10 shadow-2xl rounded-3xl p-8"
        >
          <p className="text-xs font-semibold text-yellow tracking-wide uppercase mb-2">
            Accès professionnel
          </p>
          <h1 className="text-xl font-bold text-white mb-2">Espace E2C.</h1>
          <p className="text-sm text-white/60 mb-6">
            Connectez-vous pour gérer les signalements de votre secteur.
          </p>

          <label className="block text-xs text-white/50 mb-1">
            Numéro de téléphone
          </label>
          <input
            type="tel"
            required
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-sm mb-4 placeholder:text-white/30"
          />

          <label className="block text-xs text-white/50 mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            required
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-sm mb-4"
          />

          {erreur && <p className="text-sm text-orange mb-4">{erreur}</p>}

          <button
            type="submit"
            disabled={chargement}
            className="w-full py-2.5 rounded-lg bg-yellow text-navy font-semibold disabled:opacity-60"
          >
            {chargement ? "Connexion..." : "Se connecter"}
          </button>

          <p className="text-center text-sm text-white/50 mt-4">
            <Link to="/login" className="underline">
              Accès citoyen
            </Link>
          </p>
        </form>
      </div>
      </section>
      <BrandPanel />
    </div>
  );
}
