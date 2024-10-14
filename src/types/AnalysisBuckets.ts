import { ITrackProps } from "./ITrackModel";

export function createBuckets(): ITrackProps<number[]> {
    return {
        key: new Array<number>(6).fill(0),
        mode: new Array<number>(2).fill(0),
        durationMs: new Array<number>(6).fill(0),
        tempo: new Array<number>(6).fill(0),
        acousticness: new Array<number>(6).fill(0),
        danceability: new Array<number>(6).fill(0),
        energy: new Array<number>(6).fill(0),
        instrumentalness: new Array<number>(6).fill(0),
        liveness: new Array<number>(6).fill(0),
        valence: new Array<number>(6).fill(0)
    }
};

export const emptyIndex: ITrackProps<number> = {
    key: 0,
    mode: 0,
    durationMs: 0,
    tempo: 0,
    acousticness: 0,
    danceability: 0,
    energy: 0,
    instrumentalness: 0,
    liveness: 0,
    valence: 0
};