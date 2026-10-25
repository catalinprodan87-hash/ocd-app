import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { get, put, remove, newId } from '../db/db.js'
import { compulsions, typeById } from '../content/compulsions.js'

const text = compulsions.inventory.form

// Add (/compulsii/inventar/nou[?tip=<typeId>]) or edit (/compulsii/inventar/<id>)
// one compulsion in the personal inventory.
export default function InventoryForm() {
  const { id } = useParams() // undefined on the "nou" route
  // key: a different compulsion gets a fresh form, never the previous one's values.
  return <Form key={id ?? 'new'} id={id} />
}

function Form({ id }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isNew = !id

  // Coming from a type page pre-fills its kind and category.
  const presetType = typeById(searchParams.get('tip'))

  const [existing, setExisting] = useState(isNew ? {} : null) // null = loading
  const [label, setLabel] = useState('')
  const [kind, setKind] = useState(presetType?.kind ?? '')
  const [category, setCategory] = useState(presetType?.id ?? '')
  const [instead, setInstead] = useState('')
  const [errors, setErrors] = useState({})
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  useEffect(() => {
    if (isNew) return
    get('compulsions', id)
      .then((c) => {
        setExisting(c ?? false) // false = not found
        if (c) {
          setLabel(c.label)
          setKind(c.kind)
          setCategory(c.category ?? '')
          setInstead(c.instead ?? '')
        }
      })
      .catch(() => setExisting(false))
  }, [id, isNew])

  if (existing === null) return null
  if (existing === false) return <Navigate to="/compulsii/inventar" replace />

  function changeKind(newKind) {
    setKind(newKind)
    // A "washing" category makes no sense on a mental compulsion: clear it.
    if (category && typeById(category)?.kind !== newKind) setCategory('')
  }

  async function save(e) {
    e.preventDefault()
    const newErrors = {}
    if (!label.trim()) newErrors.label = text.labelRequired
    if (!kind) newErrors.kind = text.kindRequired
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const now = new Date().toISOString()
    await put('compulsions', {
      id: existing.id ?? newId(),
      label: label.trim(),
      kind,
      category: category || null,
      instead: instead.trim(),
      createdAt: existing.createdAt ?? now,
      updatedAt: now,
    })
    navigate('/compulsii/inventar', { replace: true })
  }

  async function handleDelete() {
    if (!confirmingDelete) return setConfirmingDelete(true)
    await remove('compulsions', existing.id)
    navigate('/compulsii/inventar', { replace: true })
  }

  const categoryOptions = compulsions.types.filter((t) => t.kind === kind)

  return (
    <div className="page">
      <h1>{isNew ? text.newTitle : text.editTitle}</h1>

      <form onSubmit={save} noValidate>
        <label className="field-label" htmlFor="c-label">{text.labelField}</label>
        <input
          id="c-label"
          className="input"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder={text.labelPlaceholder}
          aria-invalid={!!errors.label}
          aria-describedby={errors.label ? 'c-label-error' : undefined}
        />
        {errors.label && <p id="c-label-error" className="field-error">{errors.label}</p>}

        <fieldset className="field-group">
          <legend className="field-label">{text.kindField}</legend>
          <label className="radio-row">
            <input type="radio" name="kind" checked={kind === 'visible'} onChange={() => changeKind('visible')} />
            {text.kindVisible}
          </label>
          <label className="radio-row">
            <input type="radio" name="kind" checked={kind === 'mental'} onChange={() => changeKind('mental')} />
            {text.kindMental}
          </label>
          {errors.kind && <p className="field-error">{errors.kind}</p>}
        </fieldset>

        {kind && (
          <>
            <label className="field-label" htmlFor="c-category">{text.categoryField}</label>
            <select id="c-category" className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">{text.categoryNone}</option>
              {categoryOptions.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
          </>
        )}

        <label className="field-label" htmlFor="c-instead">{text.insteadField}</label>
        <textarea
          id="c-instead"
          className="input"
          rows={3}
          value={instead}
          onChange={(e) => setInstead(e.target.value)}
          placeholder={text.insteadPlaceholder}
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
