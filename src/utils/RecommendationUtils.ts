import { IRecommendationContext } from "../components/contexts/RecommendationContext"
import { getDistance, getRotationalDistance, shouldFilter } from "./ValueSpaceUtils"
import { ITrackModel, ITrackValues } from "../types/ITrackModel"
import { IRecommendationProfile } from "../types/IRecommendationProfile";
import { DURATION_MAX, KEY_DIVISOR, KEY_MAX, MULTIPLE_OPERATIONS_MAX, MULTIPLE_OPERATION_SCALE, Scaling, TEMPO_MAX, TEMPO_MIN } from "./RecommendationWeights";
import { IValueSpace } from "../types/IValueSpace";

export function sortTracks(tracks?: ITrackModel[], profile?: IRecommendationProfile | null): ITrackModel[] {
    if (!tracks) return [];
    if (!profile) return tracks;

    // Consider collecting data bounds (min/max) for normalization.

    // Previously tracks where filtered at this stage, but that can result in edge cases where no results are returned
    //tracks = filterTracks(tracks, profile);
    return tracks.sort((a, b) => getTrackDistance(a, profile) - getTrackDistance(b, profile))
}

export function mapRecommendationProfile(context: IRecommendationContext): IRecommendationProfile {
    return {
        key: context.key,
        mode: context.mode,
        duration: context.duration,
        tempo: context.tempo,
        acousticness: context.acousticness,
        danceability: context.danceability,
        energy: context.energy,
        instrumentalness: context.instrumentalness,
        valence: context.valence
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
        valence: track.valence
    }
}

export function getTrackDistance(track: ITrackModel, profile: IRecommendationProfile) {
    const distances: ITrackValues = getTrackDistances(track, profile);
    return sumValues(applyScaling(distances));
}

export function getTrackDistances(track: ITrackModel, profile: IRecommendationProfile) {
    return {
        key: (getRotationalDistance(track.key, profile.key, KEY_MAX) / KEY_DIVISOR) * scaleByOperations(profile.key),
        mode: getDistance(track.mode, profile.mode) * scaleByOperations(profile.mode),
        valence: getDistance(track.valence, profile.valence) * scaleByOperations(profile.valence),
        tempo: (getDistance(track.tempo - TEMPO_MIN, profile.tempo) / (TEMPO_MAX - TEMPO_MIN)) * scaleByOperations(profile.tempo),
        durationMs: (getDistance(track.durationMs, profile.duration) / DURATION_MAX) * scaleByOperations(profile.duration),
        energy: getDistance(track.energy, profile.energy) * scaleByOperations(profile.energy),
        danceability: getDistance(track.danceability, profile.danceability) * scaleByOperations(profile.danceability),
        acousticness: getDistance(track.acousticness, profile.acousticness) * scaleByOperations(profile.acousticness),
        instrumentalness: getDistance(track.instrumentalness, profile.instrumentalness) * scaleByOperations(profile.instrumentalness),
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
        valence: Scaling.valence(values.valence),
        tempo: Scaling.tempo(values.tempo),
        durationMs: Scaling.durationMs(values.durationMs),
        energy: Scaling.energy(values.energy),
        danceability: Scaling.danceability(values.danceability),
        acousticness: Scaling.acousticness(values.acousticness),
        instrumentalness: Scaling.instrumentalness(values.instrumentalness)
    }
}

function sumValues(values: ITrackValues) {
    let sum = values.key;
    sum += values.mode;
    sum += values.valence;
    sum += values.tempo;
    sum += values.durationMs;
    sum += values.energy;
    sum += values.danceability;
    sum += values.instrumentalness;

    return sum;
}

function filterTracks(tracks: ITrackModel[], profile: IRecommendationProfile): ITrackModel[] {
    return tracks.filter((track) => !filterTrack(track, profile))
}

function filterTrack(track: ITrackModel, profile: IRecommendationProfile) {
    return shouldFilter(track.key, profile.key) ||
        shouldFilter(track.mode, profile.mode) ||
        shouldFilter(track.durationMs, profile.duration) ||
        shouldFilter(track.tempo, profile.tempo) ||
        shouldFilter(track.acousticness, profile.acousticness) ||
        shouldFilter(track.danceability, profile.danceability) ||
        shouldFilter(track.energy, profile.energy) ||
        shouldFilter(track.instrumentalness, profile.instrumentalness) ||
        shouldFilter(track.valence, profile.valence);
}