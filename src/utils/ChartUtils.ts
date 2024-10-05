import { ChartData, ChartDataset } from 'chart.js';
import { ITrackModel } from '../types/ITrackModel';

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

export function getTempoEnergyDataset(tracks?: ITrackModel[]): ChartData<'scatter'> {
    if (!tracks) return NO_DATA;
    return {
        labels: getLabels(tracks),
        datasets: [{
            data: getTempoEnergy(tracks),
        }]
    };
  }

  export function getDanceabilityValenceDataset(tracks?: ITrackModel[]): ChartData<'scatter'> {
    if (!tracks) return NO_DATA;
    return {
        labels: getLabels(tracks),
        datasets: [{
            data: getDanceabilityValence(tracks),
        }]
    };
  }

  

function getKeys(tracks: ITrackModel[]): Array<number> {
  const counts = [...KEYS];
  tracks.forEach((t) => counts[t.key]++);
  return counts;
}

function getTempoEnergy(tracks: ITrackModel[]): Array<IPlotPoint> {
    return project(tracks, (t) => ({ x: t.tempo, y: t.energy}));
}

function getDanceabilityValence(tracks: ITrackModel[]): Array<IPlotPoint> {
    return project(tracks, (t) => ({ x: t.danceability, y: t.valence}));
}

function project(tracks: ITrackModel[], projection: (t: ITrackModel) => IPlotPoint): Array<IPlotPoint> {
    const values = new Array<IPlotPoint>(tracks.length);
    tracks.forEach((t, i) => values[i] = projection(t));
    return values;
}

function getLabels(tracks: ITrackModel[]): Array<string> {
    const values = new Array<string>(tracks.length);
    tracks.forEach((t, i) => values[i] = `${t.artistName} - ${t.name}`);
    return values;
}
  