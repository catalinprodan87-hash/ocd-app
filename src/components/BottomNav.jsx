import { NavLink } from 'react-router-dom'
import { ui } from '../content/ui.js'
import './BottomNav.css'

const ITEMS = [
  { to: '/', label: ui.nav.home, end: true },
  { to: '/invata', label: ui.nav.learn },
  { to: '/compulsii', label: ui.nav.compulsions },
  { to: '/expunere', label: ui.nav.erp },
  { to: '/progres', label: ui.nav.progress },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label={ui.navLabel}>
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => 'bottom-nav__item' + (isActive ? ' is-active' : '')}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
