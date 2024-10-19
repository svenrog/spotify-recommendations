import { createBuckets } from "./AnalysisBuckets";
import { ITrackModel, ITrackModelCount, ITrackModelScore, ITrackProps } from "./ITrackModel";

export interface IPropblemAnalysis {
    collidingTracks: ITrackModelCount[];
    collidingBuckets: ITrackProps<number[]>
    missingTracks: ITrackModelScore[];
    missingBuckets: ITrackProps<number[]>
    heatMap: Map<string, number>;
    scoreMap: Map<string, number>;
    permutations: number;
};

export const emptyAnalysis: IPropblemAnalysis = {
    collidingTracks: [],
    collidingBuckets: createBuckets(),
    missingTracks: [],
    missingBuckets: createBuckets(),
    heatMap: new Map<string, number>(),
    scoreMap: new Map<string, number>(),
    permutations: 0
};