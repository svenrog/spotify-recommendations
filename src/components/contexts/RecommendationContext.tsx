import React, { createContext, useState } from 'react';
import { IValueSpace } from '../../types/IValueSpace';
import {
    IRecommendationProfile,
} from '../../types/IRecommendationProfile';
import { DURATION_MAX, DURATION_MIN, KEY_INVALID, KEY_MAX, TEMPO_MAX, TEMPO_MIN } from '../../utils/RecommendationWeights';

export interface IRecommendationContext extends IRecommendationProfile {
    setDurationMs: React.Dispatch<IValueSpace>;
    setKey: React.Dispatch<IValueSpace>;
    setMode: React.Dispatch<IValueSpace>;
    setTempo: React.Dispatch<IValueSpace>;
    setAcousticness: React.Dispatch<IValueSpace>;
    setDanceability: React.Dispatch<IValueSpace>;
    setEnergy: React.Dispatch<IValueSpace>;
    setInstrumentalness: React.Dispatch<IValueSpace>;
    setValence: React.Dispatch<IValueSpace>;
    setLiveness: React.Dispatch<IValueSpace>;
    setQuestionsAnswered: React.Dispatch<number>;
    questionsAnswered: number;
}

export const defaults: IRecommendationProfile = {
    durationMs: {
        min: DURATION_MIN,
        max: DURATION_MAX,
    },
    key: {
        min: KEY_INVALID,
        max: KEY_MAX,
    },
    mode: { min: 0, max: 1 },
    tempo: {
        min: TEMPO_MIN,
        max: TEMPO_MAX,
    },
    acousticness: {
        min: 0,
        max: 1,
    },
    danceability: {
        min: 0,
        max: 1,
    },
    energy: { min: 0, max: 1 },
    instrumentalness: {
        min: 0,
        max: 1,
    },
    liveness: {
        min: 0,
        max: 1,
    },
    valence: { min: 0, max: 1 },
}

const RecommendationContext = createContext<IRecommendationContext | null>(
    null
);

interface Props {
    children: React.ReactNode;
}

function RecommendationContextProvider({ children }: Props) {
    const [durationMs, setDurationMs] = useState<IValueSpace>(defaults.durationMs);
    const [key, setKey] = useState<IValueSpace>(defaults.key);
    const [mode, setMode] = useState<IValueSpace>(defaults.mode);
    const [tempo, setTempo] = useState<IValueSpace>(defaults.tempo);
    const [acousticness, setAcousticness] = useState<IValueSpace>(defaults.acousticness);
    const [danceability, setDanceability] = useState<IValueSpace>(defaults.danceability);
    const [energy, setEnergy] = useState<IValueSpace>(defaults.energy);
    const [instrumentalness, setInstrumentalness] = useState<IValueSpace>(defaults.instrumentalness);
    const [valence, setValence] = useState<IValueSpace>(defaults.valence);
    const [liveness, setLiveness] = useState<IValueSpace>(defaults.liveness);
    const [questionsAnswered, setQuestionsAnswered] = useState<number>(0)

    const context: IRecommendationContext = {
        durationMs,
        setDurationMs,
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
        liveness,
        setLiveness,
        questionsAnswered,
        setQuestionsAnswered,
    };

    return (
        <RecommendationContext.Provider value={context}>
            {children}
        </RecommendationContext.Provider>
    );
}

export { RecommendationContext, RecommendationContextProvider };
