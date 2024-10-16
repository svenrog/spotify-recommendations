import { useContext } from 'react';
import { RecommendationContext, IRecommendationContext } from '../components/contexts/RecommendationContext';
import { IValueModifier } from '../types/IValueModifier';
import { adjustValueSpace, setValueSpace } from '../utils/ValueSpaceUtils';

export function useRecommendations(): [IRecommendationContext | null, (value?: IValueModifier[]) => void] {
    const context = useContext(RecommendationContext);

    const updateValueSpace = (values?: IValueModifier[]) => {
        if (!context) return;
        if (!values) return;

        for (const value of values) {
            const prevValue = context[value.property];
            const newValue = value.type === 'adjust' ? adjustValueSpace(prevValue, value) : setValueSpace(prevValue, value)

            switch (value.property) {
                case 'key': context.setKey(newValue); break;
                case 'mode': context.setMode(newValue); break;
                case 'durationMs': context.setDurationMs(newValue); break;
                case 'tempo': context.setTempo(newValue); break;
                case 'acousticness': context.setAcousticness(newValue); break;
                case 'danceability': context.setDanceability(newValue); break;
                case 'energy': context.setEnergy(newValue); break;
                case 'instrumentalness': context.setInstrumentalness(newValue); break;
                case 'valence': context.setValence(newValue); break;
                case 'liveness': context.setLiveness(newValue); break;
            }
        }

        context.setQuestionsAnswered(++context.questionsAnswered);
    }

    return [context, updateValueSpace]
}