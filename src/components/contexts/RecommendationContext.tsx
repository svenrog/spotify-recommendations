import React, { createContext, useState } from 'react';
import { IValueSpace } from '../../types/IValueSpace';
import {
    DURATION_MAX,
    IRecommendationProfile,
    KEY_INVALID,
    KEY_MAX,
    TEMPO_MAX,
    TEMPO_MIN,
} from '../../types/IRecommendationProfile';

export interface IRecommendationContext extends IRecommendationProfile {
    setDuration: React.Dispatch<IValueSpace>;
    setKey: React.Dispatch<IValueSpace>;
    setMode: React.Dispatch<IValueSpace>;
    setTempo: React.Dispatch<IValueSpace>;
    setAcousticness: React.Dispatch<IValueSpace>;
    setDanceability: React.Dispatch<IValueSpace>;
    setEnergy: React.Dispatch<IValueSpace>;
    setInstrumentalness: React.Dispatch<IValueSpace>;
    setValence: React.Dispatch<IValueSpace>;
}

const RecommendationContext = createContext<IRecommendationContext | null>(
    null
);

interface Props {
    children: React.ReactNode;
}

function RecommendationContextProvider({ children }: Props) {
    const [duration, setDuration] = useState<IValueSpace>({
        min: 0,
        max: DURATION_MAX,
    });

    const [key, setKey] = useState<IValueSpace>({
        min: KEY_INVALID,
        max: KEY_MAX,
    });
    const [mode, setMode] = useState<IValueSpace>({ min: 0, max: 1 });
    const [tempo, setTempo] = useState<IValueSpace>({
        min: TEMPO_MIN,
        max: TEMPO_MAX,
    });
    const [acousticness, setAcousticness] = useState<IValueSpace>({
        min: 0,
        max: 1,
    });
    const [danceability, setDanceability] = useState<IValueSpace>({
        min: 0,
        max: 1,
    });
    const [energy, setEnergy] = useState<IValueSpace>({ min: 0, max: 1 });
    const [instrumentalness, setInstrumentalness] = useState<IValueSpace>({
        min: 0,
        max: 1,
    });
    const [valence, setValence] = useState<IValueSpace>({ min: 0, max: 1 });

    const context: IRecommendationContext = {
        duration,
        setDuration,
        key,
        setKey,
        mode,
        setMode,
        tempo,
        setTempo,
        acousticness,
        setAcousticness,
        danceability,
        setDanceability,
        energy,
        setEnergy,
        instrumentalness,
        setInstrumentalness,
        valence,
        setValence,
    };

    return (
        <RecommendationContext.Provider value={context}>
            {children}
        </RecommendationContext.Provider>
    );
}

export { RecommendationContext, RecommendationContextProvider };
