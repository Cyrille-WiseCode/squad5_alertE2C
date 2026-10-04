import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClipboardList, Home, LogOut, User } from 'lucide-react'
import { setAuthToken, setAuthUser } from '../lib/api.js'
import ThemeToggle from './ThemeToggle.jsx'

export default function CitizenBottomNav({ active }) {
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)

  function logout() {
    setAuthToken(null)
    setAuthUser(null)
    navigate('/login', { replace: true })
  }

  const linkClass = (name) => `flex flex-col items-center ${active === name ? 'text-[#1B1F3B] dark:text-white' : 'text-gray-400 hover:text-[#1B1F3B] dark:text-gray-400 dark:hover:text-white'}`

  return (
    <>
      {profileOpen && (
        <div className="fixed bottom-[4.5rem] left-1/2 z-50 w-[calc(100%-2.5rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg dark:border-white/10 dark:bg-[#1B1F3B]">
          <p className="text-sm font-semibold text-[#1B1F3B] dark:text-gray-100">Votre espace citoyen</p>
          <button onClick={logout} className="mt-3 flex items-center gap-2 text-sm font-semibold text-red-600"><LogOut className="h-4 w-4" />Se déconnecter</button>
        </div>
      )}
      <nav aria-label="Navigation citoyen" className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex w-full max-w-md items-center justify-around border-t border-gray-200 bg-white/95 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-[#0E1226]/95 md:hidden">
        <Link to="/accueil" aria-current={active === 'home' ? 'page' : undefined} className={linkClass('home')}><Home className="h-5 w-5" /><span className="mt-1 text-[10px] font-semibold">Accueil</span></Link>
        <Link to="/mes-signalements" aria-current={active === 'reports' ? 'page' : undefined} className={linkClass('reports')}><ClipboardList className="h-5 w-5" /><span className="mt-1 text-[10px] font-semibold">Mes suivis</span></Link>
        <button type="button" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen} className={linkClass('profile')}><User className="h-5 w-5" /><span className="mt-1 text-[10px] font-semibold">Profil</span></button>
        <div className="flex flex-col items-center gap-1"><ThemeToggle compact /><span className="text-[10px] font-semibold text-gray-400 dark:text-gray-400">Thème</span></div>
      </nav>
    </>
  )
}
