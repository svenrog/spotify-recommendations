import { IValueSpace } from "./IValueSpace";

export const DURATION_MAX: number = 900_000;
export const KEY_MAX: number = 12;
export const KEY_INVALID: number = -1;
export const TEMPO_MAX: number = 300;
export const TEMPO_MIN: number = 40;

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