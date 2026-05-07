import type { ITrackModel } from '../types/ITrackModel';

let cache: ITrackModel[] | null = null;
let promise: Promise<ITrackModel[]> | null = null;

export function preloadTracks(): Promise<ITrackModel[]> {
    if (!promise) {
        promise = import('./tracks').then(m => {
            cache = m.tracks as ITrackModel[];
            return cache;
        });
    }
    return promise;
}

export function getCachedTracks(): ITrackModel[] | null {
    return cache;
}
