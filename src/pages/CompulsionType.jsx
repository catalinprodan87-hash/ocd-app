import { Link, Navigate, useParams } from 'react-router-dom'
import ContentBlocks from '../components/ContentBlocks.jsx'
import RereadNudge from '../components/RereadNudge.jsx'
import { compulsions as text, typeById } from '../content/compulsions.js'

// One compulsion type: what it is, what to do instead, and a shortcut to add it
// to the personal inventory (pre-filled with this type).
export default function CompulsionType() {
  const { id } = useParams()
  const type = typeById(id)
  if (!type) return <Navigate to="/compulsii" replace />

  return (
    <div className="page">
      {/* Learning content, so the same re-read nudge as chapters applies. */}
      <RereadNudge key={type.id} contentId={`compulsion:${type.id}`} />

      <p className="muted" style={{ marginBottom: 'var(--space-2)' }}>
        {type.kind === 'mental' ? text.mentalTitle : text.visibleTitle}
      </p>
      <h1>{type.title}</h1>
      <ContentBlocks blocks={type.body} />

      <h2>{text.insteadTitle}</h2>
      <ContentBlocks blocks={type.instead ?? text.insteadDefault} />

      <div className="stack" style={{ marginTop: 'var(--space-5)' }}>
        <Link to={`/compulsii/inventar/nou?tip=${type.id}`} className="btn btn--block">{text.addToInventory}</Link>
        <Link to="/compulsii" className="btn btn--ghost btn--block">{text.backToModule}</Link>
      </div>
    </div>
  )
}
