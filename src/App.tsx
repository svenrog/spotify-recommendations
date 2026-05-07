import { useEffect } from 'react';
import { LocationProvider } from 'preact-iso';
import { RecommendationContextProvider } from './components/contexts/RecommendationContext';
import { GlobalStyles } from './components/GlobalStyles';
import { FontStyles } from './components/FontStyles';
import { Routes } from './components/Routes';
import { preloadTracks } from './data/trackLoader';

export interface IApplicationProps {
    ssr?: boolean;
    url?: string;
}

function App({ ssr, url }: IApplicationProps) {
    useEffect(() => {
        preloadTracks();
    }, []);

    return (
        <LocationProvider path={ssr ? url : window.location.pathname}>
            <RecommendationContextProvider>
                <FontStyles />
                <GlobalStyles />
                <Routes />
            </RecommendationContextProvider>
        </LocationProvider>
    );
}

export default App;
