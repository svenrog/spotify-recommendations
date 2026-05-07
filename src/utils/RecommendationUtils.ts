import type { IRecommendationContext } from "../components/contexts/RecommendationContext"
import { getDistance, getRotationalDistance } from "./ValueSpaceUtils"
import type { ITrackModel, ITrackValues } from "../types/ITrackModel"
import type { IRecommendationProfile } from "../types/IRecommendationProfile";
import { DURATION_MAX, DURATION_MIN, KEY_DIVISOR, KEY_MAX, MULTIPLE_OPERATIONS_MAX, MULTIPLE_OPERATION_SCALE, Scaling, TEMPO_MAX, TEMPO_MIN } from "./RecommendationWeights";
import type { IValueSpace } from "../types/IValueSpace";

export function sortTracks(tracks?: ITrackModel[], profile?: IRecommendationProfile | null): ITrackModel[] {
    if (!tracks || !tracks.sort) return [];
    if (!profile) return tracks;

    // Consider collecting data bounds (min/max) for normalization.

    // Previously tracks where filtered at this stage, but that can result in edge cases where no results are returned
    //tracks = filterTracks(tracks, profile);
    return tracks.sort((a, b) => getTrackDistance(a, profile) - getTrackDistance(b, profile))
}

export function mapRecommendationProfile(context: IRecommendationContext): ITrackValues {
    return {
        key: context.key.base,
        mode: context.mode.base,
        durationMs: context.durationMs.base,
        tempo: context.tempo.base,
        acousticness: context.acousticness.base,
        danceability: context.danceability.base,
        energy: context.energy.base,
        instrumentalness: context.instrumentalness.base,
        valence: context.valence.base,
        liveness: context.liveness.base,
    }
}

export function mapTrackValues(track: ITrackModel): ITrackValues {
    return {
        key: track.key,
        mode: track.mode,
        durationMs: track.durationMs,
        tempo: track.tempo,
        acousticness: track.acousticness,
        danceability: track.danceability,
        energy: track.energy,
        instrumentalness: track.instrumentalness,
        valence: track.valence,
        liveness: track.liveness,
        boost: track.boost
    }
}

export function getTrackDistance(track: ITrackModel, profile: IRecommendationProfile) {
    const distances: ITrackValues = getTrackScaledDistances(track, profile);
    return sumValues(distances);
}

export function getTrackScaledDistances(track: ITrackModel, profile: IRecommendationProfile) {
    const distances: ITrackValues = getTrackDistances(track, profile);
    return applyScaling(distances);
}

export function getTrackDistances(track: ITrackModel, profile: IRecommendationProfile) {
    return {
        key: (getRotationalDistance(track.key, profile.key, KEY_MAX) / KEY_DIVISOR) * scaleByOperations(profile.key),
        mode: getDistance(track.mode, profile.mode) * scaleByOperations(profile.mode),
        durationMs: (getDistance(track.durationMs, profile.durationMs, DURATION_MIN) / (DURATION_MAX - DURATION_MIN)) * scaleByOperations(profile.durationMs),
        tempo: (getDistance(track.tempo, profile.tempo, TEMPO_MIN) / (TEMPO_MAX - TEMPO_MIN)) * scaleByOperations(profile.tempo),
        acousticness: getDistance(track.acousticness, profile.acousticness) * scaleByOperations(profile.acousticness),
        danceability: getDistance(track.danceability, profile.danceability) * scaleByOperations(profile.danceability),
        energy: getDistance(track.energy, profile.energy) * scaleByOperations(profile.energy),
        instrumentalness: getDistance(track.instrumentalness, profile.instrumentalness) * scaleByOperations(profile.instrumentalness),
        valence: getDistance(track.valence, profile.valence) * scaleByOperations(profile.valence),
        liveness: getDistance(track.liveness, profile.liveness) * scaleByOperations(profile.liveness),
        boost: track.boost
    }
}

function scaleByOperations(space?: IValueSpace): number {
    const operations = Math.min(MULTIPLE_OPERATIONS_MAX, getOperations(space));
    return operations * MULTIPLE_OPERATION_SCALE;
}

function getOperations(space?: IValueSpace): number {
    if (space?.operations === undefined) return 1;
    return Math.min(space.operations,);
}

function applyScaling(values: ITrackValues): ITrackValues {
    return {
        key: Scaling.key(values.key),
        mode: Scaling.mode(values.mode),
        durationMs: Scaling.durationMs(values.durationMs),
        tempo: Scaling.tempo(values.tempo),
        danceability: Scaling.danceability(values.danceability),
        acousticness: Scaling.acousticness(values.acousticness),
        instrumentalness: Scaling.instrumentalness(values.instrumentalness),
        energy: Scaling.energy(values.energy),
        valence: Scaling.valence(values.valence),
        liveness: Scaling.liveness(values.liveness),
        boost: values.boost,
    }
}

function sumValues(values: ITrackValues) {

    let sum = values.key;
    sum += values.mode;
    sum += values.durationMs;
    sum += values.tempo;
    sum += values.danceability;
    sum += values.acousticness;
    sum += values.instrumentalness;
    sum += values.energy;
    sum += values.valence;
    sum += values.liveness;

    if (values.boost) {
        sum *= 1 / values.boost;
    }

    return sum;
}