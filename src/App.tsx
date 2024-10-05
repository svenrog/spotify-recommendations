import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './components/contexts/AppContext';
import { RecommendationContextProvider } from './components/contexts/RecommendationContext';
import { GlobalStyles } from './components/GlobalStyles';
import { Navigation } from './components/Navigation';
import { Routes } from './components/Routes';

function App() {
  return (
    <AppContextProvider>
      <RecommendationContextProvider>
        <BrowserRouter>
          <GlobalStyles />
          <Navigation />
          <Routes />
        </BrowserRouter>
      </RecommendationContextProvider>
    </AppContextProvider>
  );
}

export default App;
