import { createContext, useState, type Dispatch, type ReactNode } from 'react';
import type { IValueSpace } from '../../types/IValueSpace';
import type { IRecommendationProfile } from '../../types/IRecommendationProfile';
import { defaults } from './defaults';

export interface IRecommendationContext extends IRecommendationProfile {
    setDurationMs: Dispatch<IValueSpace>;
    setKey: Dispatch<IValueSpace>;
    setMode: Dispatch<IValueSpace>;
    setTempo: Dispatch<IValueSpace>;
    setAcousticness: Dispatch<IValueSpace>;
    setDanceability: Dispatch<IValueSpace>;
    setEnergy: Dispatch<IValueSpace>;
    setInstrumentalness: Dispatch<IValueSpace>;
    setValence: Dispatch<IValueSpace>;
    setLiveness: Dispatch<IValueSpace>;
    setQuestionsAnswered: Dispatch<number>;
    questionsAnswered: number;
}

const RecommendationContext = createContext<IRecommendationContext | null>(
    null
);

interface Props {
    children: ReactNode;
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
