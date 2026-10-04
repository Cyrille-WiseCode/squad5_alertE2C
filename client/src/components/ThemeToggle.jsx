import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext.jsx'

export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme, flashActive } = useTheme()
  const dark = theme === 'dark'
  return (
    <button type="button" onClick={toggleTheme} disabled={flashActive} aria-label={dark ? 'Activer le thème clair' : 'Activer le thème sombre'} title={dark ? 'Thème clair' : 'Thème sombre'} className={`theme-toggle-button inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white/80 text-[#1B1F3B] transition hover:bg-gray-50 disabled:cursor-wait dark:border-white/10 dark:bg-[#1B1F3B]/80 dark:text-gray-100 dark:hover:bg-white/10 ${flashActive ? 'theme-toggle-flashing' : ''} ${compact ? 'h-9 w-9' : 'gap-2 px-3 py-2 text-sm font-medium'}`}>
      {dark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
      {!compact && <span>{dark ? 'Clair' : 'Sombre'}</span>}
    </button>
  )
}
