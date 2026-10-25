import './RatingSlider.css'

// 0–100 slider with the current value shown large. Used for ladder ratings (SUDS)
// and prediction confidence. `suffix` is e.g. '%' for confidence.
export default function RatingSlider({ id, label, value, onChange, minLabel, maxLabel, suffix = '', step = 5 }) {
  return (
    <div className="rating">
      <label className="field-label" htmlFor={id}>{label}</label>
      <div className="rating__value" aria-hidden="true">{value}{suffix}</div>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={`${value}${suffix}`}
        className="rating__input"
      />
      <div className="rating__anchors" aria-hidden="true">
        <span>0 · {minLabel}</span>
        <span>100 · {maxLabel}</span>
      </div>
    </div>
  )
}
