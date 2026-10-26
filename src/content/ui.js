// Short interface text: navigation, buttons, page titles.
// Longer content (chapters, SOS steps, founder messages) gets its own file in this folder.
// Text marked [DE COMPLETAT] is a placeholder waiting for real Romanian content.

export const ui = {
  appName: 'Aplicație OCD', // [DE COMPLETAT] — numele final

  nav: {
    home: 'Acasă',
    learn: 'Învață',
    compulsions: 'Compulsii',
    erp: 'Expunere',
    progress: 'Progres',
    settings: 'Setări',
  },

  navLabel: 'Navigare principală', // for screen readers
  sosButton: 'SOS',
  back: '← Înapoi',
  sosButtonLabel: 'Deschide ecranul SOS', // for screen readers

  pages: {
    home: {
      title: 'Bun venit',
      intro: 'Ne bucurăm că ești aici. Poți face azi un pas mic: citește un capitol, notează o compulsie sau încearcă o expunere. Dacă e un moment greu, apasă SOS.',
      worstLink: 'Dacă ești acum în cel mai greu moment',
    },
  },
}
