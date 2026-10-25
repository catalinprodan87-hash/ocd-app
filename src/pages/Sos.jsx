import { Link } from 'react-router-dom'
import CrisisResources from '../components/CrisisResources.jsx'
import { sos } from '../content/sos.js'

export default function Sos() {
  return (
    <div className="page">
      <h1>{sos.title}</h1>
      <p>{sos.intro}</p>

      <CrisisResources />

      {sos.skills.map((s) => (
        <article key={s.id} className="card">
          <h3>{s.title}</h3>
          <p className="muted">{s.body}</p>
        </article>
      ))}

      <Link to="/cel-mai-greu-moment" className="btn btn--ghost btn--block">
        {sos.worstLink}
      </Link>

      <p className="muted" style={{ marginTop: 'var(--space-5)', fontSize: 'var(--text-sm)' }}>
        {sos.disclaimerShort}
      </p>
    </div>
  )
}
