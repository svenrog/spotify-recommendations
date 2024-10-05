import { IRecommendationContext } from "../components/contexts/RecommendationContext"
import { getDistance, getRotationalDistance, shouldFilter } from "./ValueSpaceUtils"
import { ITrackModel } from "../types/ITrackModel"
import { DURATION_MAX, IRecommendationProfile, KEY_DIVISOR, KEY_MAX, TEMPO_MAX, TEMPO_MIN } from "../types/IRecommendationProfile";
import { WEIGHTS } from "./RecommendationWeights";

export function sortTracks(tracks?: ITrackModel[], profile?: IRecommendationProfile | null): ITrackModel[] {
   if (!tracks) return [];
   if (!profile) return tracks;

   // Consider collecting data bounds (min/max) for normalization.

   tracks = filterTracks(tracks, profile);
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

function getTrackDistance(track: ITrackModel, profile: IRecommendationProfile) {
    let distance = 0;

    distance += (getRotationalDistance(track.key, profile.key, KEY_MAX) / KEY_DIVISOR) * WEIGHTS.key;
    distance += getDistance(track.valence, profile.valence) * WEIGHTS.valence;
    distance += (getDistance(track.tempo - TEMPO_MIN, profile.tempo) / (TEMPO_MAX - TEMPO_MIN)) * WEIGHTS.tempo;
    distance += (getDistance(track.durationMs, profile.duration) / DURATION_MAX) * WEIGHTS.durationMs;
    distance += getDistance(track.energy, profile.energy) * WEIGHTS.energy;
    distance += getDistance(track.danceability, profile.danceability) * WEIGHTS.danceability;
    distance += getDistance(track.acousticness, profile.acousticness) * WEIGHTS.acousticness;   
    distance += getDistance(track.instrumentalness, profile.instrumentalness) * WEIGHTS.instrumentalness;

    return distance;
}

function filterTracks(tracks: ITrackModel[], profile: IRecommendationProfile): ITrackModel[] {
   
    return tracks.filter((track) => filterTrack(track, profile))
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