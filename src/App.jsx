import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Sos from './pages/Sos.jsx'
import WorstMoments from './pages/WorstMoments.jsx'
import Settings from './pages/Settings.jsx'
import Placeholder from './pages/Placeholder.jsx'
import { ui } from './content/ui.js'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sos" element={<Sos />} />
        <Route path="invata" element={<Placeholder page={ui.pages.learn} />} />
        <Route path="compulsii" element={<Placeholder page={ui.pages.compulsions} />} />
        <Route path="expunere" element={<Placeholder page={ui.pages.erp} />} />
        <Route path="progres" element={<Placeholder page={ui.pages.progress} />} />
        <Route path="setari" element={<Settings />} />
        <Route path="cel-mai-greu-moment" element={<WorstMoments />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
