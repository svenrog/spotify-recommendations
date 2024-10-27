import { lazy, memo, Suspense } from 'react';
import { useLocation } from 'preact-iso';
import { pages } from '../data/pages';
import { PageType } from '../types/PageType';
import { PageComponent } from '../types/PageComponent';

const Stats = lazy(() => import('./pages/Stats'));
const Weights = lazy(() => import('./pages/Weights'));
const Page = lazy(() => import('./pages/Page'));
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

    const index = pages.findIndex(x => x.path === url);

    return (
        <Suspense fallback={null}>
            {getComponent(pages[index], index)}
        </Suspense>
    );
}

export default memo(Pages);
