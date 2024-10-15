import { ChartData } from 'chart.js';
import { ITrackModel, ITrackProps } from '../types/ITrackModel';
import { IValueSpace } from '../types/IValueSpace';
import { QuestionContent } from '../types/QuestionContent';
import { pages } from '../data/pages';
import { ValueSpaceProperties } from '../types/IValueModifier';
import { IPlotPoint } from '../types/IPlotPoint';
const NO_DATA = {
    datasets: [],
};

const KEYS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export const LABEL_KEY = 'Tonart';
export const LABEL_MODE = 'Modus';
export const LABEL_DURATION_MS = 'Längd';
export const LABEL_TEMPO = 'Tempo';
export const LABEL_ENERGY = 'Energi';
export const LABEL_ACOUSTICNESS = 'Akust.';
export const LABEL_DANCEABILITY = 'Dans';
export const LABEL_VALENCE = 'Valens';
export const LABELS = [
    LABEL_KEY,
    LABEL_MODE,
    LABEL_DURATION_MS,
    LABEL_TEMPO,
    LABEL_ENERGY,
    LABEL_ACOUSTICNESS,
    LABEL_DANCEABILITY,
    LABEL_VALENCE
];

export function getKeyModeDataset(tracks?: ITrackModel[]): ChartData<'radar'> {
    if (!tracks) return NO_DATA;

    var majorSongs = tracks.filter((x) => x.mode === 1);
    var minorSongs = tracks.filter((x) => x.mode === 0);

    const majorCounts = getKeys(majorSongs);
    const minorCounts = getKeys(minorSongs);
    const answers = collectKeyAnswerValues();

    const answerCounts = [...KEYS];
    answers.forEach((t) => answerCounts[t]++);

    return {
        labels: ['C', 'C♯, D♭', 'D', 'D♯, E♭', 'E', 'F', 'F♯, G♭', 'G', 'G♯, A♭', 'A', 'A♯, B♭', 'B'],
        datasets: [
            {
                label: 'Moll',
                data: minorCounts,
            },
            {
                label: 'Dur',
                data: majorCounts,
            },
            {
                label: 'Svarsalternativ',
                data: answerCounts,
                spanGaps: true,
            }
        ],
    };
}

export function getTime(duration: number) {
    var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return { hours, minutes, seconds, milliseconds };
}

export function getScatterPlotDataset(propertyX: ValueSpaceProperties, propertyY: ValueSpaceProperties, tracks?: ITrackModel[], heatMap?: Map<string, number>): ChartData<'scatter'> {
    if (!tracks) return NO_DATA;
    return {
        labels: getTrackLabels(tracks),
        datasets: [{
            data: project(tracks, (t) => ({ x: t[propertyX], y: t[propertyY] })),
            backgroundColor: getBackgroundColors(tracks, heatMap),
        }, {
            data: collectAnswerValues(propertyX, propertyY),
            backgroundColor: '#e500ff11',
            borderColor: '#0090ff66',
            borderWidth: 1,
            pointRadius: 6,

        }],
    };
}

export function getBucketDataset(buckets?: ITrackProps<number[]>): ChartData<'matrix'> | null {
    if (!buckets) return null;

    let data: IPlotPoint[] = [];

    data.push(...getMatrixDataColumn(buckets.key, LABEL_KEY));
    data.push(...getMatrixDataColumn(buckets.mode, LABEL_MODE));
    data.push(...getMatrixDataColumn(buckets.durationMs, LABEL_DURATION_MS));
    data.push(...getMatrixDataColumn(buckets.tempo, LABEL_TEMPO));
    data.push(...getMatrixDataColumn(buckets.energy, LABEL_ENERGY));
    data.push(...getMatrixDataColumn(buckets.acousticness, LABEL_ACOUSTICNESS));
    data.push(...getMatrixDataColumn(buckets.danceability, LABEL_DANCEABILITY));
    data.push(...getMatrixDataColumn(buckets.valence, LABEL_VALENCE));

    return {
        datasets: [
            {
                label: 'Dataintervall',
                borderWidth: 1,
                data,
                backgroundColor: function (ctx) {
                    const point = ctx.dataset.data[ctx.dataIndex] as IPlotPoint;
                    return getCellColor(point.v);
                },
                width(c) {
                    const a = c.chart.chartArea || {};
                    return (a.right - a.left) / 8;
                },
                height(c) {
                    const divisor = c.dataIndex >= 6 && c.dataIndex < 8 ? 2 : 6;
                    const a = c.chart.chartArea || {};
                    return (a.bottom - a.top) / divisor;
                }
            }
        ],
    };
}

function getMatrixDataColumn(buckets: number[], key: string) {
    let column: IPlotPoint[] = [];
    const step: number = 6 / buckets.length;
    buckets.forEach((bucket, i) => {
        column.push({
            //@ts-ignore
            x: key,
            y: (i * step) + 0.5 + step / 2,
            v: bucket
        });
    });

    return column;
}

function getBackgroundColors(tracks?: ITrackModel[], heatMap?: Map<string, number>): Array<string> | undefined {
    if (!heatMap) return undefined;
    if (!tracks) return undefined;

    const values = new Array<string>(tracks.length);
    tracks.forEach((t, i) => values[i] = getColor(heatMap.get(t.id)));
    return values;
}

function getColor(count?: number): string {
    if (!count) return '#444';
    if (count > 200) return '#d83737';
    if (count > 100) return '#cd7241'
    if (count > 75) return '#bf9037';
    if (count > 50) return '#bebf5b';
    if (count > 35) return '#4dd5ac';
    if (count > 20) return '#2caef2';
    return '#477ca0';
}

function getCellColor(count?: number): string {
    if (!count) return '#111';
    if (count > 10) return '#d83737';
    if (count > 8) return '#cd7241'
    if (count > 6) return '#bf9037';
    if (count > 5) return '#bebf5b';
    if (count > 2) return '#2b6654';
    if (count > 1) return '#1c242b';
    return '#141b20';
}

function getTrackLabels(tracks: ITrackModel[]): Array<string> {
    const values = new Array<string>(tracks.length);
    tracks.forEach((t, i) => values[i] = `${t.artistName} - ${t.name}`);
    return values;
}

function getKeys(tracks: ITrackModel[]): Array<number> {
    const counts = [...KEYS];
    tracks.forEach((t) => counts[t.key]++);
    return counts;
}

function project(tracks: ITrackModel[], projection: (t: ITrackModel) => IPlotPoint): Array<IPlotPoint> {
    const values = new Array<IPlotPoint>(tracks.length);
    tracks.forEach((t, i) => values[i] = projection(t));
    return values;
}

function collectAnswerValues(property1: string, property2: string): Array<IPlotPoint> {
    const space = collectQuestionSpace([property1, property2]);
    const values = [];

    for (var i = 0; i < space[0].length; i++) {
        for (var j = 0; j < space[1].length; j++) {
            values.push({ x: space[0][i].base ?? 0, y: space[1][j].base ?? 0 });
        }
    }

    return values;
}

function collectKeyAnswerValues(): Array<number> {
    const space = collectQuestionSpace(['key']);
    const values = [];

    for (var i = 0; i < space[0].length; i++) {
        values.push(space[0][i].base ?? 0);
    }

    return values;
}

function collectQuestionSpace(properties: string[]): IValueSpace[][] {
    const result: IValueSpace[][] = [];
    properties.forEach((_, i) => result[i] = []);

    for (const page of pages) {
        const question = page.content as QuestionContent;
        if (!question?.answers) continue;

        for (const answer of question.answers) {
            if (!answer.modifier) continue;

            for (const modifier of answer.modifier) {
                const index = properties.indexOf(modifier.property);
                if (index < 0) continue;

                // Don't collect answers that only filter, there is no way to visualize them yet.
                if (modifier.base === undefined) continue;

                result[index].push({ min: modifier.min, base: modifier.base, max: modifier.max });
            }
        }
    }
    return result;
}
