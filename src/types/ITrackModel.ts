export interface ITrackModel {
    id: string;
    name: string;
    albumId: string;
    albumName: string;
    artistId: string;
    artistName: string;
    albumImageUrl: string;
    artistImageUrl: string | null;
    durationMs: number,
    key: number;
    keyConfidence: number;
    mode: number;
    modeConfidence: number;
    tempo: number;
    tempoConfidence: number;
    acousticness: number;
    danceability: number;
    energy: number;
    instrumentalness: number;
    valence: number;
}