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
                        { type: 'set', property: 'valence', base: 0.9 },
                    ],
                },
                {
                    text: 'Nyfiket',
                    modifier: [
                        { type: 'set', property: 'key', base: 10 },
                        { type: 'set', property: 'mode', base: 0 },
                        { type: 'set', property: 'valence', base: 0.7 },
                    ],
                },
                {
                    text: 'Drömskt',
                    modifier: [
                        { type: 'set', property: 'key', base: 3 },
                        { type: 'set', property: 'mode', base: 1 },
                        { type: 'set', property: 'valence', base: 0.5 },
                    ],
                },
                {
                    text: 'Majestätiskt',
                    modifier: [
                        { type: 'set', property: 'key', base: 2 },
                        { type: 'set', property: 'mode', base: 1 },
                        { type: 'set', property: 'valence', base: 0.5 },
                    ],
                },
                {
                    text: 'Dystert',
                    modifier: [
                        { type: 'set', property: 'mode', base: 0 },
                        { type: 'set', property: 'valence', base: 0.3 },
                    ],
                },
                {
                    text: 'Ledset',
                    modifier: [
                        { type: 'set', property: 'mode', base: 0 },
                        { type: 'set', property: 'valence', base: 0 },
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
                    modifier: [{ type: 'set', property: 'tempo', base: 60 }],
                },
                {
                    text: 'Mittemellan',
                    modifier: [
                        { type: 'set', property: 'tempo', base: 100 },
                    ],
                },
                {
                    text: 'Snabbt',
                    modifier: [
                        { type: 'set', property: 'tempo', base: 140 },
                    ],
                },
                {
                    text: 'Vad är det snabbaste ni har?',
                    modifier: [{ type: 'set', property: 'tempo', base: 180 }],
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
                    text: 'Inte så intensivt, faktiskt',
                    modifier: [
                        { type: 'set', property: 'energy', base: 0.25 },
                    ],
                },
                {
                    text: 'Lagom klarar jag mig med',
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
                    text: 'Lite intensivt får det nog vara',
                    modifier: [
                        { type: 'set', property: 'energy', base: 0.75 },
                    ],
                },
                {
                    text: 'MYCKET!',
                    modifier: [
                        { type: 'set', property: 'energy', base: 1 },
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
                    Hur viktigt är det att kunna <em>dansa</em> till musiken?
                </>
            ),
            answers: [
                {
                    text: 'Jätteviktigt',
                    modifier: [
                        { type: 'set', property: 'danceability', base: 0.9 },
                    ],
                },
                {
                    text: 'Viktigt, men inte jätteviktigt',
                    modifier: [
                        { type: 'set', property: 'danceability', base: 0.65 },
                    ],
                },
                {
                    text: 'Sådär...',
                    modifier: [
                        {
                            type: 'set',
                            property: 'danceability',
                            base: 0.4,
                        },
                    ],
                },
                {
                    text: 'Vill absolut inte dansa',
                    modifier: [
                        {
                            type: 'set',
                            property: 'danceability',
                            base: 0.18,
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
                        { type: 'set', property: 'duration', base: 120_000 },
                    ],
                },
                {
                    text: 'Som på radio ungefär',
                    modifier: [
                        {
                            type: 'set',
                            property: 'duration',
                            base: 200_000,
                        },
                    ],
                },
                {
                    text: 'Halvlånga',
                    modifier: [
                        {
                            type: 'set',
                            property: 'duration',
                            base: 400_000,
                        },
                    ],
                },
                {
                    text: 'Jättelånga är bäst',
                    modifier: [
                        {
                            type: 'set',
                            property: 'duration',
                            base: 520_000,
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
