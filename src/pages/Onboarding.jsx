import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import CrisisResources from '../components/CrisisResources.jsx'
import { getMeta, setMeta, requestPersistentStorage } from '../db/db.js'
import { onboarding as text } from '../content/onboarding.js'
import { disclaimer } from '../content/disclaimer.js'
import './Onboarding.css'

// Step names double as URL parts: /incepe/bun-venit, /incepe/avertisment, …
const STEPS = ['bun-venit', 'avertisment', 'teme', 'siguranta']

export default function Onboarding({ onDone }) {
  const { step } = useParams()
  const navigate = useNavigate()
  const [accepted, setAccepted] = useState(null) // has the disclaimer been accepted?

  useEffect(() => {
    getMeta('disclaimerAcceptedAt').then((v) => setAccepted(!!v)).catch(() => setAccepted(false))
  }, [])

  const index = STEPS.indexOf(step)
  if (index === -1) return <Navigate to="/incepe/bun-venit" replace />
  if (accepted === null) return null
  // Nobody gets past the disclaimer without tapping "Înțeleg" (even by typing a URL).
  if (index > 1 && !accepted) return <Navigate to="/incepe/avertisment" replace />

  const goTo = (i) => navigate(`/incepe/${STEPS[i]}`)
  const next = () => goTo(index + 1)

  async function acceptDisclaimer() {
    await setMeta('disclaimerAcceptedAt', new Date().toISOString())
    setAccepted(true)
    next()
  }

  async function finish() {
    await setMeta('onboardingDoneAt', new Date().toISOString())
    requestPersistentStorage() // first real data saved → ask the browser to keep it
    onDone()
    navigate('/', { replace: true })
  }

  return (
    <div className="page onboarding">
      <p className="onboarding__progress muted">{text.stepLabel(index + 1, STEPS.length)}</p>

      {step === 'bun-venit' && <WelcomeStep onNext={next} />}
      {step === 'avertisment' && <DisclaimerStep onAccept={acceptDisclaimer} />}
      {step === 'teme' && <ThemesStep onNext={next} />}
      {step === 'siguranta' && <SafetyStep onFinish={finish} />}

      {index > 0 && (
        <button className="btn btn--ghost onboarding__back" onClick={() => goTo(index - 1)}>
          {text.back}
        </button>
      )}
    </div>
  )
}

function WelcomeStep({ onNext }) {
  return (
    <>
      <h1>{text.welcome.title}</h1>
      <p>{text.welcome.body}</p>
      <p className="muted">{text.welcome.privacy}</p>
      <button className="btn btn--block" onClick={onNext}>{text.next}</button>
    </>
  )
}

function DisclaimerStep({ onAccept }) {
  return (
    <>
      <h1>{disclaimer.title}</h1>
      <div className="card">
        {disclaimer.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <button className="btn btn--block" onClick={onAccept}>{disclaimer.acceptButton}</button>
    </>
  )
}

function ThemesStep({ onNext }) {
  const [selected, setSelected] = useState([])
  const [otherText, setOtherText] = useState('')

  // Pre-fill if the person comes back to this step.
  useEffect(() => {
    getMeta('selectedThemes').then((v) => v && setSelected(v))
    getMeta('otherThemeText').then((v) => v && setOtherText(v))
  }, [])

  function toggle(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }

  async function save() {
    await setMeta('selectedThemes', selected)
    await setMeta('otherThemeText', selected.includes('other') ? otherText.trim() : '')
    onNext()
  }

  return (
    <>
      <h1>{text.themes.title}</h1>
      <p>{text.themes.body}</p>

      <div className="chip-list">
        {text.themes.options.map((o) => (
          <label key={o.id} className={'chip' + (selected.includes(o.id) ? ' is-selected' : '')}>
            <input type="checkbox" checked={selected.includes(o.id)} onChange={() => toggle(o.id)} />
            {o.label}
          </label>
        ))}
      </div>

      {selected.includes('other') && (
        <textarea
          className="input"
          rows={3}
          value={otherText}
          onChange={(e) => setOtherText(e.target.value)}
          placeholder={text.themes.otherPlaceholder}
          aria-label={text.themes.otherPlaceholder}
        />
      )}

      {selected.length === 0 && <p className="muted">{text.themes.noneSelectedHint}</p>}
      <button className="btn btn--block" onClick={save}>{text.next}</button>
    </>
  )
}

function SafetyStep({ onFinish }) {
  // The answer is kept only in memory while this screen is open — never saved.
  const [flagged, setFlagged] = useState(false)
  const s = text.safety

  if (flagged) {
    return (
      <>
        <h1>{s.flagged.title}</h1>
        <p>{s.flagged.body}</p>
        <CrisisResources />
        <button className="btn btn--block" onClick={onFinish}>{s.flagged.continue}</button>
      </>
    )
  }

  return (
    <>
      <h1>{s.title}</h1>
      <p>{s.question}</p>
      <p className="muted">{s.privacyNote}</p>
      <div className="stack">
        <button className="btn btn--ghost btn--block" onClick={() => setFlagged(true)}>{s.answers.yes}</button>
        <button className="btn btn--ghost btn--block" onClick={onFinish}>{s.answers.no}</button>
        {/* Not sure → show the help anyway. */}
        <button className="btn btn--ghost btn--block" onClick={() => setFlagged(true)}>{s.answers.skip}</button>
      </div>
    </>
  )
}
