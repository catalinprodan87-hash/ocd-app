import { Link } from 'react-router-dom'
import { ui } from '../content/ui.js'

export default function Home() {
  const { home } = ui.pages
  return (
    <div className="page stack">
      <div>
        <h1>{home.title}</h1>
        <p>{home.intro}</p>
      </div>
      <Link to="/cel-mai-greu-moment" className="btn btn--ghost btn--block">{home.worstLink}</Link>
      <Link to="/setari" className="btn btn--ghost">{ui.nav.settings}</Link>
    </div>
  )
}
