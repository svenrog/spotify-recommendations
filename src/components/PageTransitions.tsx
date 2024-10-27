import Pages from "./Pages";
import { useEffect, useState } from "react";
import { PageTransitionGroup } from "./transitions/PageTransitionGroup";
import { pageTransitionDuration, TransitionStyles } from "./transitions/TransitionStyles";
import { EVENT_ROUTER_CHANGE, IRouteProps } from "./Routes";

const initialClassName = "page load";
const enterClassName = "page page-appear";
const exitClassName = "page page-exit";

let initialized = false;

function PageTransitions() {
    const [url, setUrl] = useState<string>(window.location.pathname)
    const [previousUrl, setPreviousUrl] = useState<string>()
    const [renderPrevious, setRenderPrevious] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener(EVENT_ROUTER_CHANGE, updateRoute);
        return () => window.removeEventListener(EVENT_ROUTER_CHANGE, updateRoute);
    }, [])

    const updateRoute = (x: CustomEvent<IRouteProps>) => {
        setUrl(x.detail.url);
        const previous = x.detail.previous;
        const hasPrevious = Boolean(previous)
        if (!hasPrevious) return;

        setPreviousUrl(previous);
        setRenderPrevious(true);
        setTimeout(() => {
            setRenderPrevious(false)
        }, pageTransitionDuration)
    };

    let initialRender = false;

    if (!initialized) {
        initialized = true;
        initialRender = true;
    }

    return (
        <>
            <TransitionStyles />
            <PageTransitionGroup>
                {<div key={url} className={initialRender ? initialClassName : enterClassName}><Pages url={url} /></div>}
                {renderPrevious && <div key={previousUrl} className={exitClassName}><Pages url={previousUrl} /></div>}
            </PageTransitionGroup>
        </>
    );
}

export default PageTransitions;