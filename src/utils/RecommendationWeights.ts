import { ITrackProps } from "../types/ITrackModel";

export const DURATION_MAX: number = 900_000;
export const KEY_MAX: number = 12;
export const KEY_DIVISOR: number = 6;
export const KEY_INVALID: number = -1;
export const TEMPO_MAX: number = 200;
export const TEMPO_MIN: number = 60;

const WEIGHT_KEY: number = 1;
const WEIGHT_MODE: number = 1.5;
const WEIGHT_DURATION: number = 2;
const WEIGHT_DURATION_POWER: number = 0.75;
const WEIGHT_TEMPO: number = 1;
const WEIGHT_TEMPO_POWER: number = 1.5;
const WEIGHT_DANCEABILITY: number = 1;
const WEIGHT_DANCEABILITY_POWER: number = 1;
const WEIGHT_ENERGY: number = 1;
const WEIGHT_VALENCE: number = 2;

/* These aren't in any question */
const WEIGHT_ACOUSTICNESS: number = 0;
const WEIGHT_INSTRUMENTALNESS: number = 0;

// If user steps back and selects another value, relevance can be tweaked
export const MULTIPLE_OPERATION_SCALE: number = 2;
export const MULTIPLE_OPERATIONS_MAX: number = 2;

/* All values should be normalized beforehand */
export const Scaling: ITrackProps<(x: number) => number> = {
    key: (x) => x * WEIGHT_KEY,
    mode: (x) => x * WEIGHT_MODE,
    durationMs: (x) => Math.pow(x, WEIGHT_DURATION_POWER) * WEIGHT_DURATION,
    tempo: (x) => Math.pow(x, WEIGHT_TEMPO_POWER) * WEIGHT_TEMPO,
    danceability: (x) => Math.pow(x, WEIGHT_DANCEABILITY_POWER) * WEIGHT_DANCEABILITY,
    energy: (x) => x * WEIGHT_ENERGY,
    valence: (x) => x * WEIGHT_VALENCE,

    /* These aren't in any question */
    acousticness: (x) => x * WEIGHT_ACOUSTICNESS,
    instrumentalness: (x) => x * WEIGHT_INSTRUMENTALNESS,
}