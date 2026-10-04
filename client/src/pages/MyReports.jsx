import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// US-11 — Liste des signalements du citoyen
export default function MyReports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setError('Vous devez être connecté pour consulter vos signalements.')
      setLoading(false)
      return
    }

    fetch('http://localhost:4000/api/reports/mine', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Impossible de récupérer vos signalements.')
        }

        return response.json()
      })
      .then((data) => {
        setReports(data)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <p className="text-gray-600">Chargement de vos signalements...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <h1 className="text-lg font-semibold text-navy mb-4">
          Mes signalements
        </h1>

        <p className="text-red-600">{error}</p>

        <Link
          to="/login"
          className="inline-block mt-4 px-4 py-2 rounded-lg bg-yellow text-navy font-medium"
        >
          Se connecter
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold text-navy mb-6">
        Mes signalements
      </h1>

      {reports.length === 0 ? (
        <div className="border border-gray-200 rounded-xl p-6 bg-white">
          <p className="text-gray-600">
            Aucun signalement pour le moment.
          </p>

          <Link
            to="/nouveau-signalement"
            className="inline-block mt-4 px-4 py-2 rounded-lg bg-yellow text-navy font-medium"
          >
            Faire un signalement
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Link
              key={report.id}
              to={`/mes-signalements/${report.id}`}
              className="block border border-gray-200 rounded-xl p-4 bg-white hover:border-navy transition"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold text-navy">
                    {report.reference}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {report.type}
                  </p>

                  <p className="text-sm text-gray-600">
                    {report.adresse}
                  </p>
                </div>

                <span className="text-sm font-medium whitespace-nowrap">
                  {report.statut}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}