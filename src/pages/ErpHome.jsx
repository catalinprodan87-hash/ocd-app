import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ContentBlocks from '../components/ContentBlocks.jsx'
import { getAll } from '../db/db.js'
import { startSession } from '../lib/sessions.js'
import { erp } from '../content/erp.js'
import './Erp.css'

const RECENT_COUNT = 5

// ERP home: unfinished session (if any), the ladder from easiest to hardest, recent sessions.
export default function ErpHome() {
  const navigate = useNavigate()
  const [items, setItems] = useState(null)
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    Promise.all([getAll('ladderItems'), getAll('sessions')])
      .then(([ladder, all]) => {
        setItems(ladder.sort((a, b) => a.level - b.level))
        setSessions(all.sort((a, b) => b.startedAt.localeCompare(a.startedAt)))
      })
      .catch(() => setItems([]))
  }, [])

  if (items === null) return null

  const unfinished = sessions.filter((s) => s.step !== 'done')
  const recent = sessions.filter((s) => s.step === 'done').slice(0, RECENT_COUNT)

  async function begin(item) {
    const session = await startSession(item)
    navigate(`/expunere/sesiune/${session.id}`)
  }

  return (
    <div className="page">
      <h1>{erp.title}</h1>
      <ContentBlocks blocks={erp.intro} />

      {unfinished.map((s) => (
        <section key={s.id} className="card resume-card">
          <h2>{erp.session.resumeTitle}</h2>
          <p>{s.item.description}</p>
          <Link to={`/expunere/sesiune/${s.id}`} className="btn btn--block">{erp.session.resume}</Link>
        </section>
      ))}

      <h2>{erp.ladder.title}</h2>
      <p>{erp.ladder.intro}</p>

      {items.length === 0 && <p className="muted">{erp.ladder.empty}</p>}
      <ol className="ladder">
        {items.map((item) => (
          <li key={item.id} className="ladder__item">
            <span className="ladder__level" aria-label={erp.ladder.levelLabel(item.level)}>{item.level}</span>
            <div className="ladder__body">
              <p className="ladder__text">{item.description}</p>
              <div className="ladder__actions">
                <button className="btn" onClick={() => begin(item)}>{erp.ladder.start}</button>
                <Link to={`/expunere/treapta/${item.id}`} className="btn btn--ghost">{erp.ladder.edit}</Link>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <Link to="/expunere/treapta/nou" className="btn btn--ghost btn--block">{erp.ladder.add}</Link>

      {recent.length > 0 && (
        <>
          <h2 style={{ marginTop: 'var(--space-6)' }}>{erp.history.title}</h2>
          {recent.map((s) => (
            <article key={s.id} className="card">
              <p className="muted" style={{ marginBottom: 'var(--space-2)' }}>
                {new Date(s.completedAt).toLocaleDateString('ro-RO')} · {erp.session.level(s.item.level)}
              </p>
              <p style={{ fontWeight: 600 }}>{s.item.description}</p>
              {s.reflection.whatLearned && (
                <p style={{ margin: 0 }}><span className="muted">{erp.history.learned}</span> {s.reflection.whatLearned}</p>
              )}
            </article>
          ))}
        </>
      )}
    </div>
  )
}
