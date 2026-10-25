// Psychoeducation (spec module B). To add a chapter: create a file like the others,
// import it here and put it in the list. The order of the list is the order in the app.
import ceEsteToc from './ce-este-toc.js'
import gandurIntruzive from './ganduri-intruzive.js'
import alarma from './alarma.js'
import cuCatLupti from './cu-cat-lupti.js'
import innebunesc from './innebunesc.js'
import terapieMedicatie from './terapie-medicatie.js'
import povesti from './povesti.js'

export const chapters = [ceEsteToc, gandurIntruzive, alarma, cuCatLupti, innebunesc, terapieMedicatie, povesti]

export const learn = {
  title: 'Învață despre TOC',
  intro: '[DE COMPLETAT] Capitole scurte. Le poți citi în orice ordine.',
  chapterLabel: (n) => `Capitolul ${n}`,
  previous: '← Capitolul anterior',
  next: 'Capitolul următor →',
  backToList: 'Toate capitolele',
}
