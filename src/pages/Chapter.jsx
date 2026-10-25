import { Link, Navigate, useParams } from 'react-router-dom'
import ContentBlocks from '../components/ContentBlocks.jsx'
import RereadNudge from '../components/RereadNudge.jsx'
import { chapters, learn } from '../content/psychoeducation/index.js'
import './Learn.css'

export default function Chapter() {
  const { id } = useParams()
  const index = chapters.findIndex((c) => c.id === id)
  if (index === -1) return <Navigate to="/invata" replace />

  const chapter = chapters[index]
  const prev = chapters[index - 1]
  const next = chapters[index + 1]

  return (
    <div className="page">
      {/* key: a fresh nudge check each time a different chapter opens */}
      <RereadNudge key={chapter.id} contentId={`chapter:${chapter.id}`} />

      <p className="muted" style={{ marginBottom: 'var(--space-2)' }}>{learn.chapterLabel(index + 1)}</p>
      <h1>{chapter.title}</h1>

      <ContentBlocks blocks={chapter.blocks} />

      <nav className="chapter-nav">
        {next && <Link to={`/invata/${next.id}`} className="btn btn--block">{learn.next}</Link>}
        {prev && <Link to={`/invata/${prev.id}`} className="btn btn--ghost btn--block">{learn.previous}</Link>}
        <Link to="/invata" className="btn btn--ghost btn--block">{learn.backToList}</Link>
      </nav>
    </div>
  )
}
