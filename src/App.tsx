import type { ITrackModel } from './types/ITrackModel';
import { useEffect, useState } from 'react';
import { LocationProvider } from 'preact-iso';
import { RecommendationContextProvider } from './components/contexts/RecommendationContext';
import { GlobalStyles } from './components/GlobalStyles';
import { FontStyles } from './components/FontStyles';
import { Routes } from './components/Routes';
import { TracksProvider } from './components/contexts/TracksContext';
import { preloadTracks } from './data/tracks';

export interface IApplicationProps {
    ssr?: boolean;
    url?: string;
}

function App({ ssr, url }: IApplicationProps) {
    const [trackData, setTrackData] = useState<ITrackModel[] | null>(null);

    useEffect(() => {
        preloadTracks().then(setTrackData);
    }, []);

    return (
        <LocationProvider path={ssr ? url : window.location.pathname}>
            <RecommendationContextProvider>
                <TracksProvider value={trackData}>
                    <FontStyles />
                    <GlobalStyles />
                    <Routes />
                </TracksProvider>
            </RecommendationContextProvider>
        </LocationProvider>
    );
}

export default App;
