import { Link } from 'react-router-dom'
import { ui } from '../content/ui.js'
import { quickLog } from '../content/quick-log.js'

export default function Home() {
  const { home } = ui.pages
  return (
    <div className="page stack">
      <div>
        <h1>{home.title}</h1>
        <p>{home.intro}</p>
      </div>
      {/* Quick log first: it has to be reachable in one tap to stay ~10 seconds. */}
      <Link to="/noteaza" className="btn btn--block">{quickLog.openButton}</Link>
      <Link to="/cel-mai-greu-moment" className="btn btn--ghost btn--block">{home.worstLink}</Link>
      <Link to="/setari" className="btn btn--ghost">{ui.nav.settings}</Link>
    </div>
  )
}
