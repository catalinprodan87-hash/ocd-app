// ERP toolkit (spec module D): exposure ladder + guided exposure session.
// Framing = inhibitory learning: the goal is learning to tolerate uncertainty,
// NOT waiting for anxiety to drop. Never promise that anxiety will go down.
// Blocks use the same format as the chapters (see psychoeducation/ce-este-toc.js).
// Drafted 2026-10-25. ⚠️ Waiting for clinician review.

export const erp = {
  title: 'Expunere și prevenirea răspunsului',
  intro: [
    { type: 'text', text: 'Expunerea și prevenirea răspunsului (ERP) înseamnă să te apropii, cu bună știință și treptat, de ce te sperie, fără să faci compulsia.' },
    { type: 'text', text: 'Scopul nu este ca anxietatea să dispară. Scopul este să înveți că poți trăi cu incertitudinea și că ce prezice TOC-ul de obicei nu se întâmplă sau, dacă apare ceva neplăcut, poți face față. Fiecare expunere e o lecție pentru creier, chiar și atunci când e grea.' },
    { type: 'text', text: 'Începe cu trepte ușoare. Dacă ai un terapeut, arată-i scara ta și lucrați împreună.' },
  ],

  ladder: {
    title: 'Scara mea de expunere',
    intro: 'O treaptă este o situație de care te temi și pe care vrei să o înfrunți, cu o notă de la 0 la 100 pentru cât de grea ți se pare. Începe cu o treaptă care e grea, dar nu copleșitoare, de obicei în jur de 30–40.',
    empty: 'Încă nu ai nicio treaptă pe scară.',
    add: 'Adaugă o treaptă',
    level: (n) => `${n}`,
    levelLabel: (n) => `Nivel ${n} din 100`,
    start: 'Începe o expunere',
    edit: 'Editează',
  },

  // Shared 0–100 scale wording. ⚠️ Anchors to be reviewed by a clinician.
  scale: {
    min: 'deloc greu',
    max: 'cel mai greu',
  },

  itemForm: {
    newTitle: 'Treaptă nouă',
    editTitle: 'Editează treapta',
    descriptionField: 'Ce situație vrei să înfrunți?',
    descriptionPlaceholder: 'Descrie situația cu cuvintele tale',
    descriptionRequired: 'Descrie situația, oricât de scurt.',
    ratingField: 'Cât de greu ar fi pentru tine? (0–100)',
    save: 'Salvează',
    cancel: 'Renunță',
    delete: 'Șterge treapta',
    deleteConfirm: 'Sigur? Apasă din nou pentru a șterge.',
  },

  session: {
    resumeTitle: 'Ai o expunere începută',
    resume: 'Continuă',
    stepLabel: (n) => `Pasul ${n} din 3`,
    level: (n) => `Nivel ${n}`,

    predict: {
      title: 'Înainte de expunere',
      predictionField: 'Ce crezi că se va întâmpla?',
      predictionPlaceholder: 'Scrie ce te temi că se va întâmpla',
      predictionRequired: 'Scrie predicția ta, oricât de scurt.',
      confidenceField: 'Cât de sigur ești? (0–100%)',
      confidenceMin: 'deloc sigur',
      confidenceMax: 'complet sigur',
      start: 'Începe expunerea',
      abandon: 'Renunță la această expunere',
    },

    expose: {
      title: 'Acum: rămâi cu ea',
      guidance: [
        { type: 'text', text: 'Rămâi în situație. Nu face compulsia, nici în exterior, nici în minte. Lasă gândul nerezolvat.' },
        // Spec refinement (principle 4): never promise anxiety drops in X minutes.
        { type: 'text', text: 'Anxietatea poate să se estompeze, poate să nu. Chiar dacă rămâne, o poți duce cu tine și poți continua.' },
        // Spec principle 3: taught as an attitude, not a phrase to repeat.
        { type: 'text', text: 'Când TOC-ul cere certitudine: „Poate da, poate nu. Nu știu.” Nu ca formulă de repetat până te liniștești, ci ca alegere de a nu ști.' },
      ],
      yourPrediction: 'Predicția ta:',
      done: 'Am terminat expunerea',
    },

    reflect: {
      title: 'După: ce ai învățat?',
      youPredicted: 'Ai prezis:',
      confidence: (n) => `Sigur în proporție de ${n}%`,
      resistedField: 'Ai reușit să nu faci compulsia?',
      resisted: {
        yes: 'Da',
        partly: 'Parțial',
        no: 'Nu, am făcut-o',
      },
      resistedRequired: 'Alege un răspuns. Oricare e în regulă.',
      happenedField: 'Ce s-a întâmplat de fapt?',
      learnedField: 'Ce am învățat?',
      save: 'Salvează',
    },

    done: {
      title: 'Ai făcut un pas curajos.',
      // Courage, not consistency (spec: "You faced a level-60 trigger").
      courage: (n) => `Ai înfruntat o treaptă de nivel ${n}.`,
      // No shame whatever the answer.
      byResisted: {
        yes: 'Ai stat cu frica fără să faci compulsia. Asta e exact învățarea de care are nevoie creierul tău.',
        partly: 'Ai rezistat o parte din drum. Fiecare minut în care n-ai făcut compulsia contează.',
        no: 'E în regulă. Ai încercat, iar asta cere curaj. Data viitoare poți alege o treaptă puțin mai ușoară.',
      },
      back: 'Înapoi la scară',
    },
  },

  history: {
    title: 'Expuneri recente',
    learned: 'Am învățat:',
  },
}
