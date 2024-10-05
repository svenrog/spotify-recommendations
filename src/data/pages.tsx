import { PageType } from '../types/PageType';

const pages: PageType[] = [
  {
    path: '/fraga-1',
    title: 'Fråga 1',
    type: 'question',
    color: '#02A676',
    content: {
      question: (
        <>
          Hur skulle du beskriva ditt nuvarande <em>humör</em>?
        </>
      ),
      answers: [
        {
          text: 'Glatt',
          modifier: [
            { type: 'set', property: 'key', base: 0 },
            { type: 'set', property: 'mode', base: 1 },
            { type: 'set', property: 'valence', base: 0.75, min: 0.5 },
          ],
        },
        {
          text: 'Nyfiket',
          modifier: [
            { type: 'set', property: 'key', base: 10 },
            { type: 'set', property: 'mode', base: 0 },
          ],
        },
        {
          text: 'Drömskt',
          modifier: [
            { type: 'set', property: 'key', base: 3 },
            { type: 'set', property: 'mode', base: 1 },
          ],
        },
        {
          text: 'Majestätiskt',
          modifier: [
            { type: 'set', property: 'key', base: 2 },
            { type: 'set', property: 'mode', base: 1 },
          ],
        },
        {
          text: 'Dystert',
          modifier: [
            { type: 'set', property: 'mode', base: 1 },
            { type: 'set', property: 'valence', base: 0.45, max: 0.65 },
          ],
        },
        {
          text: 'Ledset',
          modifier: [
            { type: 'set', property: 'mode', base: 1 },
            { type: 'set', property: 'valence', base: 0.25, max: 0.4 },
          ],
        },
        { text: 'Hoppa över', deemphasize: true },
      ],
    },
  },
  {
    path: '/fraga-2',
    title: 'Fråga 2',
    color: '#008C72',
    type: 'question',
    content: {
      question: (
        <>
          Vilket <em>tempo</em> föredrar du?
        </>
      ),
      answers: [
        {
          text: 'Långsamt och avkopplande',
          modifier: [{ type: 'set', property: 'tempo', base: 45, max: 70 }],
        },
        {
          text: 'Mittemellan',
          modifier: [
            { type: 'set', property: 'tempo', min: 65, base: 90, max: 140 },
          ],
        },
        {
          text: 'Snabbt',
          modifier: [
            { type: 'set', property: 'tempo', min: 100, base: 130, max: 160 },
          ],
        },
        {
          text: 'Vad är det snabbaste ni har?',
          modifier: [{ type: 'set', property: 'tempo', min: 110, base: 160 }],
        },
        { text: 'Hoppa över', deemphasize: true },
      ],
    },
  },
  {
    path: '/fraga-3',
    title: 'Fråga 3',
    color: '#007369',
    type: 'question',
    content: {
      question: (
        <>
          Vilken musikalisk <em>intensitet</em> är du ute efter?
        </>
      ),
      answers: [
        {
          text: 'Nej... inte så intensivt faktiskt',
          modifier: [
            { type: 'set', property: 'energy', min: 0, base: 0.25, max: 0.45 },
          ],
        },
        {
          text: 'Mittemellan klarar jag mig med',
          modifier: [
            {
              type: 'set',
              property: 'energy',
              min: 0.25,
              base: 0.5,
              max: 0.75,
            },
          ],
        },
        {
          text: 'Jo men lite intensivt får det nog vara',
          modifier: [
            { type: 'set', property: 'energy', min: 0.5, base: 0.75, max: 0.8 },
          ],
        },
        {
          text: 'Mycket intensivt!',
          modifier: [
            { type: 'set', property: 'energy', min: 0.6, base: 1, max: 1 },
          ],
        },

        { text: 'Hoppa över', deemphasize: true },
      ],
    },
  },
  {
    path: '/fraga-4',
    title: 'Fråga 4',
    color: '#005A5B',
    type: 'question',
    content: {
      question: (
        <>
          Hur viktigt är det att <em>dansa</em> till musiken?
        </>
      ),
      answers: [
        {
          text: 'Jätteviktigt',
          modifier: [
            { type: 'set', property: 'danceability', min: 0.6, base: 0.8 },
          ],
        },
        {
          text: 'Viktigt, men inte jätteviktigt',
          modifier: [
            { type: 'set', property: 'danceability', min: 0.4, base: 0.65 },
          ],
        },
        {
          text: 'Sådär',
          modifier: [
            {
              type: 'set',
              property: 'danceability',
              min: 0.25,
              base: 0.5,
              max: 0.75,
            },
          ],
        },
        {
          text: 'Absolut inte',
          modifier: [
            {
              type: 'set',
              property: 'danceability',
              min: 0,
              base: 0.1,
              max: 0.5,
            },
          ],
        },
        { text: 'Hoppa över', deemphasize: true },
      ],
    },
  },
  {
    path: '/fraga-5',
    title: 'Fråga 5',
    color: '#003840',
    type: 'question',
    content: {
      question: (
        <>
          Hur <em>lång</em> får låten vara?
        </>
      ),
      answers: [
        {
          text: 'Jag vill bara lyssna på korta låtar',
          modifier: [
            { type: 'set', property: 'duration', base: 120_000, max: 180_000 },
          ],
        },
        {
          text: 'Som på radio ungefär',
          modifier: [
            {
              type: 'set',
              property: 'duration',
              min: 120_000,
              base: 180_000,
              max: 360_000,
            },
          ],
        },
        {
          text: 'Halvlånga',
          modifier: [
            {
              type: 'set',
              property: 'duration',
              min: 180_000,
              base: 340_000,
              max: 500_000,
            },
          ],
        },
        {
          text: 'Jättelånga är bäst',
          modifier: [
            {
              type: 'set',
              property: 'duration',
              min: 180_000,
              base: 500_000,
            },
          ],
        },
        { text: 'Spelar ingen roll', deemphasize: true },
      ],
    },
  },
  {
    path: '/resultat',
    type: 'results',
    title: 'Resultat',
    color: '#161616',
    content: {
      title: (
        <>
          Nu är <em>resultatet</em> färdigställt
        </>
      ),
      body: 'Efter att ha utvärderat dina svar noga (men inte så värst länge), tror vi att du kommer gilla den här låten.',
    },
  },
  {
    path: '/stats',
    type: 'stats',
    title: 'Statistik',
    hide: true,
    color: '#161616',
    content: {
      title: (
        <>
          Här följer lite påkallade <em>grafer</em> från datamängden
        </>
      ),
      body: '',
    },
  },
];

export { pages };
