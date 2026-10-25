// Chapter format (same for every chapter):
//   id       → used in the URL (/invata/<id>) and for re-read tracking; don't change once live
//   title, summary
//   blocks   → shown in order. Types:
//              { type: 'text', text }              a paragraph
//              { type: 'heading', text }           a small heading
//              { type: 'list', items: [...] }      a list
//              { type: 'founder', paragraphs: [...] }  "De la cineva care a trecut prin asta" card

export default {
  id: 'ce-este-toc',
  title: 'Ce este TOC și ce nu este',
  summary: '[DE COMPLETAT] O frază despre capitol.',
  blocks: [
    { type: 'text', text: '[DE COMPLETAT] Ce este și ce nu este TOC.' },
    { type: 'heading', text: 'Cercul TOC' },
    // The cycle is from the spec (module B).
    {
      type: 'list',
      items: [
        'Declanșator',
        'Gând intruziv',
        'Anxietate',
        'Compulsie',
        'Ușurare de scurtă durată',
        'TOC devine mai puternic',
      ],
    },
    { type: 'text', text: '[DE COMPLETAT] Explicația cercului.' },
  ],
}
