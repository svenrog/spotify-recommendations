import { ITrackModel, ITrackProps } from "../types/ITrackModel";
import { DURATION_MAX, DURATION_MIN, KEY_MAX, TEMPO_MAX, TEMPO_MIN } from "./RecommendationWeights";
import { clamp } from "./ValueSpaceUtils";

export function getBuckets(track: ITrackModel): ITrackProps<number> {
    return {
        key: getBucket(track.key, 0, KEY_MAX, 6),
        mode: getBucket(track.mode, 0, 1, 2),
        durationMs: getBucket(track.durationMs, DURATION_MIN, DURATION_MAX, 6),
        tempo: getBucket(track.tempo, TEMPO_MIN, TEMPO_MAX, 6),
        acousticness: getBucket(track.acousticness, 0, 1, 6),
        danceability: getBucket(track.danceability, 0, 1, 6),
        energy: getBucket(track.energy, 0, 1, 6),
        instrumentalness: getBucket(track.instrumentalness, 0, 1, 6),
        liveness: getBucket(track.liveness, 0, 1, 6),
        valence: getBucket(track.valence, 0, 1, 6)
    }
}

export function getBucket(value: number, min: number, max: number, buckets: number) {
    return clamp(Math.floor(((clamp(value, min, max)! - min) / max) * (buckets)), 0, buckets - 1)!;
}

export function appendBuckets(indexes: ITrackProps<number>, buckets: ITrackProps<number[]>) {
    buckets.key[indexes.key]++;
    buckets.mode[indexes.mode]++;
    buckets.durationMs[indexes.durationMs]++;
    buckets.tempo[indexes.tempo]++;
    buckets.acousticness[indexes.acousticness]++;
    buckets.danceability[indexes.danceability]++;
    buckets.energy[indexes.energy]++;
    buckets.instrumentalness[indexes.instrumentalness]++;
    buckets.liveness[indexes.liveness]++;
    buckets.valence[indexes.valence]++;
}
