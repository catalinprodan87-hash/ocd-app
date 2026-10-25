import CrisisResources from '../components/CrisisResources.jsx'
import { ui } from '../content/ui.js'

// Temporary screen for sections not built yet. Replaced feature by feature.
export default function Placeholder({ page, showCrisis = false }) {
  return (
    <div className="page">
      <h1>{page.title}</h1>
      <p>{page.intro}</p>
      {showCrisis && <CrisisResources />}
      <div className="card">
        <p className="muted" style={{ margin: 0 }}>{ui.comingSoon}</p>
      </div>
    </div>
  )
}
