import { createBuckets } from "./AnalysisBuckets";
import { ITrackModel, ITrackModelCount, ITrackProps } from "./ITrackModel";

export interface IPropblemAnalysis {
    collidingTracks: ITrackModelCount[];
    collidingBuckets: ITrackProps<number[]>
    missingTracks: ITrackModel[];
    missingBuckets: ITrackProps<number[]>
    heatMap: Map<string, number>;
    permutations: number;
};

export const emptyAnalysis: IPropblemAnalysis = {
    collidingTracks: [],
    collidingBuckets: createBuckets(),
    missingTracks: [],
    missingBuckets: createBuckets(),
    heatMap: new Map<string, number>(),
    permutations: 0
};

