// Onboarding (spec module A): welcome → disclaimer ("Înțeleg") → themes → safety screen.
// The disclaimer text itself lives in disclaimer.js.

export const onboarding = {
  stepLabel: (n, total) => `Pasul ${n} din ${total}`,
  next: 'Continuă',
  back: 'Înapoi',

  welcome: {
    title: 'Bun venit',
    body: '[DE COMPLETAT] Câteva fraze calde: ce este aplicația, pentru cine e, că nu ești singur.',
    privacy: 'Nu ai nevoie de cont. Tot ce scrii rămâne doar pe acest telefon.',
  },

  themes: {
    title: 'Cum arată TOC-ul tău?',
    body: 'Alege una sau mai multe teme. Poți schimba oricând. [DE COMPLETAT — verificare text]',
    // Order and wording from the spec (module A). ids are stored; labels can be edited freely.
    options: [
      { id: 'contamination', label: 'Contaminare' },
      { id: 'checking', label: 'Verificare' },
      { id: 'harm', label: 'Gânduri de a face rău' },
      { id: 'religious', label: 'Religios (scrupulozitate)' },
      { id: 'relationship', label: 'Relații' },
      { id: 'sexual', label: 'Gânduri intruzive sexuale' },
      { id: 'symmetry', label: 'Simetrie / „exact cum trebuie”' },
      { id: 'health', label: 'Sănătate' },
      { id: 'other', label: 'Altceva / Al meu arată diferit' },
    ],
    otherPlaceholder: 'Descrie cu cuvintele tale (opțional)',
    noneSelectedHint: 'Poți alege și mai târziu.',
  },

  safety: {
    title: 'O întrebare importantă',
    // [DE COMPLETAT] Exact wording must come from / be reviewed by a clinician.
    question: '[DE COMPLETAT — întrebarea de siguranță despre gânduri de a-ți face rău, verificată de un clinician]',
    privacyNote: 'Răspunsul tău nu se salvează nicăieri.',
    answers: {
      yes: 'Da',
      no: 'Nu',
      skip: 'Prefer să nu răspund',
    },
    // Shown after "Da" or "Prefer să nu răspund", together with the crisis numbers.
    flagged: {
      title: 'Mulțumim că ne-ai spus.',
      body: '[DE COMPLETAT] Mesaj blând: nu ești singur, recomandarea de a vorbi cu un specialist cât mai curând.',
      continue: 'Continuă în aplicație',
    },
    finish: 'Intră în aplicație',
  },
}
