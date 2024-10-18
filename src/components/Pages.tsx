import { useContext, lazy } from 'react';
import {
    Routes,
    Route,
    Navigate,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { PageTransition } from '@steveeeie/react-page-transition';
import { pages } from '../data/pages';
import { AppContext } from './contexts/AppContext';
import { PageType } from '../types/PageType';
import { PageComponent } from '../types/PageComponent';
import '../utils/AnimationBootstrap';

const Stats = lazy(() => import('./pages/Stats'));
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
            </PageTransition>
        );
    }

    return null;
}

export { Pages };
