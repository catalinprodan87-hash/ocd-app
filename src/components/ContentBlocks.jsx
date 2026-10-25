import FounderCard from './FounderCard.jsx'
import './ContentBlocks.css'

// Renders the shared content block format used by chapters and compulsion types:
//   { type: 'text', text } · { type: 'heading', text } · { type: 'list', items }
//   { type: 'founder', paragraphs }
export default function ContentBlocks({ blocks }) {
  return blocks.map((block, i) => <Block key={i} block={block} />)
}

function Block({ block }) {
  switch (block.type) {
    case 'heading':
      return <h2>{block.text}</h2>
    case 'list':
      return (
        <ul className="content-list">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )
    case 'founder':
      return <FounderCard paragraphs={block.paragraphs} />
    case 'text':
    default:
      return <p>{block.text}</p>
  }
}
