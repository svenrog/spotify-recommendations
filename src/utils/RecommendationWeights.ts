import { ITrackProps } from "../types/ITrackModel";
import { clamp } from "./ValueSpaceUtils";

export const DURATION_MAX: number = 900_000;
export const DURATION_MIN: number = 100_000;
export const KEY_MAX: number = 11;
export const KEY_DIVISOR: number = 6;
export const KEY_INVALID: number = -1;
export const TEMPO_MAX: number = 200;
export const TEMPO_MIN: number = 60;

const WEIGHT_KEY: number = 1.5;
const WEIGHT_KEY_FLOOR: number = 0.1;
const WEIGHT_KEY_POWER: number = 1.5;

const WEIGHT_MODE: number = 1.8;

const WEIGHT_DURATION: number = 3.5;
const WEIGHT_DURATION_POWER: number = 2;

const WEIGHT_TEMPO: number = 1.5;
const WEIGHT_TEMPO_POWER: number = 2;

const WEIGHT_DANCEABILITY: number = 1.5;
const WEIGHT_DANCEABILITY_POWER: number = 1.5;

const WEIGHT_ENERGY: number = 3;
const WEIGHT_ENERGY_POWER: number = 1.5;

const WEIGHT_ACOUSTICNESS: number = 1;
const WEIGHT_ACOUSTICNESS_POWER: number = 2;

const WEIGHT_LIVENESS: number = 1;
const WEIGHT_LIVENESS_POWER: number = 1.5;

const WEIGHT_INSTRUMENTALNESS: number = 0;

const WEIGHT_VALENCE: number = 1.7;
const WEIGHT_VALENCE_POWER: number = 1.5;

// If user steps back and selects another value, relevance can be tweaked
export const MULTIPLE_OPERATION_SCALE: number = 2;
export const MULTIPLE_OPERATIONS_MAX: number = 2;

/* All values should be normalized beforehand */
export const Scaling: ITrackScaling = {
    key: (x) => Math.pow(clamp(x - WEIGHT_KEY_FLOOR, 0, 1)!, WEIGHT_KEY_POWER) * WEIGHT_KEY,
    mode: (x) => x >= 1 ? WEIGHT_MODE : 0,
    durationMs: (x) => Math.pow(x, WEIGHT_DURATION_POWER) * WEIGHT_DURATION,
    tempo: (x) => Math.pow(x, WEIGHT_TEMPO_POWER) * WEIGHT_TEMPO,
    danceability: (x) => Math.pow(x, WEIGHT_DANCEABILITY_POWER) * WEIGHT_DANCEABILITY,
    energy: (x) => Math.pow(x, WEIGHT_ENERGY_POWER) * WEIGHT_ENERGY,
    acousticness: (x) => Math.pow(x, WEIGHT_ACOUSTICNESS_POWER) * WEIGHT_ACOUSTICNESS,
    instrumentalness: (x) => x * WEIGHT_INSTRUMENTALNESS,
    liveness: (x) => Math.pow(x, WEIGHT_LIVENESS_POWER) * WEIGHT_LIVENESS,
    valence: (x) => Math.pow(x, WEIGHT_VALENCE_POWER) * WEIGHT_VALENCE,
}

interface ITrackScaling extends ITrackProps<(x: number) => number> { }