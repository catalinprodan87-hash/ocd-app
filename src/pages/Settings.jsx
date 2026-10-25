import { useEffect, useState } from 'react'
import { STORES, count, exportAll } from '../db/db.js'
import DeleteAllData from '../components/DeleteAllData.jsx'
import { settings } from '../content/settings.js'
import { disclaimer } from '../content/disclaimer.js'

export default function Settings({ onAllDeleted }) {
  const [counts, setCounts] = useState(null) // { storeName: number } once loaded
  const [exportMsg, setExportMsg] = useState('')

  async function loadCounts() {
    const result = {}
    for (const name of STORES) result[name] = await count(name)
    setCounts(result)
  }

  useEffect(() => { loadCounts() }, [])

  async function handleExport() {
    try {
      const data = await exportAll()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${settings.export.filePrefix}-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
      setExportMsg(settings.export.done)
    } catch {
      setExportMsg(settings.error)
    }
  }

  const nonEmpty = counts ? STORES.filter((s) => counts[s] > 0) : []

  return (
    <div className="page">
      <h1>{settings.title}</h1>

      <section className="card">
        <h2>{settings.privacy.title}</h2>
        <p>{settings.privacy.body}</p>
        <p className="muted" style={{ margin: 0 }}>{settings.privacy.iphoneTip}</p>
      </section>

      <section className="card">
        <h2>{settings.saved.title}</h2>
        {counts && nonEmpty.length === 0 && <p className="muted" style={{ margin: 0 }}>{settings.saved.empty}</p>}
        {nonEmpty.length > 0 && (
          <ul style={{ margin: 0, paddingLeft: 'var(--space-5)' }}>
            {nonEmpty.map((s) => (
              <li key={s}>{settings.saved.labels[s]}: {counts[s]}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2>{settings.export.title}</h2>
        <p>{settings.export.body}</p>
        <button className="btn" onClick={handleExport}>{settings.export.button}</button>
        {exportMsg && <p className="muted" role="status" style={{ margin: 'var(--space-3) 0 0' }}>{exportMsg}</p>}
      </section>

      <DeleteAllData onDeleted={onAllDeleted} />

      <section className="card">
        <h2>{settings.disclaimerTitle}</h2>
        {disclaimer.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </section>
    </div>
  )
}
