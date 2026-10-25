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
      intro: '[DE COMPLETAT] Câteva cuvinte calde de întâmpinare.',
      worstLink: 'Dacă ești acum în cel mai greu moment',
    },
    erp: {
      title: 'Expunere și prevenirea răspunsului',
      intro: '[DE COMPLETAT] Scara de expunere și sesiunile ghidate.',
    },
    progress: {
      title: 'Progresul tău',
      intro: '[DE COMPLETAT] Scorurile OCI-R în timp și curajul tău.',
    },
  },

  comingSoon: 'Această secțiune este în lucru.',
}
