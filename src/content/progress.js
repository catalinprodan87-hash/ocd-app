// Progress view (spec: "scale score over weeks and exposures completed, celebrating effort").
// No streaks, no daily counts, no "perfect" goals.

export const progress = {
  title: 'Progresul tău',
  intro: '[DE COMPLETAT] Aici vezi curajul tău și cum evoluează lucrurile în timp. Nu e o notă.',

  ocir: {
    title: 'Chestionarul OCI-R',
    none: '[DE COMPLETAT] Încă nu ai completat chestionarul. Îl poți face acum, apoi o dată la câteva săptămâni.',
    take: 'Completează chestionarul',
    takeAgain: 'Completează din nou',
    single: (date) => `Completat pe ${date}`,
    scoreOf: (max) => `din ${max}`,
    chartLabel: (first, last, count) => `Scorul OCI-R în timp: ${count} completări, de la ${first} la ${last}.`,
    tooltipDate: (date) => date,
    tableToggle: 'Vezi ca tabel',
    tableDate: 'Data',
    tableScore: 'Scor',
  },

  courage: {
    title: 'Curajul tău',
    exposures: (n) => (n === 1 ? 'Ai făcut 1 expunere.' : `Ai făcut ${n} expuneri.`),
    none: '[DE COMPLETAT] Când faci prima expunere, o vei vedea aici.',
    // Courage badges: highest step levels faced (spec: "You faced a level-60 trigger").
    // Every completed exposure counts — whether or not the compulsion was resisted.
    badge: (level) => `Ai înfruntat o treaptă de nivel ${level} sau mai mult`,
  },
}
