import tracks from './popular.json';
import type { ITrackModel } from '../types/ITrackModel';

export { tracks }; // static — used by Stats, Weights, SSR prerendering

let cached: ITrackModel[] | null = null;

export async function preloadTracks(): Promise<ITrackModel[]> {
    if (cached) return cached;
    const res = await fetch('/data/popular.json');
    cached = await res.json() as ITrackModel[];
    return cached;
}
