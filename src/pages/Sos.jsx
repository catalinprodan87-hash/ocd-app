import { Link } from 'react-router-dom'
import CrisisResources from '../components/CrisisResources.jsx'
import { sos } from '../content/sos.js'
import './Sos.css'

export default function Sos() {
  return (
    <div className="page">
      <h1>{sos.title}</h1>
      <p>{sos.intro}</p>

      <CrisisResources />

      {/* One skill open at a time keeps the screen calm: titles first, details on tap. */}
      <div className="sos-skills">
        {sos.skills.map((s) => (
          <details key={s.id} name="sos-skill" className="sos-skill">
            <summary className="sos-skill__title">{s.title}</summary>
            <p className="sos-skill__body">{s.body}</p>
          </details>
        ))}
      </div>

      <Link to="/cel-mai-greu-moment" className="btn btn--ghost btn--block">
        {sos.worstLink}
      </Link>

      <p className="sos-disclaimer muted">{sos.disclaimerShort}</p>
    </div>
  )
}
