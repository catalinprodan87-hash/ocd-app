import { Link } from 'react-router-dom'
import { ui } from '../content/ui.js'

export default function Home() {
  const { home } = ui.pages
  return (
    <div className="page">
      <h1>{home.title}</h1>
      <p>{home.intro}</p>
      <Link to="/setari" className="btn btn--ghost">{ui.nav.settings}</Link>
    </div>
  )
}
