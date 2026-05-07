import type { ITrackModel } from '../types/ITrackModel';
let cachedTracks: ITrackModel[] | undefined;

export const loadTracks = async (): Promise<ITrackModel[]> => {
    if (cachedTracks) return cachedTracks;
    const mod = await import('./popular.json');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const data: ITrackModel[] = (mod as any).default ?? [];
    cachedTracks = data;
    return data;
};

// Static import for backward compatibility in other modules.
import tracks from './popular.json';
export { tracks };