import { pages } from "../data/pages";
import { Redirect } from "./Redirect";
import { Route, Router } from "preact-iso";
import PageTransitions from "./PageTransitions";
import { useRef } from "react";

export const EVENT_ROUTER_CHANGE = 'routerChange';

interface IRouteProps {
    url: string,
    previous?: string;
}

function Routes() {
    const route = useRef<IRouteProps>({ url: window.location.pathname })
    return (
        <Router onRouteChange={(url) => {
            route.current = { url, previous: route.current.url };
            window.dispatchEvent(new CustomEvent<IRouteProps>(EVENT_ROUTER_CHANGE, { detail: route.current }))
        }}>
            <Route path="/" component={() => <Redirect to={pages[0].path} />} />
            <Route path="/:" component={() => <PageTransitions />} />
        </Router>
    );
}

export { Routes };
