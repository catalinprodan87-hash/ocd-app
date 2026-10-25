import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Sos from './pages/Sos.jsx'
import WorstMoments from './pages/WorstMoments.jsx'
import Settings from './pages/Settings.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Learn from './pages/Learn.jsx'
import Chapter from './pages/Chapter.jsx'
import Compulsions from './pages/Compulsions.jsx'
import CompulsionType from './pages/CompulsionType.jsx'
import Inventory from './pages/Inventory.jsx'
import InventoryForm from './pages/InventoryForm.jsx'
import ErpHome from './pages/ErpHome.jsx'
import LadderItemForm from './pages/LadderItemForm.jsx'
import ExposureSession from './pages/ExposureSession.jsx'
import Placeholder from './pages/Placeholder.jsx'
import { getMeta } from './db/db.js'
import { ui } from './content/ui.js'

export default function App() {
  const [onboarded, setOnboarded] = useState(null) // null = still checking

  useEffect(() => {
    getMeta('onboardingDoneAt')
      .then((v) => setOnboarded(!!v))
      // If storage fails, still show something (onboarding) — never a blank screen,
      // because SOS must always be reachable.
      .catch(() => setOnboarded(false))
  }, [])

  if (onboarded === null) return null

  if (!onboarded) {
    return (
      <Routes>
        <Route element={<Layout showNav={false} />}>
          <Route path="sos" element={<Sos />} />
          <Route path="cel-mai-greu-moment" element={<WorstMoments />} />
          <Route path="incepe/:step" element={<Onboarding onDone={() => setOnboarded(true)} />} />
          <Route path="*" element={<Navigate to="/incepe/bun-venit" replace />} />
        </Route>
      </Routes>
    )
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sos" element={<Sos />} />
        <Route path="invata" element={<Learn />} />
        <Route path="invata/:id" element={<Chapter />} />
        <Route path="compulsii" element={<Compulsions />} />
        <Route path="compulsii/tip/:id" element={<CompulsionType />} />
        <Route path="compulsii/inventar" element={<Inventory />} />
        <Route path="compulsii/inventar/nou" element={<InventoryForm />} />
        <Route path="compulsii/inventar/:id" element={<InventoryForm />} />
        <Route path="expunere" element={<ErpHome />} />
        <Route path="expunere/treapta/nou" element={<LadderItemForm />} />
        <Route path="expunere/treapta/:id" element={<LadderItemForm />} />
        <Route path="expunere/sesiune/:id" element={<ExposureSession />} />
        <Route path="progres" element={<Placeholder page={ui.pages.progress} />} />
        {/* After "delete everything" the app starts fresh, from onboarding. */}
        <Route path="setari" element={<Settings onAllDeleted={() => setOnboarded(false)} />} />
        <Route path="cel-mai-greu-moment" element={<WorstMoments />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
