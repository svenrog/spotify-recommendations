import { IValueSpace } from "./IValueSpace";

export interface IValueModifier extends IValueSpace {
    property: 'key' | 'mode' | 'duration' | 'tempo' | 'acousticness' | 'danceability' | 'energy' | 'instrumentalness' | 'valence';
    type: 'set' | 'adjust'
}