// Compulsions module (spec module C — the founder's priority module).
// Founder principles 1 ("know every one of your compulsions, especially mental ones")
// and 2 ("neutralizing doesn't work — leave the thought, don't try to resolve anything").
// Blocks use the same format as the chapters (see psychoeducation/ce-este-toc.js).
//
// Each type's `id` is saved in people's inventory: don't change ids once live.

export const compulsions = {
  title: 'Compulsiile tale',
  intro: [
    { type: 'text', text: '[DE COMPLETAT] Ce sunt compulsiile și de ce țin TOC-ul în viață.' },
    { type: 'founder', paragraphs: ['[DE COMPLETAT] Principiul 1: cunoaște-ți fiecare compulsie, mai ales pe cele mentale.'] },
  ],

  visibleTitle: 'Compulsii vizibile',
  mentalTitle: 'Compulsii mentale',
  mentalIntro: '[DE COMPLETAT] De ce compulsiile mentale sunt greu de observat.',

  // Shown on every type page unless the type has its own `instead` text.
  insteadTitle: 'Ce poți face în schimb',
  insteadDefault: [
    { type: 'text', text: 'Lasă gândul nerezolvat. [DE COMPLETAT]' },
    { type: 'founder', paragraphs: ['[DE COMPLETAT] Principiul 2: neutralizarea nu funcționează. Lasă gândul, nu încerca să rezolvi nimic.'] },
  ],

  addToInventory: 'Adaugă în inventarul meu',
  backToModule: 'Înapoi la compulsii',

  types: [
    // Visible (spec: washing, checking, ordering, asking for reassurance)
    { id: 'washing', kind: 'visible', title: 'Spălare și curățare', summary: '[DE COMPLETAT]', body: [{ type: 'text', text: '[DE COMPLETAT]' }] },
    { id: 'checking', kind: 'visible', title: 'Verificare', summary: '[DE COMPLETAT]', body: [{ type: 'text', text: '[DE COMPLETAT]' }] },
    { id: 'ordering', kind: 'visible', title: 'Ordonare și aranjare', summary: '[DE COMPLETAT]', body: [{ type: 'text', text: '[DE COMPLETAT]' }] },
    { id: 'reassurance', kind: 'visible', title: 'Cererea de reasigurare', summary: '[DE COMPLETAT]', body: [{ type: 'text', text: '[DE COMPLETAT]' }] },

    // Mental, in depth (spec: analyzing, reviewing the past, checking feelings, neutralizing,
    // ritual praying, self-reassurance, mental counting)
    { id: 'analyzing', kind: 'mental', title: 'Analizarea', summary: '[DE COMPLETAT]', body: [{ type: 'text', text: '[DE COMPLETAT]' }] },
    { id: 'reviewing', kind: 'mental', title: 'Revederea mentală a trecutului', summary: '[DE COMPLETAT]', body: [{ type: 'text', text: '[DE COMPLETAT]' }] },
    { id: 'checking-feelings', kind: 'mental', title: 'Verificarea sentimentelor', summary: '[DE COMPLETAT]', body: [{ type: 'text', text: '[DE COMPLETAT]' }] },
    // Spec refinement: neutralizing is listed as a compulsion, NOT as a coping tool.
    { id: 'neutralizing', kind: 'mental', title: 'Neutralizarea', summary: '[DE COMPLETAT]', body: [{ type: 'text', text: '[DE COMPLETAT]' }] },
    // Faith vs ritual prayer is taught in depth in the Surrender module (beta).
    { id: 'ritual-prayer', kind: 'mental', title: 'Rugăciunea ritualică', summary: '[DE COMPLETAT]', body: [{ type: 'text', text: '[DE COMPLETAT]' }] },
    { id: 'self-reassurance', kind: 'mental', title: 'Autoreasigurarea', summary: '[DE COMPLETAT]', body: [{ type: 'text', text: '[DE COMPLETAT]' }] },
    { id: 'counting', kind: 'mental', title: 'Numărarea mentală', summary: '[DE COMPLETAT]', body: [{ type: 'text', text: '[DE COMPLETAT]' }] },
  ],

  inventory: {
    title: 'Inventarul meu',
    intro: '[DE COMPLETAT] De ce ajută să-ți numești fiecare compulsie și să o prinzi pe loc.',
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
      labelPlaceholder: '[DE COMPLETAT] un exemplu neutru de nume',
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
