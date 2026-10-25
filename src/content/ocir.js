// OCI-R self-report scale (spec module A + "Progress view").
// ⚠️ The real items and answer labels are copyrighted. Replace every [DE COMPLETAT]
// with the validated Romanian translation ONLY after usage rights are confirmed.
// Structure (fixed by the scale): 18 items, each answered 0–4, total 0–72.
// Keep the items in the scale's official order — scoring may depend on it later.
//
// MDR positioning: never show a cut-off score or labels like "severe" — that is diagnosis.

export const ocir = {
  title: 'Chestionarul OCI-R',
  intro: '[DE COMPLETAT] Ce este chestionarul, cât durează (câteva minute), că NU este un diagnostic, ci un mod de a vedea cum evoluezi în timp și ceva ce poți arăta unui specialist.',
  instruction: '[DE COMPLETAT — instrucțiunea din traducerea licențiată, inclusiv perioada de referință]',
  start: 'Începe',
  resume: 'Continuă de unde ai rămas',
  questionLabel: (n, total) => `Întrebarea ${n} din ${total}`,
  back: '← Înapoi',

  // Answer labels for 0–4. [DE COMPLETAT] use the licensed translation's wording.
  options: [
    '[DE COMPLETAT] 0',
    '[DE COMPLETAT] 1',
    '[DE COMPLETAT] 2',
    '[DE COMPLETAT] 3',
    '[DE COMPLETAT] 4',
  ],

  items: Array.from({ length: 18 }, (_, i) => `[DE COMPLETAT — întrebarea ${i + 1} din traducerea română licențiată]`),

  // Shown when someone opens it again soon after the last time (could be checking).
  tooSoon: {
    title: 'Ai completat chestionarul recent',
    body: (days) => {
      const when = days === 0 ? 'astăzi' : days === 1 ? 'ieri' : `acum ${days} zile`
      return `Ultima dată a fost ${when}. [DE COMPLETAT] Scorurile se schimbă încet; e mai util să-l completezi o dată la câteva săptămâni.`
    },
    continueAnyway: 'Vreau să-l completez acum',
    notNow: 'Nu acum',
  },

  // Home card when there's no score yet, or the last one is a few weeks old. No guilt.
  reminder: {
    first: '[DE COMPLETAT] Când ai câteva minute, poți completa un scurt chestionar ca să vezi cum evoluezi în timp.',
    again: '[DE COMPLETAT] Au trecut câteva săptămâni. Dacă vrei, poți completa din nou chestionarul.',
    button: 'Completează chestionarul',
  },

  result: {
    title: 'Mulțumim.',
    score: (n, max) => `Scorul tău: ${n} din ${max}`,
    previous: (n, date) => `Data trecută (${date}): ${n}`,
    meaning: '[DE COMPLETAT] Ce înseamnă scorul fără a-l interpreta ca diagnostic; de ce contează tendința în timp, nu un număr.',
    toProgress: 'Vezi progresul',
  },
}
