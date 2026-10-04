import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { m } from 'framer-motion'
import { ChevronRight, ClipboardList, Zap } from 'lucide-react'
import { api, getAuthUser } from '../lib/api.js'
import CitizenBottomNav from '../components/CitizenBottomNav.jsx'
import CitizenDesktopHeader from '../components/CitizenDesktopHeader.jsx'
import ReportLocation from '../components/ReportLocation.jsx'

function statutStyle(statut) {
  if (statut === 'Résolu') return 'bg-green-100 text-green-800'
  if (statut === 'En cours') return 'bg-orange-100 text-orange-800'
  return 'bg-blue-100 text-blue-800'
}

function LatestReport({ report, loading }) {
  return (
    <m.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.1 }} className="rounded-3xl border border-white/90 bg-white/80 p-6 text-[#1B1F3B] shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl dark:border-white/10 dark:bg-[#1B1F3B]/80 dark:text-white dark:shadow-none" aria-labelledby="latest-report-heading">
      <h2 id="latest-report-heading" className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Dernier signalement</h2>
      {loading ? (
        <p className="text-sm text-gray-400 dark:text-gray-400">Chargement de vos signalements…</p>
      ) : report ? (
        <Link to={`/mes-signalements/${report.id}`} className="flex items-center justify-between gap-3">
          <span className="min-w-0"><span className="block truncate text-sm font-bold text-[#1B1F3B] dark:text-gray-100">{report.type}</span><ReportLocation report={report} className="mt-1 text-xs text-gray-500 dark:text-gray-400" /></span>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${statutStyle(report.statut)}`}>{report.statut}</span>
        </Link>
      ) : (
        <div className="rounded-xl border border-gray-100 bg-white/90 p-4 text-center text-xs text-gray-600 dark:border-white/10 dark:bg-[#1B1F3B]/80 dark:text-gray-300">Aucun signalement pour le moment.</div>
      )}
    </m.section>
  )
}

export default function CitizenHome() {
  const navigate = useNavigate()
  const user = getAuthUser()
  const [latestReport, setLatestReport] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('alert-e2c-token')) {
      navigate('/login', { replace: true })
      return
    }

    api.get('/reports/mine')
      .then(({ data }) => {
        const recent = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setLatestReport(recent[0] || null)
      })
      .catch(() => setLatestReport(null))
      .finally(() => setLoading(false))
  }, [navigate])

  const nom = user?.nom || user?.nomComplet || ''
  const prenom = nom.trim().split(/\s+/)[0] || ''
  const avatar = prenom.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen w-full">
      <div className="block md:hidden">
        <main className="relative mx-auto flex h-screen min-h-screen w-full max-w-md flex-col justify-between overflow-x-hidden overflow-y-auto bg-[#F7F6F0] p-5 pb-24 text-[#1B1F3B] shadow-xl dark:bg-[#0E1226] dark:text-white">
          <div>
            <header className="mb-7 flex items-center justify-between">
              <Link to="/accueil" className="flex items-center gap-2" aria-label="Accueil E2C">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B1F3B] text-white"><Zap className="h-5 w-5" /></span>
                <span className="text-xl font-extrabold tracking-tight">E2C<span className="text-[#F4B436]">.</span></span>
              </Link>
              <span aria-label={prenom ? `Profil de ${nom}` : 'Profil utilisateur'} className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-[#1B1F3B]">{avatar}</span>
            </header>

            <section className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Votre espace citoyen</p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight">Bonjour{prenom ? ` ${prenom}` : ''}.</h1>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Ensemble, rendons notre quartier éclairé.</p>
            </section>

            <m.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0 }} className="mb-4 rounded-3xl border border-white/90 bg-white/80 p-6 text-[#1B1F3B] shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl dark:border-white/10 dark:bg-[#1B1F3B]/80 dark:text-white dark:shadow-none">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2B4C9B]"><Zap className="h-5 w-5" /></span>
              <h2 className="text-base font-bold">Signaler un incident</h2>
              <p className="my-2 text-xs leading-relaxed text-gray-500 dark:text-gray-300">Une coupure, un câble dangereux ou un poteau endommagé ? Impliquez-vous.</p>
              <Link to="/nouveau-signalement" className="yellow-flash group mt-3 flex w-full items-center justify-between rounded-xl px-4 py-3 font-bold">Faire un signalement <ChevronRight className="flash-arrow h-5 w-5" /></Link>
            </m.section>

            <m.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.05 }} className="mb-6 rounded-3xl border border-white/90 bg-white/80 p-6 text-[#1B1F3B] shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl dark:border-white/10 dark:bg-[#1B1F3B]/80 dark:text-white dark:shadow-none">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-[#2B4C9B]"><ClipboardList className="h-5 w-5" /></span>
              <h2 className="text-base font-bold">Suivre mes signalements</h2>
              <p className="my-2 text-xs leading-relaxed text-gray-500 dark:text-gray-300">Retrouvez vos démarches et leur avancement.</p>
              <Link to="/mes-signalements" className="mt-3 block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold text-[#1B1F3B] transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-gray-100 dark:hover:bg-white/5">Voir mes suivis →</Link>
            </m.section>
            <LatestReport report={latestReport} loading={loading} />
          </div>
          <CitizenBottomNav active="home" />
        </main>
      </div>

      <div className="hidden min-h-screen bg-[#F7F6F0] text-[#1B1F3B] dark:bg-[#0E1226] dark:text-gray-100 md:block">
        <CitizenDesktopHeader active="home" />
        <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-8 py-8 md:grid-cols-2 lg:grid-cols-3">
          <section className="md:col-span-2 lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Votre espace citoyen</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight">Bonjour{prenom ? ` ${prenom}` : ''}.</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Ensemble, rendons notre quartier éclairé.</p>
          </section>
          <m.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0 }} className="rounded-3xl border border-white/90 bg-white/80 p-6 text-[#1B1F3B] shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl dark:border-white/10 dark:bg-[#1B1F3B]/80 dark:text-white dark:shadow-none">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#2B4C9B]"><Zap className="h-5 w-5" /></span>
            <h2 className="text-lg font-bold">Signaler un incident</h2>
            <p className="my-3 text-sm leading-relaxed text-gray-500 dark:text-gray-300">Une coupure, un câble dangereux ou un poteau endommagé ? Impliquez-vous.</p>
            <Link to="/nouveau-signalement" className="yellow-flash group mt-5 flex w-full items-center justify-between rounded-xl px-4 py-3.5 font-bold">Faire un signalement <ChevronRight className="flash-arrow h-5 w-5" /></Link>
          </m.section>
          <m.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.05 }} className="rounded-3xl border border-white/90 bg-white/80 p-6 text-[#1B1F3B] shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl dark:border-white/10 dark:bg-[#1B1F3B]/80 dark:text-white dark:shadow-none">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-[#2B4C9B]"><ClipboardList className="h-5 w-5" /></span>
            <h2 className="text-lg font-bold">Suivre mes signalements</h2>
            <p className="my-3 text-sm leading-relaxed text-gray-500 dark:text-gray-300">Retrouvez vos démarches et leur avancement.</p>
            <Link to="/mes-signalements" className="mt-5 block w-full rounded-xl border border-gray-200 px-4 py-3 text-center font-semibold text-[#1B1F3B] transition-colors hover:bg-gray-50 dark:border-white/10 dark:text-gray-100 dark:hover:bg-white/5">Voir mes suivis →</Link>
          </m.section>
          <LatestReport report={latestReport} loading={loading} />
        </main>
      </div>
    </div>
  )
}
