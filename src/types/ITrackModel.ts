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
    valence: T;
}