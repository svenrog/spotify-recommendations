import { useState, useEffect } from 'react';
import type { ITrackModel } from '../types/ITrackModel';
import { getCachedTracks, preloadTracks } from '../data/trackLoader';

export function useTracks(): ITrackModel[] | null {
    const [tracks, setTracks] = useState<ITrackModel[] | null>(getCachedTracks);

    useEffect(() => {
        if (tracks !== null) return;
        preloadTracks().then(setTracks);
    }, []);

    return tracks;
}
