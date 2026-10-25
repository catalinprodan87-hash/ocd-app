// ERP toolkit (spec module D): exposure ladder + guided exposure session.
// Framing = inhibitory learning: the goal is learning to tolerate uncertainty,
// NOT waiting for anxiety to drop. Never promise that anxiety will go down.
// Blocks use the same format as the chapters (see psychoeducation/ce-este-toc.js).

export const erp = {
  title: 'Expunere și prevenirea răspunsului',
  intro: [
    { type: 'text', text: '[DE COMPLETAT] Ce este ERP și de ce funcționează (învățarea toleranței la incertitudine).' },
  ],

  ladder: {
    title: 'Scara mea de expunere',
    intro: '[DE COMPLETAT] Ce este o treaptă și cum alegi de unde începi.',
    empty: 'Încă nu ai nicio treaptă pe scară.',
    add: 'Adaugă o treaptă',
    level: (n) => `${n}`,
    levelLabel: (n) => `Nivel ${n} din 100`,
    start: 'Începe o expunere',
    edit: 'Editează',
  },

  // Shared 0–100 scale wording. [DE COMPLETAT] anchors to be reviewed by a clinician.
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
        { type: 'text', text: '[DE COMPLETAT] Rămâi în situație. Nu face compulsia. Lasă gândul nerezolvat.' },
        // Spec refinement (principle 4): never promise anxiety drops in X minutes.
        { type: 'text', text: '[DE VERIFICAT] Poate se va estompa, și chiar dacă nu, o pot duce.' },
        // Spec principle 3: taught as an attitude, not a phrase to repeat.
        { type: 'text', text: '[DE COMPLETAT] „Poate da, poate nu” ca atitudine, nu ca formulă.' },
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
      // No shame whatever the answer. [DE COMPLETAT]
      byResisted: {
        yes: '[DE COMPLETAT]',
        partly: '[DE COMPLETAT]',
        no: '[DE COMPLETAT] Fără rușine: și asta e învățare.',
      },
      back: 'Înapoi la scară',
    },
  },

  history: {
    title: 'Expuneri recente',
    learned: 'Am învățat:',
  },
}
