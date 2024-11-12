import React, { createContext } from 'react';

interface ColorContextType {
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
}

const ColorContext = createContext<ColorContextType>({
    backgroundColor: '#ffffff',
    setBackgroundColor: () => { },
});