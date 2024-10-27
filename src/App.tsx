import { AppContextProvider } from './components/contexts/AppContext';
import { LocationProvider } from 'preact-iso';
import { RecommendationContextProvider } from './components/contexts/RecommendationContext';
import { GlobalStyles } from './components/GlobalStyles';
import { Routes } from './components/Routes';

function App() {
    return (
        <LocationProvider>
            <RecommendationContextProvider>
                <GlobalStyles />
                <Routes />
            </RecommendationContextProvider>
        </LocationProvider>
    );
}

export default App;
