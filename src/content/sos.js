// SOS screen content. No reassurance here, only skills (spec module F).
// Drafted 2026-10-25 (Claude + founder). ⚠️ Waiting for clinician review.
// Legal review pending for disclaimerShort.

export const sos = {
  title: 'SOS',
  intro: 'Ești aici și asta e deja un pas. Nu trebuie să faci compulsia ca să treci prin momentul acesta. Alege un singur exercițiu.',

  // Short disclaimer (spec: shown in short form on the SOS screen)
  disclaimerShort:
    'Această aplicație este un instrument de autoajutor și nu înlocuiește un psiholog, psihoterapeut sau psihiatru.',

  skills: [
    {
      id: 'acceptance',
      title: 'Lasă gândul să fie acolo',
      body: 'Nu te certa cu gândul și nu încerca să-l rezolvi. Spune-ți doar: „Am un gând că…”. Gândul poate sta acolo cât vrea. Tu poți continua ce făceai, chiar dacă e incomod. Cu cât lupți mai mult cu el, cu atât devine mai puternic.',
    },
    {
      id: 'urge-surfing',
      title: 'Surfează pe val',
      body: 'Impulsul de a face compulsia vine ca un val: crește, ajunge la vârf și, de cele mai multe ori, apoi scade. Nu trebuie să-l oprești și nici să-l asculți. Observă unde îl simți în corp, respiră încet și lasă valul să treacă pe sub tine. Chiar dacă durează mai mult, îl poți purta cu tine.',
    },
    {
      id: 'grounding',
      title: 'Revino în prezent',
      body: 'Uită-te în jur și numește: 5 lucruri pe care le vezi, 4 pe care le poți atinge, 3 sunete pe care le auzi, 2 mirosuri și un gust. Nu o faci ca să alungi gândul, ci ca să te întorci în locul în care ești acum, cu gândul cu tot.',
    },
    {
      id: 'maybe',
      title: 'Poate da, poate nu',
      body: 'Când TOC-ul îți cere certitudine, nu i-o da. „Poate se va întâmpla, poate nu. Nu știu. Aleg să trăiesc cu asta.” Nu e o formulă magică pe care trebuie s-o repeți până te liniștești. E o atitudine: accepți să nu știi și îți vezi mai departe de viață.',
    },
  ],

  worstLink: 'Dacă ești acum în cel mai greu moment',
}
