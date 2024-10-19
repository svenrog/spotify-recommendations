import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './components/contexts/AppContext';
import { RecommendationContextProvider } from './components/contexts/RecommendationContext';
import { GlobalStyles } from './components/GlobalStyles';
import { Routes } from './components/Routes';

function App() {
    return (
        <AppContextProvider>
            <RecommendationContextProvider>
                <BrowserRouter>
                    <GlobalStyles />
                    <Routes />
                </BrowserRouter>
            </RecommendationContextProvider>
        </AppContextProvider>
    );
}

export default App;
