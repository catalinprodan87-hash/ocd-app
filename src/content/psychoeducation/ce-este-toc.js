// Chapter format (same for every chapter):
//   id       → used in the URL (/invata/<id>) and for re-read tracking; don't change once live
//   title, summary
//   blocks   → shown in order. Types:
//              { type: 'text', text }              a paragraph
//              { type: 'heading', text }           a small heading
//              { type: 'list', items: [...] }      a list
//              { type: 'founder', paragraphs: [...] }  "De la cineva care a trecut prin asta" card
//
// Drafted 2026-10-25. ⚠️ Waiting for clinician review.

export default {
  id: 'ce-este-toc',
  title: 'Ce este TOC și ce nu este',
  summary: 'Ce se întâmplă de fapt în tulburarea obsesiv-compulsivă și de ce se tot repetă.',
  blocks: [
    { type: 'text', text: 'Tulburarea obsesiv-compulsivă (TOC) are două părți. Obsesiile sunt gânduri, imagini sau impulsuri nedorite care apar singure și aduc frică, dezgust sau senzația că ceva „nu e bine”. Compulsiile sunt lucrurile pe care le faci, în exterior sau în minte, ca să scapi de acea senzație.' },
    { type: 'text', text: 'TOC nu înseamnă să-ți placă ordinea sau curățenia. Nu este un defect de caracter, o slăbiciune sau o pedeapsă. Este o tulburare reală, cunoscută și studiată, pentru care există tratamente care funcționează.' },
    { type: 'heading', text: 'Ce NU este TOC' },
    { type: 'list', items: [
      'Nu este o dovadă că vrei, în secret, ce îți arată gândurile',
      'Nu este „nebunie”: știi, în mare parte, că gândurile sunt exagerate și tocmai de aceea te chinuie',
      'Nu este vina ta și nici a familiei tale',
    ] },
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
    { type: 'text', text: 'Ceva declanșează un gând intruziv. Gândul aduce anxietate. Faci compulsia și simți ușurare, dar numai pentru puțin timp. Creierul învață că pericolul a fost real și că doar compulsia te-a salvat, așa că data viitoare gândul vine mai repede și mai puternic.' },
    { type: 'text', text: 'Cercul se poate rupe într-un singur loc: la compulsie. Nu poți opri gândurile să vină, dar poți învăța, pas cu pas, să nu mai faci ce îți cer. Despre asta este această aplicație.' },
  ],
}
