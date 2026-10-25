import { Link } from 'react-router-dom'
import { ui } from '../content/ui.js'
import './SosButton.css'

export default function SosButton() {
  return (
    <Link to="/sos" className="sos-fab" aria-label={ui.sosButtonLabel}>
      {ui.sosButton}
    </Link>
  )
}
