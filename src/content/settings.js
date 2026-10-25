// Settings screen text: privacy, export and delete-all.

export const settings = {
  title: 'Setări',

  privacy: {
    title: 'Datele tale rămân la tine',
    body: 'Tot ce scrii în aplicație se salvează doar pe acest dispozitiv. Nu ai cont, nu există server și nimeni altcineva nu îți poate vedea gândurile sau notițele.',
    iphoneTip: 'Pe iPhone, adaugă aplicația pe ecranul principal (Partajează → Adaugă pe ecranul principal). Altfel, Safari poate șterge datele dacă nu deschizi aplicația câteva zile.',
  },

  saved: {
    title: 'Ce este salvat pe acest dispozitiv',
    empty: 'Încă nu ai salvat nimic.',
    // Friendly names for each store in db.js
    labels: {
      meta: 'Setări',
      compulsions: 'Compulsii în inventar',
      ladderItems: 'Trepte pe scara de expunere',
      sessions: 'Sesiuni de expunere',
      logs: 'Înregistrări rapide',
      ocir: 'Chestionare OCI-R',
      readCounts: 'Capitole citite',
    },
  },

  export: {
    title: 'Descarcă datele tale',
    body: 'Un fișier JSON cu tot ce ai salvat. Îl poți păstra ca rezervă.',
    button: 'Descarcă fișierul',
    filePrefix: 'datele-mele-ocd',
    done: 'Fișierul a fost descărcat.',
  },

  deleteAll: {
    title: 'Șterge toate datele',
    body: 'Șterge definitiv tot ce ai salvat pe acest dispozitiv. Nu poate fi anulat. Poți descărca mai întâi o copie.',
    button: 'Șterge toate datele',
    confirmQuestion: 'Sigur vrei să ștergi tot? Nu se poate anula.',
    confirmButton: 'Da, șterge tot',
    cancelButton: 'Renunță',
    done: 'Toate datele au fost șterse de pe acest dispozitiv.',
  },

  disclaimerTitle: 'Avertisment',
  error: 'Ceva nu a funcționat. Încearcă din nou.',
}
