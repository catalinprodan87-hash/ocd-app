import { crisisResources, crisisHeading } from '../config/crisis.js'
import './CrisisResources.css'

// Tap-to-call crisis numbers. Used on SOS, the worst-moments section and after a safety flag.
export default function CrisisResources() {
  return (
    <section className="crisis" aria-labelledby="crisis-heading">
      <h2 id="crisis-heading" className="crisis__heading">{crisisHeading}</h2>
      <ul className="crisis__list">
        {crisisResources.map((r) => (
          <li key={r.id}>
            <a className="crisis__call" href={`tel:${r.tel}`}>
              <span className="crisis__name">{r.name}</span>
              {r.name !== r.number && <span className="crisis__number">{r.number}</span>}
            </a>
            <p className="crisis__desc">{r.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
