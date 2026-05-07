import React, { createContext, useContext } from 'react';
import { ITrackModel } from '../../types/ITrackModel';
import { tracks as staticTracks } from '../../data/tracks';

const TracksContext = createContext<{ tracks: ITrackModel[] | null }>({
    tracks: null,
});

interface Props {
    value: typeof staticTracks | null;
    children: React.ReactNode;
}

function TracksProvider({ value, children }: Props) {
    const trackList = React.useMemo(() => {
        if (value) return value;
        return staticTracks; // fallback for SSR / no-preload case
    }, [value]);

    const ctx = React.useMemo(() => ({ tracks: trackList }), [trackList]);

    return (
        <TracksContext.Provider value={ctx}>
            {children}
        </TracksContext.Provider>
    );
}

function useTracks() {
    return useContext(TracksContext);
}

export { TracksProvider, useTracks };
