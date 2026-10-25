import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ContentBlocks from '../components/ContentBlocks.jsx'
import { count } from '../db/db.js'
import { compulsions as text } from '../content/compulsions.js'

// Module home: what compulsions are, the inventory entry point, then all types.
export default function Compulsions() {
  const [inventoryCount, setInventoryCount] = useState(null)

  useEffect(() => {
    count('compulsions').then(setInventoryCount).catch(() => setInventoryCount(0))
  }, [])

  const visible = text.types.filter((t) => t.kind === 'visible')
  const mental = text.types.filter((t) => t.kind === 'mental')

  return (
    <div className="page">
      <h1>{text.title}</h1>
      <ContentBlocks blocks={text.intro} />

      <section className="card">
        <h2>{text.inventory.title}</h2>
        <p className="muted">
          {inventoryCount === 0 ? text.inventory.empty : inventoryCount !== null && text.inventory.count(inventoryCount)}
        </p>
        <Link to="/compulsii/inventar" className="btn btn--block">{text.inventory.open}</Link>
      </section>

      <h2>{text.visibleTitle}</h2>
      <TypeList types={visible} />

      <h2>{text.mentalTitle}</h2>
      <p>{text.mentalIntro}</p>
      <TypeList types={mental} />
    </div>
  )
}

function TypeList({ types }) {
  return (
    <ul className="link-list">
      {types.map((t) => (
        <li key={t.id}>
          <Link to={`/compulsii/tip/${t.id}`} className="link-card">
            <span className="link-card__title">{t.title}</span>
            <span className="link-card__summary">{t.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
