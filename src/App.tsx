import { LocationProvider } from 'preact-iso';
import { RecommendationContextProvider } from './components/contexts/RecommendationContext';
import { GlobalStyles } from './components/GlobalStyles';
import { FontStyles } from './components/FontStyles';
import { Routes } from './components/Routes';

function App() {
    return (
        <LocationProvider>
            <RecommendationContextProvider>
                <FontStyles />
                <GlobalStyles />
                <Routes />
            </RecommendationContextProvider>
        </LocationProvider>
    );
}

export default App;
