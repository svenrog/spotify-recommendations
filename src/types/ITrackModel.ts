export interface ITrackModelCount extends ITrackModelScore {
    count: number;
}

export interface ITrackModelScore extends ITrackModel {
    score: number;
}

export interface ITrackModel extends ITrackValues {
    id: string;
    name: string;
    albumId: string;
    albumName: string;
    artistId: string;
    artistName: string;
    albumImageUrl: string | null;
    keyConfidence: number;
    modeConfidence: number;
    tempoConfidence: number;
}

export interface ITrackValues extends ITrackProps<number> { }
export interface ITrackProps<T> {
    durationMs: T,
    key: T;
    mode: T;
    tempo: T;
    acousticness: T;
    danceability: T;
    energy: T;
    instrumentalness: T;
    liveness: T;
    valence: T;
    boost?: number;
}