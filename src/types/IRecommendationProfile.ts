import { IValueSpace } from "./IValueSpace";

export interface IRecommendationProfile {
    durationMs: IValueSpace;
    key: IValueSpace;
    mode: IValueSpace;
    tempo: IValueSpace;
    acousticness: IValueSpace;
    danceability: IValueSpace;
    energy: IValueSpace;
    instrumentalness: IValueSpace;
    valence: IValueSpace;
    liveness: IValueSpace;
}