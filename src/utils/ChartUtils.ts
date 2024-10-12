import { ChartData } from 'chart.js';
import { ITrackModel } from '../types/ITrackModel';
import { IValueSpace } from '../types/IValueSpace';
import { QuestionContent } from '../types/QuestionContent';
import { pages } from '../data/pages';
import { ValueSpaceProperties } from '../types/IValueModifier';

interface IPlotPoint {
    x: number;
    y: number;
}

const NO_DATA = {
    datasets: [],
};

const KEYS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export function getKeyModeDataset(tracks?: ITrackModel[]): ChartData<'radar'> {
    if (!tracks) return NO_DATA;

    var majorSongs = tracks.filter((x) => x.mode === 1);
    var minorSongs = tracks.filter((x) => x.mode === 0);

    const majorCounts = getKeys(majorSongs);
    const minorCounts = getKeys(minorSongs);

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
            borderColor: 'transparent'
        }, {
            data: collectAnswerValues(propertyX, propertyY),
            backgroundColor: '#e500ff',
            borderColor: 'transparent'
        }],
    };
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
    if (count > 200) return '#f22c2c';
    if (count > 100) return '#ff5900'
    if (count > 75) return '#f2ae2c';
    if (count > 50) return '#f0f22c';
    if (count > 35) return '#4dd5ac';
    if (count > 20) return '#2caef2';
    return '#477ca0';
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