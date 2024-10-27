import { lazy, memo, Suspense } from 'react';
import { useLocation } from 'preact-iso';
import { pages } from '../data/pages';
import { PageType } from '../types/PageType';
import { PageComponent } from '../types/PageComponent';

const Stats = lazy(() => import('./pages/Stats'));
const Weights = lazy(() => import('./pages/Weights'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Question = lazy(() => import('./pages/Question'));
const Result = lazy(() => import('./pages/Result'));

interface PagesProps {
    url: string;
}

function Pages({ url }: PagesProps) {
    const { route } = useLocation();
    const getComponent = (page: PageType, index: number) => {
        const props: PageComponent = {
            page,
            nextPage:
                index < pages.length - 1
                    ? () => route(pages[index + 1].path)
                    : undefined,
        };

        switch (page?.type) {
            case 'question':
                return <Question {...props} />;
            case 'results':
                return <Result {...props} />;
            case 'stats':
                return <Stats {...props} />;
            case 'weights':
                return <Weights {...props} />;
            default:
                return <NotFound {...props} />;
        }
    };

    // Hey look at this fancy code right here
    const index = pages.findIndex(x => x.path === url);
    const page = pages[index];

    return (
        <Suspense fallback={null}>
            {getComponent(page, index)}
        </Suspense>
    );
}

export default memo(Pages);
