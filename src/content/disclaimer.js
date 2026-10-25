// Full disclaimer: shown at onboarding (with "Înțeleg"), in Settings, and short form on SOS.
// Translated from the spec's draft. [DE VERIFICAT] — needs review by a lawyer and a clinician.
// The crisis numbers come from config/crisis.js so they're defined in one place only.
import { crisisResources } from '../config/crisis.js'

const [emergency, helpline] = crisisResources

export const disclaimer = {
  title: 'Înainte să începi',
  paragraphs: [
    'Această aplicație este un instrument de autoajutor și educațional, bazat pe metode folosite în terapia cognitiv-comportamentală pentru TOC.',
    'Nu oferă un diagnostic și nu înlocuiește un psiholog, psihoterapeut sau psihiatru. Dacă simptomele tale sunt severe, se agravează sau îți afectează viața de zi cu zi, te rugăm să consulți un specialist în sănătate mintală.',
    'Nu opri și nu modifica medicamentele prescrise fără să vorbești cu medicul tău.',
    `Dacă ai gânduri de a-ți face rău sau ești în pericol, sună imediat la ${emergency.number} sau la ${helpline.name}: ${helpline.number}.`,
  ],
  acceptButton: 'Înțeleg',
}
