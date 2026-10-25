import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BottomNav from './BottomNav.jsx'
import SosButton from './SosButton.jsx'
import { ui } from '../content/ui.js'

// Wraps every screen: page content + bottom navigation + the floating SOS button.
// Because SOS lives here, it is one tap away on every screen automatically.
// During onboarding showNav is false: no bottom nav, so SOS and the
// worst-moments page get a back button instead (installed apps on iPhone have none).
export default function Layout({ showNav = true }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onSos = pathname === '/sos'
  const needsBack = !showNav && !pathname.startsWith('/incepe')

  function goBack() {
    // react-router stores the history position in idx; 0 means we'd leave the app.
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate('/')
  }

  return (
    <>
      {needsBack && (
        <button className="btn btn--ghost back-button" onClick={goBack}>{ui.back}</button>
      )}
      <main>
        <Outlet />
      </main>
      {!onSos && <SosButton />}
      {showNav && <BottomNav />}
    </>
  )
}
