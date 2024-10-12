import { IValueSpace } from "./IValueSpace";

export type ValueSpaceProperties = 'key' | 'mode' | 'durationMs' | 'tempo' | 'acousticness' | 'danceability' | 'energy' | 'instrumentalness' | 'valence' | 'liveness';

export interface IValueModifier extends IValueSpace {
    property: ValueSpaceProperties;
    type: 'set' | 'adjust'
}