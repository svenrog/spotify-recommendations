import { getCurrentUrl, RouterOnChangeArgs } from 'preact-router';
import React, { createContext, useState } from 'react';

interface IAppContext {
    route: RouterOnChangeArgs;
    setRoute: React.Dispatch<RouterOnChangeArgs>;
}

const AppContext = createContext<IAppContext | null>(null);

interface Props {
    children: React.ReactNode;
}

function AppContextProvider({ children }: Props) {
    const [route, setRoute] = useState<RouterOnChangeArgs>({
        url: getCurrentUrl(),
        active: null,
        current: null,
        router: null,
        matches: null,
        path: null,
        previous: undefined
    });
    const appContext: IAppContext = {
        route,
        setRoute
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}

export { AppContext, AppContextProvider };
