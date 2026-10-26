// Compulsions module (spec module C — the founder's priority module).
// Founder principles 1 ("know every one of your compulsions, especially mental ones"),
// 2 ("neutralizing doesn't work — leave the thought, don't try to resolve anything")
// and 7 ("the more you fight it, the worse it gets").
// Blocks use the same format as the chapters (see psychoeducation/ce-este-toc.js).
// Drafted 2026-10-25 (Claude + founder). ⚠️ Waiting for clinician review.
//
// Each type's `id` is saved in people's inventory: don't change ids once live.

export const compulsions = {
  title: 'Compulsiile tale',
  intro: [
    { type: 'text', text: 'O compulsie este orice faci, în exterior sau în minte, ca să scapi de anxietate, să previi ceva rău sau să obții certitudinea că totul e bine.' },
    { type: 'text', text: 'Aduce o ușurare scurtă. Dar fiecare compulsie îi spune creierului: „Pericolul a fost real și ai scăpat doar pentru că ai făcut asta.” Așa se închide cercul, iar TOC-ul devine mai puternic.' },
    { type: 'text', text: 'Nu trebuie să controlezi gândurile. Ele vin singure. Ce poți schimba, pas cu pas, este ce faci după ce apar.' },
    { type: 'founder', paragraphs: [
      'Eu am avut mai ales compulsii mentale. Nu se vedeau și mult timp nici eu nu știam că sunt compulsii. Credeam că doar „mă gândesc”.',
      'Când am învățat să le recunosc pe fiecare, am putut începe să nu le mai fac. Cunoaște-ți fiecare compulsie. Nu poți lupta cu ceva ce nu vezi.',
    ] },
  ],

  visibleTitle: 'Compulsii vizibile',
  mentalTitle: 'Compulsii mentale',
  mentalIntro: 'Compulsiile mentale se petrec doar în minte, așa că nimeni nu le vede, uneori nici tu. Seamănă cu gânditul obișnuit, de aceea mulți oameni cu TOC cred că nu au compulsii. Le au, doar că sunt invizibile.',

  // Shown on every type page unless the type has its own `instead` text.
  insteadTitle: 'Ce poți face în schimb',
  insteadDefault: [
    { type: 'text', text: 'Lasă gândul nerezolvat. Nu-l analiza, nu-l anula, nu căuta răspunsul. Observă doar: „Asta e o compulsie.” Apoi întoarce-te la ce făceai, cu gândul și cu anxietatea cu tot. Nu trebuie să dispară ca să poți trăi mai departe.' },
    { type: 'text', text: 'Dacă de data asta n-ai reușit, nu e un eșec. Fiecare încercare contează.' },
    { type: 'founder', paragraphs: [
      'Am încercat mult timp să neutralizez gândurile: un gând bun peste unul rău, o imagine frumoasă peste una urâtă. Nu funcționează.',
      'Cu cât te lupți mai mult cu gândul, cu atât devine mai rău. Lasă-l acolo. Nu încerca să rezolvi nimic.',
    ] },
  ],

  addToInventory: 'Adaugă în inventarul meu',
  backToModule: 'Înapoi la compulsii',

  types: [
    // ---------- Visible ----------
    {
      id: 'washing', kind: 'visible', title: 'Spălare și curățare',
      summary: 'Te speli sau cureți ca să scapi de senzația de murdărie sau de frica de îmbolnăvire.',
      body: [
        { type: 'text', text: 'Spălatul, dușul sau curățenia devin compulsii când le faci ca să scapi de anxietate, de multe ori după reguli stricte: de un anumit număr de ori, într-o anumită ordine, până se simte „curat”.' },
        { type: 'list', items: [
          'Te speli pe mâini de multe ori la rând, până te ustură pielea',
          'Faci duș după ce ai atins ceva „contaminat”',
          'Dezinfectezi telefonul, cheile sau clanțele iar și iar',
          'Eviți să atingi anumite lucruri sau locuri (evitarea hrănește TOC-ul la fel ca o compulsie)',
        ] },
        { type: 'text', text: 'Ușurarea ține puțin. Creierul învață că pericolul a fost real și data viitoare cere mai mult.' },
      ],
    },
    {
      id: 'checking', kind: 'visible', title: 'Verificare',
      summary: 'Verifici iar și iar ca să fii sigur că nu s-a întâmplat sau nu se va întâmpla ceva rău.',
      body: [
        { type: 'text', text: 'Verifici ușa, aragazul, fierul de călcat sau mesajele trimise. O dată nu ajunge, pentru că TOC-ul nu cere „sigur”, ci „100% sigur”, iar asta nu se poate obține niciodată.' },
        { type: 'list', items: [
          'Te întorci acasă să verifici dacă ai încuiat',
          'Apeși clanța de mai multe ori',
          'Recitești un mesaj de multe ori înainte să-l trimiți',
          'Cauți pe internet dacă un simptom e grav',
          'Faci poze ca dovadă că ai închis aragazul',
        ] },
        { type: 'text', text: 'Fiecare verificare face îndoiala mai mare, nu mai mică.' },
      ],
      instead: [
        { type: 'text', text: 'Verifică o singură dată, normal, apoi pleacă. Când apare „dar dacă…?”, răspunde: „Poate da, poate nu.” și nu te mai întoarce. Anxietatea poate rămâne o vreme. O poți purta cu tine.' },
      ],
    },
    {
      id: 'ordering', kind: 'visible', title: 'Ordonare și aranjare',
      summary: 'Aranjezi, repeți sau reiei ceva până se simte „exact cum trebuie”.',
      body: [
        { type: 'text', text: 'Uneori nu e vorba de o frică anume, ci de o senzație de neterminat, de „nu e bine așa”. Aranjezi obiectele simetric, repeți o mișcare sau o iei de la capăt până senzația dispare.' },
        { type: 'list', items: [
          'Aliniezi obiectele de pe birou sau din dulap',
          'Ieși și intri pe ușă până se simte corect',
          'Rescrii un cuvânt până arată perfect',
          'Atingi ceva și cu cealaltă mână, ca să fie „egal”',
        ] },
      ],
    },
    {
      id: 'reassurance', kind: 'visible', title: 'Cererea de reasigurare',
      summary: 'Ceri altora să-ți confirme că totul e bine.',
      body: [
        { type: 'text', text: 'Întrebi partenerul, părinții, prietenii sau medicul: „Ești sigur că nu e nimic?”, „Crezi că sunt un om rău?”. Uneori cauți răspunsul pe internet sau îl ceri unui chatbot. Răspunsul aduce liniște câteva minute, apoi îndoiala revine, de obicei mai puternică.' },
        { type: 'list', items: [
          'Pui aceeași întrebare de mai multe ori',
          'Le povestești altora gândul ca să vezi cum reacționează',
          'Cauți pe forumuri oameni cu aceeași problemă ca să te liniștești',
          'Îi ceri cuiva să verifice în locul tău',
        ] },
        { type: 'text', text: 'De aceea această aplicație nu îți va răspunde niciodată la întrebări ca „E normal?” sau „Sunt un om rău?”. Nu pentru că nu ne pasă, ci pentru că răspunsul hrănește TOC-ul.' },
      ],
      instead: [
        { type: 'text', text: 'Observă impulsul de a întreba și amână-l: 5 minute, apoi 10. Nu trebuie să-l învingi pentru totdeauna, doar de data asta.' },
        { type: 'text', text: 'Dacă poți, vorbește cu cei apropiați: în loc de reasigurare, îți pot oferi încurajare. De exemplu: „Știu că e greu. Cred că poți să stai cu îndoiala asta.”' },
      ],
    },

    // ---------- Mental, in depth ----------
    {
      id: 'analyzing', kind: 'mental', title: 'Analizarea',
      summary: 'Încerci să „rezolvi” gândul, gândindu-te la el până găsești răspunsul.',
      body: [
        { type: 'text', text: 'Întorci gândul pe toate fețele: „De ce m-am gândit la asta? Ce înseamnă despre mine? Dar dacă e adevărat?”. Pare gândire normală, dar e o compulsie: cauți o certitudine pe care TOC-ul nu ți-o va da niciodată. Pot trece ore fără să-ți dai seama.' },
        { type: 'list', items: [
          'Cauți argumente pro și contra',
          'Îți imaginezi scenarii ca să vezi cum ai reacționa',
          'Cauți „dovada finală” care să închidă subiectul',
        ] },
      ],
    },
    {
      id: 'reviewing', kind: 'mental', title: 'Revederea mentală a trecutului',
      summary: 'Îți derulezi trecutul ca să verifici dacă ai făcut ceva rău.',
      body: [
        { type: 'text', text: 'Mintea caută în memorie orice detaliu care ar putea confirma frica: o conversație, o privire, o zi de acum mulți ani. TOC-ul scotocește prin amintiri după acel 0,1% care i-ar da dreptate și îl face să pară urgent.' },
        { type: 'list', items: [
          'Reiei în minte o conversație ca să vezi dacă ai spus ceva greșit',
          'Încerci să-ți amintești exact ce ai făcut aseară',
          'Revii la o amintire veche până ești sigur că „nu s-a întâmplat nimic”',
        ] },
        { type: 'text', text: 'Cu cât cauți mai mult, cu atât amintirea devine mai neclară, iar îndoiala mai mare.' },
      ],
    },
    {
      id: 'checking-feelings', kind: 'mental', title: 'Verificarea sentimentelor',
      summary: 'Verifici ce simți, ca să vezi dacă gândul e „adevărat”.',
      body: [
        { type: 'text', text: '„Mai simt iubire pentru partenerul meu?”, „Am simțit ceva când am văzut cuțitul?”. Îți verifici emoțiile și reacțiile corpului ca pe un aparat de măsură. Problema e că atunci când cauți o senzație, de multe ori chiar o creezi, iar TOC-ul o folosește ca dovadă.' },
        { type: 'list', items: [
          'Te scanezi după semne de anxietate, de atracție sau de lipsă de emoție',
          'Te testezi, expunându-te la ceva ca să vezi cum reacționezi',
          'Compari ce simți acum cu ce simțeai înainte',
        ] },
      ],
    },
    {
      // Spec refinement: neutralizing is listed as a compulsion, NOT as a coping tool.
      id: 'neutralizing', kind: 'mental', title: 'Neutralizarea',
      summary: 'Încerci să „anulezi” un gând rău cu un gând, o imagine sau un cuvânt bun.',
      body: [
        { type: 'text', text: 'Când apare un gând sau o imagine care te sperie, pui repede altceva peste: un gând bun, o imagine plăcută, un cuvânt, o rugăciune scurtă. Pare o soluție, dar e o compulsie. Îi transmite creierului că gândul a fost periculos și trebuia anulat.' },
        { type: 'list', items: [
          'Îți imaginezi persoana iubită în siguranță după un gând de a-i face rău',
          'Repeți în minte un cuvânt „bun”',
          'Gândești gândul din nou, „corect” de data asta',
        ] },
      ],
    },
    {
      // Faith vs ritual prayer is taught in depth in the Surrender module (beta).
      id: 'ritual-prayer', kind: 'mental', title: 'Rugăciunea ritualică',
      summary: 'Te rogi după reguli stricte, ca să anulezi un gând sau să previi ceva rău.',
      body: [
        { type: 'text', text: 'Credința în sine nu este o problemă. Rugăciunea devine compulsie când o repeți până se simte „corect”, o iei de la capăt dacă ai greșit un cuvânt sau o folosești ca să scapi de anxietate după un gând intruziv. Atunci nu mai e o întâlnire cu Dumnezeu, ci un ritual cerut de TOC.' },
        { type: 'list', items: [
          'Reiei rugăciunea pentru că n-ai fost destul de concentrat',
          'Te rogi de un anumit număr de ori',
          'Te rogi ca să „anulezi” un gând de hulă',
          'Te spovedești pentru același gând, iar și iar',
        ] },
      ],
      instead: [
        { type: 'text', text: 'Roagă-te o singură dată, cu cuvintele tale, apoi oprește-te, chiar dacă nu se simte „perfect”. Fă-ți partea, apoi lasă restul fără să mai analizezi.' },
        { type: 'text', text: 'Despre credință și TOC vorbim mai pe larg într-un modul viitor.' },
      ],
    },
    {
      id: 'self-reassurance', kind: 'mental', title: 'Autoreasigurarea',
      summary: 'Îți repeți în minte că totul e bine, ca să scapi de îndoială.',
      body: [
        { type: 'text', text: '„Eu n-aș face niciodată așa ceva.”, „Știu că nu sunt așa.” Pare un gând sănătos, dar dacă îl repeți ca să scapi de anxietate, funcționează exact ca reasigurarea cerută altora: liniștește puțin, apoi îndoiala revine.' },
        { type: 'text', text: 'Să observi o dată „asta e TOC-ul” te ajută. Să-ți repeți asta până te liniștești devine compulsie.' },
        { type: 'list', items: [
          'Îți enumeri în minte motivele pentru care nu ești periculos',
          'Îți amintești de câte ori nu s-a întâmplat nimic',
          'Repeți o frază liniștitoare până dispare frica',
        ] },
      ],
    },
    {
      id: 'counting', kind: 'mental', title: 'Numărarea mentală',
      summary: 'Numeri sau repeți în minte după reguli, ca să previi ceva rău sau ca să se simtă „corect”.',
      body: [
        { type: 'text', text: 'Numeri pașii, literele sau obiectele, trebuie să ajungi la un număr „bun” și să eviți unul „rău”, sau repeți o frază ori o imagine de un anumit număr de ori.' },
        { type: 'list', items: [
          'Numeri până la un anumit număr înainte să faci ceva',
          'Eviți numerele care par să aducă ghinion',
          'Repeți un gând de trei ori ca să fie „complet”',
        ] },
      ],
    },
  ],

  inventory: {
    title: 'Inventarul meu',
    intro: 'Scrie aici fiecare compulsie a ta, cu numele pe care i-l dai tu. Când o numești, o recunoști mai repede. Iar ce recunoști, poți alege să nu mai faci.',
    count: (n) => (n === 1 ? '1 compulsie' : `${n} compulsii`),
    empty: 'Încă nu ai adăugat nicio compulsie.',
    open: 'Deschide inventarul',
    add: 'Adaugă o compulsie',
    visibleTitle: 'Vizibile',
    mentalTitle: 'Mentale',

    form: {
      newTitle: 'Compulsie nouă',
      editTitle: 'Editează compulsia',
      labelField: 'Cum o numești?',
      labelPlaceholder: 'de ex. „verific ușa” sau „caut dacă am spus ceva greșit”',
      labelRequired: 'Scrie un nume, oricât de scurt.',
      kindField: 'Ce fel de compulsie este?',
      kindVisible: 'Vizibilă (o faci)',
      kindMental: 'Mentală (în minte)',
      kindRequired: 'Alege vizibilă sau mentală.',
      categoryField: 'Seamănă cu… (opțional)',
      categoryNone: '— nu știu / altceva —',
      insteadField: 'Ce faci în schimb? (opțional)',
      insteadPlaceholder: 'Lasă gândul nerezolvat.',
      save: 'Salvează',
      cancel: 'Renunță',
      delete: 'Șterge din inventar',
      deleteConfirm: 'Sigur? Apasă din nou pentru a șterge.',
    },
  },
}

// Helper so pages can look a type up by id.
export const typeById = (id) => compulsions.types.find((t) => t.id === id)
