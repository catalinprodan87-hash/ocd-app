import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ITEM_COUNT, MAX_SCORE, RETAKE_MIN_DAYS,
  daysSince, getDraft, getResults, saveDraft, saveResult,
} from '../lib/ocir.js'
import { ocir as text } from '../content/ocir.js'
import './Ocir.css'

const emptyAnswers = () => Array(ITEM_COUNT).fill(null)

// OCI-R questionnaire: intro → (gentle "too soon" note) → 18 questions → result.
export default function Ocir() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(null) // 'intro' | 'tooSoon' | 'questions' | 'result'
  const [answers, setAnswers] = useState(emptyAnswers)
  const [index, setIndex] = useState(0)
  const [hasDraft, setHasDraft] = useState(false)
  const [lastResult, setLastResult] = useState(null)
  const [result, setResult] = useState(null)
  const saving = useRef(false)

  useEffect(() => {
    Promise.all([getDraft(), getResults()]).then(([draft, results]) => {
      const last = results[results.length - 1] ?? null
      setLastResult(last)
      if (draft?.some((a) => a !== null)) {
        // Resume where they left off.
        setAnswers(draft)
        setHasDraft(true)
        setIndex(Math.max(0, draft.findIndex((a) => a === null)))
        setPhase('intro')
      } else if (last && daysSince(last.date) < RETAKE_MIN_DAYS) {
        setPhase('tooSoon')
      } else {
        setPhase('intro')
      }
    }).catch(() => setPhase('intro'))
  }, [])

  if (phase === null) return null

  async function answer(value) {
    if (saving.current) return
    const next = [...answers]
    next[index] = value
    setAnswers(next)

    if (index < ITEM_COUNT - 1) {
      saveDraft(next)
      setIndex(index + 1)
      return
    }
    // Last question: save the result (guarded against a double tap).
    saving.current = true
    try {
      setResult(await saveResult(next))
      setPhase('result')
    } finally {
      saving.current = false
    }
  }

  if (phase === 'tooSoon') {
    const days = daysSince(lastResult.date)
    return (
      <div className="page">
        <h1>{text.tooSoon.title}</h1>
        <p>{text.tooSoon.body(days)}</p>
        <div className="stack">
          <button className="btn btn--block" onClick={() => navigate('/progres')}>{text.tooSoon.notNow}</button>
          <button className="btn btn--ghost btn--block" onClick={() => setPhase('intro')}>{text.tooSoon.continueAnyway}</button>
        </div>
      </div>
    )
  }

  if (phase === 'intro') {
    return (
      <div className="page">
        <h1>{text.title}</h1>
        <p>{text.intro}</p>
        <p className="muted">{text.instruction}</p>
        <button className="btn btn--block" onClick={() => setPhase('questions')}>
          {hasDraft ? text.resume : text.start}
        </button>
      </div>
    )
  }

  if (phase === 'result') {
    return (
      <div className="page" role="status">
        <h1>{text.result.title}</h1>
        <p className="ocir-score">{text.result.score(result.total, MAX_SCORE)}</p>
        {lastResult && (
          <p className="muted">
            {text.result.previous(lastResult.total, new Date(lastResult.date).toLocaleDateString('ro-RO'))}
          </p>
        )}
        <p>{text.result.meaning}</p>
        <Link to="/progres" className="btn btn--block">{text.result.toProgress}</Link>
      </div>
    )
  }

  // phase === 'questions'
  return (
    <div className="page">
      <p className="muted" style={{ marginBottom: 'var(--space-2)' }}>{text.questionLabel(index + 1, ITEM_COUNT)}</p>
      <h1 className="ocir-question">{text.items[index]}</h1>

      <div className="ocir-options" role="group" aria-label={text.questionLabel(index + 1, ITEM_COUNT)}>
        {text.options.map((label, value) => (
          <button
            key={value}
            className="btn btn--ghost btn--block ocir-option"
            aria-pressed={answers[index] === value}
            onClick={() => answer(value)}
          >
            <span className="ocir-option__value">{value}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {index > 0 && (
        <button className="btn btn--ghost" onClick={() => setIndex(index - 1)}>{text.back}</button>
      )}
    </div>
  )
}
