import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import MyReports from './pages/MyReports.jsx'
import ReportDetail from './pages/ReportDetail.jsx'
import NewReport from './pages/NewReport.jsx'
import AgentReports from './pages/AgentReports.jsx'
import AgentLogin from './pages/AgentLogin.jsx'

function Home() {
  return (
    <main className="welcome-screen w-full min-h-screen px-6 py-12 flex flex-col justify-between items-center">
      <section className="welcome-brand max-w-md w-full mx-auto flex flex-1 flex-col items-center justify-center text-center">
        <div className="welcome-icon" aria-hidden="true">
          <svg viewBox="0 0 120 120" className="welcome-waves">
            <circle cx="60" cy="60" r="58" /><circle cx="60" cy="60" r="47" />
            <circle cx="60" cy="60" r="35" /><circle cx="60" cy="60" r="24" />
            <path d="m65 31-22 34h17l-5 25 25-39H63z" className="welcome-bolt" />
          </svg>
        </div>
        <h1 className="welcome-logo mt-6 mb-3">E2C<span>.</span></h1>
        <div className="welcome-tagline space-y-2 text-center text-gray-200">
          <p>Signaler, suivre,</p>
          <p>être informé.</p>
        </div>
      </section>
      <section className="welcome-actions w-full max-w-sm mx-auto mt-auto space-y-4 pt-8 text-center">
        <Link to="/login" className="welcome-cta py-4 rounded-xl font-bold w-full shadow-lg shadow-yellow-500/10">Commencer <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></Link>
        <p className="welcome-signup">Déjà un compte ? <Link to="/login">Se connecter</Link></p>
        <Link to="/agent/connexion" className="welcome-agent">Accès agent E2C</Link>
      </section>
    </main>
  )
}

export default function App() {
  return (
    <div className="app-shell h-screen w-full relative flex flex-col overflow-x-hidden overflow-y-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/agent/connexion" element={<AgentLogin />} />
        <Route path="/mes-signalements" element={<MyReports />} />
        <Route path="/mes-signalements/:id" element={<ReportDetail />} />
        <Route path="/nouveau-signalement" element={<NewReport />} />
        <Route path="/agent" element={<AgentReports />} />
      </Routes>
    </div>
  )
}