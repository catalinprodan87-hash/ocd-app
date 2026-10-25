import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { recordOpen, shouldShowRereadNudge } from '../lib/rereadNudge.js'
import { rereadNudge as text } from '../content/reread-nudge.js'
import './RereadNudge.css'

// Records that `contentId` was opened and, if the rule says so, shows a gentle,
// dismissible note above the content. It never blocks reading.
export default function RereadNudge({ contentId }) {
  const [show, setShow] = useState(false)
  // React's StrictMode runs effects twice in development; without this guard
  // every open would be counted twice.
  const recorded = useRef(false)

  useEffect(() => {
    if (recorded.current) return
    recorded.current = true
    recordOpen(contentId)
      .then((stats) => setShow(shouldShowRereadNudge(stats)))
      .catch(() => {}) // tracking failing must never break reading
  }, [contentId])

  if (!show) return null

  return (
    <aside className="reread-nudge" role="status">
      <p className="reread-nudge__title">{text.title}</p>
      <p>{text.body}</p>
      <div className="reread-nudge__actions">
        <button className="btn" onClick={() => setShow(false)}>{text.dismiss}</button>
        <Link to="/sos" className="btn btn--ghost">{text.sosLink}</Link>
      </div>
    </aside>
  )
}
