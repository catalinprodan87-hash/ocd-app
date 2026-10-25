import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import ContentBlocks from '../components/ContentBlocks.jsx'
import RatingSlider from '../components/RatingSlider.jsx'
import { get, remove } from '../db/db.js'
import { saveSession, SESSION_STEPS } from '../lib/sessions.js'
import { erp } from '../content/erp.js'
import './Erp.css'

const text = erp.session

// Guided exposure: predict → expose & resist → reflect → done.
// The current step lives in the saved session, so leaving and coming back resumes it.
export default function ExposureSession() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [session, setSession] = useState(null) // null = loading, false = not found
  const [errors, setErrors] = useState({})

  useEffect(() => {
    get('sessions', id).then((s) => setSession(s ?? false)).catch(() => setSession(false))
  }, [id])

  if (session === null) return null
  if (session === false) return <Navigate to="/expunere" replace />

  // Every change is written straight to the database.
  function update(changes) {
    const next = { ...session, ...changes }
    setSession(next)
    saveSession(next)
    return next
  }

  function goToStep(step) {
    setErrors({})
    update({ step, ...(step === 'done' ? { completedAt: new Date().toISOString() } : {}) })
    window.scrollTo(0, 0)
  }

  async function abandon() {
    await remove('sessions', session.id)
    navigate('/expunere', { replace: true })
  }

  const stepNumber = SESSION_STEPS.indexOf(session.step) + 1
  const { prediction, reflection } = session

  return (
    <div className="page">
      {session.step !== 'done' && <p className="muted" style={{ marginBottom: 'var(--space-2)' }}>{text.stepLabel(stepNumber)}</p>}
      <p className="muted">{text.level(session.item.level)} · {session.item.description}</p>

      {session.step === 'predict' && (
        <>
          <h1>{text.predict.title}</h1>
          <label className="field-label" htmlFor="s-pred">{text.predict.predictionField}</label>
          <textarea
            id="s-pred"
            className="input"
            rows={3}
            value={prediction.text}
            onChange={(e) => {
              setErrors({})
              update({ prediction: { ...prediction, text: e.target.value } })
            }}
            placeholder={text.predict.predictionPlaceholder}
            aria-invalid={!!errors.prediction}
            aria-describedby={errors.prediction ? 's-pred-error' : undefined}
          />
          {errors.prediction && <p id="s-pred-error" className="field-error">{errors.prediction}</p>}

          <RatingSlider
            id="s-conf"
            label={text.predict.confidenceField}
            value={prediction.confidence}
            onChange={(v) => update({ prediction: { ...prediction, confidence: v } })}
            minLabel={text.predict.confidenceMin}
            maxLabel={text.predict.confidenceMax}
            suffix="%"
          />

          <div className="stack">
            <button
              className="btn btn--block"
              onClick={() => (prediction.text.trim() ? goToStep('expose') : setErrors({ prediction: text.predict.predictionRequired }))}
            >
              {text.predict.start}
            </button>
            <button className="btn btn--ghost btn--block" onClick={abandon}>{text.predict.abandon}</button>
          </div>
        </>
      )}

      {session.step === 'expose' && (
        <>
          <h1>{text.expose.title}</h1>
          {/* Deliberately no timer: the goal isn't waiting for anxiety to drop. */}
          <ContentBlocks blocks={text.expose.guidance} />
          <div className="session-prediction">
            <p className="muted" style={{ marginBottom: 'var(--space-1)' }}>{text.expose.yourPrediction}</p>
            <p>{prediction.text}</p>
          </div>
          <button className="btn btn--block" onClick={() => goToStep('reflect')}>{text.expose.done}</button>
        </>
      )}

      {session.step === 'reflect' && (
        <>
          <h1>{text.reflect.title}</h1>

          {/* Showing the prediction next to what happened is the core of inhibitory learning. */}
          <div className="session-prediction">
            <p className="muted" style={{ marginBottom: 'var(--space-1)' }}>{text.reflect.youPredicted}</p>
            <p style={{ marginBottom: 'var(--space-1)' }}>{prediction.text}</p>
            <p className="muted">{text.reflect.confidence(prediction.confidence)}</p>
          </div>

          <fieldset className="field-group">
            <legend className="field-label">{text.reflect.resistedField}</legend>
            <div className="choice-row">
              {['yes', 'partly', 'no'].map((value) => (
                <button
                  key={value}
                  type="button"
                  className="btn btn--ghost btn--block"
                  aria-pressed={session.resisted === value}
                  onClick={() => {
                    setErrors({})
                    update({ resisted: value })
                  }}
                >
                  {text.reflect.resisted[value]}
                </button>
              ))}
            </div>
            {errors.resisted && <p className="field-error">{errors.resisted}</p>}
          </fieldset>

          <label className="field-label" htmlFor="s-happened">{text.reflect.happenedField}</label>
          <textarea
            id="s-happened"
            className="input"
            rows={3}
            value={reflection.whatHappened}
            onChange={(e) => update({ reflection: { ...reflection, whatHappened: e.target.value } })}
          />

          <label className="field-label" htmlFor="s-learned">{text.reflect.learnedField}</label>
          <textarea
            id="s-learned"
            className="input"
            rows={3}
            value={reflection.whatLearned}
            onChange={(e) => update({ reflection: { ...reflection, whatLearned: e.target.value } })}
          />

          <button
            className="btn btn--block"
            onClick={() => (session.resisted ? goToStep('done') : setErrors({ resisted: text.reflect.resistedRequired }))}
          >
            {text.reflect.save}
          </button>
        </>
      )}

      {session.step === 'done' && (
        <>
          <h1>{text.done.title}</h1>
          <p style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{text.done.courage(session.item.level)}</p>
          <p>{text.done.byResisted[session.resisted]}</p>
          <Link to="/expunere" className="btn btn--block">{text.done.back}</Link>
        </>
      )}
    </div>
  )
}
