import React, { createContext, useState } from 'react';

interface IAppContext {
    animation: string;
    setAnimation: React.Dispatch<string>;
}

const AppContext = createContext<IAppContext | null>(null);

interface Props {
    children: React.ReactNode;
}

function AppContextProvider({ children }: Props) {
    const [animation, setAnimation] = useState('roomToBottom');

    const appContext: IAppContext = {
        animation,
        setAnimation,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}

export { AppContext, AppContextProvider };
