import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// US-12 — Détail d'un signalement
// US-13 — Consultation du statut
export default function ReportDetail() {
  const { id } = useParams()

  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setError('Vous devez être connecté pour consulter ce signalement.')
      setLoading(false)
      return
    }

    fetch(`http://localhost:4000/api/reports/mine/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            'Impossible de récupérer le signalement.'
          )
        }

        return response.json()
      })
      .then((data) => {
        setReport(data)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <p className="text-gray-600">
          Chargement du signalement...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <p className="text-red-600">{error}</p>

        <Link
          to="/mes-signalements"
          className="inline-block mt-4 text-navy underline"
        >
          ← Retour à mes signalements
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <Link
        to="/mes-signalements"
        className="text-sm text-navy underline"
      >
        ← Retour à mes signalements
      </Link>

      <div className="mt-4 border border-gray-200 rounded-xl p-5 bg-white">
        <h1 className="text-xl font-semibold text-navy">
          {report.reference}
        </h1>

        <div className="mt-6 space-y-4">
          <div>
            <p className="font-semibold text-gray-700">
              Type
            </p>

            <p className="text-gray-600">
              {report.type}
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">
              Description
            </p>

            <p className="text-gray-600">
              {report.description}
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">
              Adresse
            </p>

            <p className="text-gray-600">
              {report.adresse}
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">
              Statut
            </p>

            <span className="inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              {report.statut}
            </span>
          </div>

          {report.photoUrl && (
            <div>
              <p className="font-semibold text-gray-700 mb-2">
                Photo
              </p>

              <img
                src={`http://localhost:4000${report.photoUrl}`}
                alt="Photo du signalement"
                className="max-w-full rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}