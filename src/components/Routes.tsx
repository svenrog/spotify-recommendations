import { pages } from "../data/pages";
import { Redirect } from "./Redirect";
import { Route, Router } from "preact-iso";
import PageTransitions from "./PageTransitions";

function Routes() {
    return (
        <Router>
            <Route path="/" component={() => <Redirect to={pages[0].url} />} />
            <Route path="/*" component={() => <PageTransitions />} />
        </Router>
    );
}

export { Routes };
