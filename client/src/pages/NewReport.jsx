// US-04 à US-10 — Créer un signalement (type, description, photo, adresse) + référence unique
export default function NewReport() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-lg font-semibold text-navy mb-4">Signaler un incident</h1>
      {/* TODO: formulaire + appel API POST /api/reports (multipart pour la photo) */}
    </div>
  )
}
