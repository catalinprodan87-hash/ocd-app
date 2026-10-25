import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAll } from '../db/db.js'
import { compulsions, typeById } from '../content/compulsions.js'

const text = compulsions.inventory

// The person's own list of compulsions, grouped visible / mental.
export default function Inventory() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    getAll('compulsions')
      .then((all) => setItems(all.sort((a, b) => a.createdAt.localeCompare(b.createdAt))))
      .catch(() => setItems([]))
  }, [])

  if (items === null) return null

  const visible = items.filter((c) => c.kind === 'visible')
  const mental = items.filter((c) => c.kind === 'mental')

  return (
    <div className="page">
      <h1>{text.title}</h1>
      <p>{text.intro}</p>

      <Link to="/compulsii/inventar/nou" className="btn btn--block" style={{ marginBottom: 'var(--space-5)' }}>
        {text.add}
      </Link>

      {items.length === 0 && <p className="muted">{text.empty}</p>}
      {visible.length > 0 && <Group title={text.visibleTitle} items={visible} />}
      {mental.length > 0 && <Group title={text.mentalTitle} items={mental} />}

      <Link to="/compulsii" className="btn btn--ghost btn--block">{compulsions.backToModule}</Link>
    </div>
  )
}

function Group({ title, items }) {
  return (
    <>
      <h2>{title}</h2>
      <ul className="link-list">
        {items.map((c) => (
          <li key={c.id}>
            <Link to={`/compulsii/inventar/${c.id}`} className="link-card">
              <span className="link-card__title">{c.label}</span>
              {c.category && <span className="link-card__summary">{typeById(c.category)?.title}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
