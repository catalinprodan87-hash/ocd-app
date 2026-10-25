import { founderVoice } from '../content/founder-voice.js'
import './FounderCard.css'

// The founder's lived-experience voice. Deliberately looks different from
// educational cards (.card) so readers always know who is speaking.
// `paragraphs` is an array of strings from a content file.
export default function FounderCard({ paragraphs }) {
  return (
    <aside className="founder-card">
      <p className="founder-card__label">{founderVoice.label}</p>
      {paragraphs.map((text, i) => (
        <p key={i} className="founder-card__text">{text}</p>
      ))}
      <p className="founder-card__signature">{founderVoice.signature}</p>
    </aside>
  )
}
