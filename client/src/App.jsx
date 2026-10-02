import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import MyReports from './pages/MyReports.jsx'
import NewReport from './pages/NewReport.jsx'
import AgentReports from './pages/AgentReports.jsx'

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-bold text-navy">ALERT E2C</h1>
      <p className="text-sm text-gray-600">Signaler, suivre, être informé.</p>
      <div className="flex gap-3">
        <Link to="/login" className="px-4 py-2 rounded-lg bg-yellow text-navy font-medium">
          Connexion
        </Link>
        <Link to="/register" className="px-4 py-2 rounded-lg border border-navy text-navy">
          Créer un compte
        </Link>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mes-signalements" element={<MyReports />} />
      <Route path="/nouveau-signalement" element={<NewReport />} />
      <Route path="/agent" element={<AgentReports />} />
    </Routes>
  )
}
