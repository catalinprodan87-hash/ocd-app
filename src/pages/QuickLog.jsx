import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loadQuickLogChoices, logCompulsion, undoLog } from '../lib/quickLog.js'
import { quickLog as text } from '../content/quick-log.js'

// ~10-second log: (optionally) pick which compulsion, then one tap saves.
// Deliberately no notes, no list of past entries and no daily count here —
// any of those could turn logging into a ritual or a score to chase.
export default function QuickLog() {
  const navigate = useNavigate()
  const [choices, setChoices] = useState(null)
  const [selected, setSelected] = useState(null) // a compulsion, or null = not specified
  const [saved, setSaved] = useState(null) // the entry just saved
  const [undone, setUndone] = useState(false)
  const saving = useRef(false) // a fast double tap must not save twice

  useEffect(() => {
    loadQuickLogChoices().then(setChoices).catch(() => setChoices([]))
  }, [])

  if (choices === null) return null

  async function save(gaveIn) {
    if (saving.current) return
    saving.current = true
    try {
      setSaved(await logCompulsion(selected, gaveIn))
      setUndone(false)
    } finally {
      saving.current = false
    }
  }

  async function undo() {
    await undoLog(saved)
    setUndone(true)
  }

  function another() {
    setSaved(null)
    setUndone(false)
    setSelected(null)
    loadQuickLogChoices().then(setChoices).catch(() => {})
  }

  if (saved) {
    return (
      <div className="page" role="status">
        <h1>{undone ? text.saved.undone : text.saved.title}</h1>
        {!undone && <p>{text.saved.body}</p>}
        <div className="stack">
          <button className="btn btn--block" onClick={() => navigate('/')}>{text.saved.done}</button>
          <button className="btn btn--ghost btn--block" onClick={another}>{text.saved.another}</button>
          {!undone && <button className="btn btn--ghost btn--block" onClick={undo}>{text.saved.undo}</button>}
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>{text.title}</h1>

      <p className="field-label">{text.whichField}</p>
      {choices.length > 0 ? (
        <div className="chip-list">
          {choices.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={selected?.id === c.id}
              // Tapping the selected chip again un-selects it.
              onClick={() => setSelected(selected?.id === c.id ? null : c)}
            >
              {c.label}
            </button>
          ))}
        </div>
      ) : (
        <p className="muted">
          {text.emptyInventory} <Link to="/compulsii/inventar">{text.emptyInventoryLink}</Link>
        </p>
      )}

      <p className="field-label">{text.outcomeField}</p>
      {/* Both answers look exactly the same: neither is the "right" one to tap. */}
      <div className="stack">
        <button className="btn btn--ghost btn--block" onClick={() => save(false)}>{text.resisted}</button>
        <button className="btn btn--ghost btn--block" onClick={() => save(true)}>{text.gaveIn}</button>
      </div>
    </div>
  )
}
