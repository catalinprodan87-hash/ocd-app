import { Link } from 'react-router-dom'
import { chapters, learn } from '../content/psychoeducation/index.js'
import './Learn.css'

// Chapter list. Deliberately no "read ✓" marks or progress bar: those invite
// "I must finish / re-read to be sure" — a perfectionism trap (spec core principle).
export default function Learn() {
  return (
    <div className="page">
      <h1>{learn.title}</h1>
      <p>{learn.intro}</p>
      <ol className="chapter-list">
        {chapters.map((c, i) => (
          <li key={c.id}>
            <Link to={`/invata/${c.id}`} className="chapter-link">
              <span className="chapter-link__label">{learn.chapterLabel(i + 1)}</span>
              <span className="chapter-link__title">{c.title}</span>
              <span className="chapter-link__summary">{c.summary}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
