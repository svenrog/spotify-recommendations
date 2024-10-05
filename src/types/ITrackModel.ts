export interface ITrackModel extends ITrackValues {
    id: string;
    name: string;
    albumId: string;
    albumName: string;
    artistId: string;
    artistName: string;
    albumImageUrl: string;
    artistImageUrl: string | null;
    durationMs: number,
    keyConfidence: number;
    modeConfidence: number;
    tempoConfidence: number;
}

export interface ITrackValues {
    durationMs: number,
    key: number;
    mode: number;
    tempo: number;
    acousticness: number;
    danceability: number;
    energy: number;
    instrumentalness: number;
    valence: number;
}