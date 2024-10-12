import { ITrackModel, ITrackModelCount } from "./ITrackModel";

export interface IPropblemAnalysis {
    collidingTracks: ITrackModelCount[];
    missingTracks: ITrackModel[];
    heatMap: Map<string, number>;
    permutations: number;
};

export const emptyAnalysis: IPropblemAnalysis = {
    collidingTracks: [],
    missingTracks: [],
    heatMap: new Map<string, number>(),
    permutations: 0
};