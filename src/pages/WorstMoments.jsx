import { Link } from 'react-router-dom'
import CrisisResources from '../components/CrisisResources.jsx'
import FounderCard from '../components/FounderCard.jsx'
import { worstMoments } from '../content/worst-moments.js'

export default function WorstMoments() {
  return (
    <div className="page">
      <h1>{worstMoments.title}</h1>
      <p>{worstMoments.intro}</p>

      {/* Crisis numbers first: someone on this page may be in danger. */}
      <CrisisResources />

      <FounderCard paragraphs={worstMoments.validation} />
      <FounderCard paragraphs={worstMoments.hope} />

      <article className="card">
        <h3>{worstMoments.nextStep.title}</h3>
        <p className="muted" style={{ margin: 0 }}>{worstMoments.nextStep.body}</p>
      </article>

      <Link to="/sos" className="btn btn--block">{worstMoments.sosLink}</Link>
    </div>
  )
}
