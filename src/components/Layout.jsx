import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav.jsx'
import SosButton from './SosButton.jsx'

// Wraps every screen: page content + bottom navigation + the floating SOS button.
// Because SOS lives here, it is one tap away on every screen automatically.
export default function Layout() {
  const { pathname } = useLocation()
  const onSos = pathname === '/sos'

  return (
    <>
      <main>
        <Outlet />
      </main>
      {!onSos && <SosButton />}
      <BottomNav />
    </>
  )
}
