import { IValueSpace } from "./IValueSpace";

export interface IRecommendationProfile {
    duration: IValueSpace;
    key: IValueSpace;
    mode: IValueSpace;
    tempo: IValueSpace;
    acousticness: IValueSpace;
    danceability: IValueSpace;
    energy: IValueSpace;
    instrumentalness: IValueSpace;
    valence: IValueSpace;
}