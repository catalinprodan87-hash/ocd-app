import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ScoreChart from '../components/ScoreChart.jsx'
import { getAll } from '../db/db.js'
import { getResults, MAX_SCORE } from '../lib/ocir.js'
import { progress as text } from '../content/progress.js'
import './Progress.css'

const BADGE_LEVELS = [20, 40, 60, 80, 100]
const Y_TICKS = [0, 18, 36, 54, 72]
const formatDate = (iso) => new Date(iso).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })
const formatFullDate = (iso) => new Date(iso).toLocaleDateString('ro-RO')

export default function Progress() {
  const [results, setResults] = useState(null)
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    Promise.all([getResults(), getAll('sessions')])
      .then(([r, s]) => {
        setResults(r)
        setSessions(s.filter((x) => x.step === 'done'))
      })
      .catch(() => setResults([]))
  }, [])

  if (results === null) return null

  const highest = Math.max(0, ...sessions.map((s) => s.item.level))
  const badges = BADGE_LEVELS.filter((level) => highest >= level).reverse()

  return (
    <div className="page">
      <h1>{text.title}</h1>
      <p>{text.intro}</p>

      <section className="card">
        <h2>{text.courage.title}</h2>
        {sessions.length === 0 ? (
          <p className="muted" style={{ margin: 0 }}>{text.courage.none}</p>
        ) : (
          <>
            <p>{text.courage.exposures(sessions.length)}</p>
            {badges.length > 0 && (
              <ul className="badges">
                {badges.map((level) => (
                  <li key={level} className="badge">
                    <span className="badge__level" aria-hidden="true">{level}</span>
                    <span>{text.courage.badge(level)}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>

      <section className="card">
        <h2>{text.ocir.title}</h2>
        <OcirSummary results={results} />
        <Link to="/progres/chestionar" className="btn btn--ghost btn--block">
          {results.length === 0 ? text.ocir.take : text.ocir.takeAgain}
        </Link>
      </section>
    </div>
  )
}

// The form follows the amount of data: nothing → invitation, 1 → one number, 2+ → chart.
function OcirSummary({ results }) {
  if (results.length === 0) return <p className="muted">{text.ocir.none}</p>

  if (results.length === 1) {
    const [r] = results
    return (
      <div className="hero-score">
        <p className="hero-score__value">{r.total} <span className="hero-score__max">{text.ocir.scoreOf(MAX_SCORE)}</span></p>
        <p className="muted">{text.ocir.single(formatFullDate(r.date))}</p>
      </div>
    )
  }

  const first = results[0]
  const last = results[results.length - 1]
  return (
    <>
      <ScoreChart
        points={results}
        max={MAX_SCORE}
        ticks={Y_TICKS}
        formatDate={formatDate}
        ariaLabel={text.ocir.chartLabel(first.total, last.total, results.length)}
      />
      <details className="score-table">
        <summary>{text.ocir.tableToggle}</summary>
        <table>
          <thead>
            <tr><th scope="col">{text.ocir.tableDate}</th><th scope="col">{text.ocir.tableScore}</th></tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}><td>{formatFullDate(r.date)}</td><td>{r.total}</td></tr>
            ))}
          </tbody>
        </table>
      </details>
    </>
  )
}
