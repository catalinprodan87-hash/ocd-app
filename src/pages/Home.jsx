import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getResults, daysSince, REMIND_AFTER_DAYS } from '../lib/ocir.js'
import { ui } from '../content/ui.js'
import { quickLog } from '../content/quick-log.js'
import { ocir } from '../content/ocir.js'

export default function Home() {
  const { home } = ui.pages
  const [reminder, setReminder] = useState(null) // null | 'first' | 'again'

  useEffect(() => {
    getResults()
      .then((results) => {
        const last = results[results.length - 1]
        if (!last) setReminder('first')
        else if (daysSince(last.date) >= REMIND_AFTER_DAYS) setReminder('again')
      })
      .catch(() => {})
  }, [])

  return (
    <div className="page stack">
      <div>
        <h1>{home.title}</h1>
        <p>{home.intro}</p>
      </div>
      {/* Quick log first: it has to be reachable in one tap to stay ~10 seconds. */}
      <Link to="/noteaza" className="btn btn--block">{quickLog.openButton}</Link>
      <Link to="/cel-mai-greu-moment" className="btn btn--ghost btn--block">{home.worstLink}</Link>

      {reminder && (
        <section className="card">
          <p>{ocir.reminder[reminder]}</p>
          <Link to="/progres/chestionar" className="btn btn--ghost btn--block">{ocir.reminder.button}</Link>
        </section>
      )}

      <Link to="/setari" className="btn btn--ghost">{ui.nav.settings}</Link>
    </div>
  )
}
