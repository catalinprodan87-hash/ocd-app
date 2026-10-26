// Onboarding (spec module A): welcome → disclaimer ("Înțeleg") → themes → safety screen.
// The disclaimer text itself lives in disclaimer.js.
// Crisis numbers come from config/crisis.js so they're defined in one place only.
import { crisisResources } from '../config/crisis.js'

const [emergency] = crisisResources

export const onboarding = {
  stepLabel: (n, total) => `Pasul ${n} din ${total}`,
  next: 'Continuă',
  back: 'Înapoi',

  welcome: {
    title: 'Bun venit',
    body: 'Această aplicație este pentru oamenii care trăiesc cu TOC (tulburare obsesiv-compulsivă) și pentru cei care vor să-i înțeleagă. Te ajută să înțelegi ce se întâmplă în mintea ta și să exersezi, pas cu pas, metode verificate științific. Nu ești singur în asta.',
    privacy: 'Nu ai nevoie de cont. Tot ce scrii rămâne doar pe acest telefon.',
  },

  themes: {
    title: 'Cum arată TOC-ul tău?',
    body: 'Alege una sau mai multe teme. Poți schimba oricând. TOC-ul poate lua nenumărate forme: dacă al tău nu se regăsește aici, alege „Altceva”.',
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
    // ⚠️ DRAFT wording (2026-10-25): must be reviewed by a clinician before launch.
    question: 'În ultima vreme, te-ai gândit că ar fi mai bine să nu mai trăiești sau te-ai gândit să-ți faci rău?',
    hint: 'Dacă nu știi sigur cum să răspunzi, alege „Da”. Îți vom arăta unde găsești ajutor.',
    privacyNote: 'Răspunsul tău nu se salvează nicăieri.',
    answers: {
      yes: 'Da',
      no: 'Nu',
      skip: 'Prefer să nu răspund',
    },
    // Shown after "Da" or "Prefer să nu răspund", together with the crisis numbers.
    flagged: {
      title: 'Mulțumim că ne-ai spus.',
      body: `Nu ești singur. Te rugăm să vorbești cât mai curând cu un specialist (medicul de familie, un psihiatru sau un psiholog) și cu cineva în care ai încredere. Dacă ești în pericol acum, sună la ${emergency.number}.`,
      continue: 'Continuă în aplicație',
    },
    finish: 'Intră în aplicație',
  },
}
