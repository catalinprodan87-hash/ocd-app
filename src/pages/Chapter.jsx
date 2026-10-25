import { Link, Navigate, useParams } from 'react-router-dom'
import FounderCard from '../components/FounderCard.jsx'
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

      {chapter.blocks.map((block, i) => <Block key={i} block={block} />)}

      <nav className="chapter-nav">
        {next && <Link to={`/invata/${next.id}`} className="btn btn--block">{learn.next}</Link>}
        {prev && <Link to={`/invata/${prev.id}`} className="btn btn--ghost btn--block">{learn.previous}</Link>}
        <Link to="/invata" className="btn btn--ghost btn--block">{learn.backToList}</Link>
      </nav>
    </div>
  )
}

function Block({ block }) {
  switch (block.type) {
    case 'heading':
      return <h2>{block.text}</h2>
    case 'list':
      return (
        <ul className="chapter__list">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )
    case 'founder':
      return <FounderCard paragraphs={block.paragraphs} />
    case 'text':
    default:
      return <p>{block.text}</p>
  }
}
