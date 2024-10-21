import { useContext, lazy, Suspense } from 'react';
import {
    Routes,
    Route,
    Navigate,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { PageTransition } from './transitions';
import { pages } from '../data/pages';
import { AppContext } from './contexts/AppContext';
import { PageType } from '../types/PageType';
import { PageComponent } from '../types/PageComponent';

const Stats = lazy(() => import('./pages/Stats'));
const Weights = lazy(() => import('./pages/Weights'));
const Page = lazy(() => import('./pages/Page'));
const Question = lazy(() => import('./pages/Question'));
const Result = lazy(() => import('./pages/Result'));

function Pages() {
    const location = useLocation();
    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    const getComponent = (page: PageType, index: number) => {
        const props: PageComponent = {
            page,
            nextPage:
                index < pages.length - 1
                    ? () => navigate(pages[index + 1].path)
                    : undefined,
        };

        switch (page.type) {
            case 'question':
                return <Question {...props} />;
            case 'results':
                return <Result {...props} />;
            case 'stats':
                return <Stats {...props} />;
            case 'weights':
                return <Weights {...props} />;
            default:
                return <Page {...props} />;
        }
    };

    if (appContext) {
        return (
            <PageTransition
                preset={appContext.animation}
                transitionKey={location.pathname}
                enterAnimation={''}
                exitAnimation={''}
            >
                <Suspense>
                    <Routes location={location}>
                        {pages.map((page, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={page.path}
                                    element={getComponent(page, index)}
                                />
                            );
                        })}
                        <Route path="/" element={<Navigate to={pages[0].path} />} />
                    </Routes>
                </Suspense>
            </PageTransition>
        );
    }

    return null;
}

export { Pages };
