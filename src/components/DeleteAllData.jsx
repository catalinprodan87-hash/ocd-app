import { useState } from 'react'
import { deleteEverything } from '../db/db.js'
import { settings } from '../content/settings.js'

const text = settings.deleteAll

// "Delete everything" with a confirmation step. Lives in Settings.
export default function DeleteAllData({ onDeleted }) {
  // 'idle'       → only the "Șterge toate datele" button is shown
  // 'confirming' → the question + "Da, șterge tot" / "Renunță" buttons are shown
  // 'done'       → a short "deleted" message
  const [step, setStep] = useState('idle')
  const [error, setError] = useState('')

  // Really deletes the database. Call this only once the person has confirmed.
  async function actuallyDelete() {
    try {
      await deleteEverything()
      setStep('done')
      onDeleted?.()
    } catch {
      setError(settings.error)
    }
  }

  // Runs when "Șterge toate datele" is tapped. One calm, in-page question —
  // deliberately not more elaborate, so confirming can't turn into a checking ritual.
  function handleDeleteClick() {
    setError('')
    setStep('confirming')
  }

  return (
    <section className="card">
      <h2>{text.title}</h2>
      <p>{text.body}</p>

      {step === 'idle' && (
        <button className="btn btn--ghost" onClick={handleDeleteClick}>{text.button}</button>
      )}

      {step === 'confirming' && (
        <div role="alertdialog" aria-label={text.confirmQuestion} className="stack">
          <p style={{ margin: 0, fontWeight: 600 }}>{text.confirmQuestion}</p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <button className="btn btn--danger" onClick={actuallyDelete}>{text.confirmButton}</button>
            <button className="btn btn--ghost" onClick={() => setStep('idle')}>{text.cancelButton}</button>
          </div>
        </div>
      )}

      {step === 'done' && <p className="muted" role="status" style={{ margin: 0 }}>{text.done}</p>}
      {error && <p role="alert" style={{ margin: 'var(--space-3) 0 0' }}>{error}</p>}
    </section>
  )
}
