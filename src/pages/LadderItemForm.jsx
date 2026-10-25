import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import RatingSlider from '../components/RatingSlider.jsx'
import { get, put, remove, newId } from '../db/db.js'
import { erp } from '../content/erp.js'

const text = erp.itemForm

// Add (/expunere/treapta/nou) or edit (/expunere/treapta/<id>) one ladder step.
export default function LadderItemForm() {
  const { id } = useParams()
  // key: a different step gets a fresh form, never the previous one's values.
  return <Form key={id ?? 'new'} id={id} />
}

function Form({ id }) {
  const navigate = useNavigate()
  const isNew = !id

  const [existing, setExisting] = useState(isNew ? {} : null) // null = loading, false = not found
  const [description, setDescription] = useState('')
  const [level, setLevel] = useState(50)
  const [error, setError] = useState('')
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  useEffect(() => {
    if (isNew) return
    get('ladderItems', id)
      .then((item) => {
        setExisting(item ?? false)
        if (item) {
          setDescription(item.description)
          setLevel(item.level)
        }
      })
      .catch(() => setExisting(false))
  }, [id, isNew])

  if (existing === null) return null
  if (existing === false) return <Navigate to="/expunere" replace />

  async function save(e) {
    e.preventDefault()
    if (!description.trim()) return setError(text.descriptionRequired)
    const now = new Date().toISOString()
    await put('ladderItems', {
      id: existing.id ?? newId(),
      description: description.trim(),
      level,
      createdAt: existing.createdAt ?? now,
      updatedAt: now,
    })
    navigate('/expunere', { replace: true })
  }

  async function handleDelete() {
    if (!confirmingDelete) return setConfirmingDelete(true)
    // Past sessions keep their own copy of the step, so history stays readable.
    await remove('ladderItems', existing.id)
    navigate('/expunere', { replace: true })
  }

  return (
    <div className="page">
      <h1>{isNew ? text.newTitle : text.editTitle}</h1>
      <form onSubmit={save} noValidate>
        <label className="field-label" htmlFor="l-desc">{text.descriptionField}</label>
        <textarea
          id="l-desc"
          className="input"
          rows={3}
          value={description}
          onChange={(e) => {
            setError('')
            setDescription(e.target.value)
          }}
          placeholder={text.descriptionPlaceholder}
          aria-invalid={!!error}
          aria-describedby={error ? 'l-desc-error' : undefined}
        />
        {error && <p id="l-desc-error" className="field-error">{error}</p>}

        <RatingSlider
          id="l-level"
          label={text.ratingField}
          value={level}
          onChange={setLevel}
          minLabel={erp.scale.min}
          maxLabel={erp.scale.max}
        />

        <div className="stack">
          <button type="submit" className="btn btn--block">{text.save}</button>
          <button type="button" className="btn btn--ghost btn--block" onClick={() => navigate(-1)}>{text.cancel}</button>
          {!isNew && (
            <button type="button" className="btn btn--ghost btn--block" onClick={handleDelete}>
              {confirmingDelete ? text.deleteConfirm : text.delete}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
