import type { ITrackModel } from '../types/ITrackModel';
let cachedTracks: ITrackModel[] | undefined;

export const loadTracks = async (): Promise<ITrackModel[]> => {
    if (cachedTracks) return cachedTracks;
    const mod = await import('./popular.json');
    const data: ITrackModel[] = (mod as { default?: ITrackModel[] }).default ?? [];
    cachedTracks = data;
    return data;
};

// Static import for backward compatibility in other modules.
import tracks from './popular.json';
export { tracks };