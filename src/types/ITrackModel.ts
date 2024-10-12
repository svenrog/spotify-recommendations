export interface ITrackModelCount extends ITrackModel {
    count: number;
}

export interface ITrackModel extends ITrackValues {
    id: string;
    name: string;
    albumId: string;
    albumName: string;
    artistId: string;
    artistName: string;
    albumImageUrl: string;
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
    liveness: number;
    valence: number;
}