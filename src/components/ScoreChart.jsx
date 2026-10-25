import { useState } from 'react'
import './ScoreChart.css'

// Single-series line chart of scores over time (needs at least 2 points).
// Points are placed by real date, so uneven gaps between questionnaires look uneven.
// Hover/focus shows a tooltip; the table view (rendered by the parent) holds every value too.
const W = 320
const H = 180
const PAD = { top: 14, right: 30, bottom: 26, left: 28 }

export default function ScoreChart({ points, max, ticks, ariaLabel, formatDate }) {
  const [active, setActive] = useState(null) // index of the highlighted point

  const times = points.map((p) => new Date(p.date).getTime())
  const t0 = Math.min(...times)
  const span = Math.max(...times) - t0
  const plotW = W - PAD.left - PAD.right
  const plotH = H - PAD.top - PAD.bottom

  // If every point is on the same day, fall back to even spacing.
  const x = (i) => PAD.left + (span === 0 ? (i / (points.length - 1)) * plotW : ((times[i] - t0) / span) * plotW)
  const y = (v) => PAD.top + plotH - (v / max) * plotH

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.total).toFixed(1)}`).join(' ')
  const last = points.length - 1

  // Crosshair: snap to the point nearest the pointer's x.
  function handlePointer(e) {
    const box = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - box.left) / box.width) * W
    let nearest = 0
    points.forEach((_, i) => {
      if (Math.abs(x(i) - px) < Math.abs(x(nearest) - px)) nearest = i
    })
    setActive(nearest)
  }

  return (
    <div className="score-chart">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={ariaLabel}
        onPointerMove={handlePointer}
        onPointerLeave={() => setActive(null)}
      >
        {/* Recessive hairline grid + y ticks */}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="score-chart__grid" />
            <text x={PAD.left - 6} y={y(t)} className="score-chart__tick" textAnchor="end" dominantBaseline="middle">{t}</text>
          </g>
        ))}

        {/* x labels: first and last date only, so they never collide */}
        <text x={x(0)} y={H - 6} className="score-chart__tick" textAnchor="start">{formatDate(points[0].date)}</text>
        <text x={x(last)} y={H - 6} className="score-chart__tick" textAnchor="end">{formatDate(points[last].date)}</text>

        {active !== null && (
          <line x1={x(active)} x2={x(active)} y1={PAD.top} y2={PAD.top + plotH} className="score-chart__crosshair" />
        )}

        <path d={path} className="score-chart__line" />

        {points.map((p, i) => (
          <g key={p.id}>
            <circle cx={x(i)} cy={y(p.total)} r={active === i ? 6 : 4} className="score-chart__dot" />
            {/* Invisible 24px hit/focus target, bigger than the 8px dot */}
            <circle
              cx={x(i)}
              cy={y(p.total)}
              r={12}
              className="score-chart__hit"
              tabIndex={0}
              aria-label={`${formatDate(p.date)}: ${p.total}`}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            />
          </g>
        ))}

        {/* Direct label on the latest value only */}
        <text x={x(last) + 8} y={y(points[last].total)} className="score-chart__end" dominantBaseline="middle">
          {points[last].total}
        </text>
      </svg>

      {active !== null && (
        <div
          className="score-chart__tooltip"
          style={{
            left: `${(x(active) / W) * 100}%`,
            top: `${(y(points[active].total) / H) * 100}%`,
          }}
          aria-hidden="true"
        >
          <strong>{points[active].total}</strong>
          <span>{formatDate(points[active].date)}</span>
        </div>
      )}
    </div>
  )
}
