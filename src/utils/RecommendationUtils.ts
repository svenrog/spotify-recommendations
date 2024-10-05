import { IRecommendationContext } from "../components/contexts/RecommendationContext"
import { getDistance, getRotationalDistance, shouldFilter } from "./ValueSpaceUtils"
import { ITrackModel } from "../types/ITrackModel"
import { DURATION_MAX, IRecommendationProfile, KEY_MAX, TEMPO_MAX } from "../types/IRecommendationProfile";

export function sortTracks(tracks?: ITrackModel[], profile?: IRecommendationProfile | null): ITrackModel[] {
   if (!tracks) return [];
   if (!profile) return tracks;
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

    distance += getRotationalDistance(track.key, profile.key, KEY_MAX) / KEY_MAX;
    distance += getDistance(track.mode, profile.mode);
    distance += getDistance(track.durationMs, profile.duration) / DURATION_MAX;
    distance += getDistance(track.tempo, profile.tempo) / TEMPO_MAX;
    distance += getDistance(track.acousticness, profile.acousticness);
    distance += getDistance(track.danceability, profile.danceability);
    distance += getDistance(track.energy, profile.energy);
    distance += getDistance(track.instrumentalness, profile.instrumentalness);
    distance += getDistance(track.valence, profile.valence);

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