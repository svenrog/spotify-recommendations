import { IRecommendationProfile } from "../../types/IRecommendationProfile";
import { DURATION_MAX, DURATION_MIN, KEY_INVALID, KEY_MAX, TEMPO_MAX, TEMPO_MIN } from "../../utils/RecommendationWeights";

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