import { getPermutations, performTest } from "../data/combinations";
import { createBuckets } from "../types/AnalysisBuckets";
import { emptyAnalysis } from "../types/IProblemAnalysis";
import { ITrackModel, ITrackModelCount, ITrackProps } from "../types/ITrackModel";
import { appendBuckets, getBuckets } from "../utils/BucketUtils";

self.onmessage = (event: MessageEvent<ITrackModel[]>) => {
    const tracks = event.data;
    if (!tracks || !tracks.length) {
        postMessage(emptyAnalysis);
        return;
    }

    const analysis = analyzeProblems(tracks);
    self.postMessage(analysis);
}

export function analyzeProblems(tracks: ITrackModel[]) {
    const permutations = getPermutations();
    const heatMap = collectHeatmap(permutations, tracks);
    const { collidingTracks, collidingBuckets,
        missingTracks, missingBuckets } = collectPropblemData(tracks, heatMap);

    return {
        collidingTracks,
        collidingBuckets,
        missingTracks,
        missingBuckets,
        heatMap,
        permutations: permutations.length
    };
}

function collectPropblemData(tracks: ITrackModel[], heatMap: Map<string, number>) {

    const collidingTracks: ITrackModelCount[] = [];
    const missingTracks: ITrackModel[] = [];
    const missingBuckets: ITrackProps<number[]> = createBuckets();
    const collidingBuckets: ITrackProps<number[]> = createBuckets();

    for (const track of tracks) {
        const count = heatMap.get(track.id);
        const bucketIndexes = getBuckets(track);

        if (count === undefined) {
            appendBuckets(bucketIndexes, missingBuckets);
            missingTracks.push(track);
        }
        else if (count > 100) {
            appendBuckets(bucketIndexes, collidingBuckets);
            collidingTracks.push({ ...track, count });
        }
    }

    collidingTracks.sort((a, b) => heatMap.get(b.id)! - heatMap.get(a.id)!);

    return { collidingTracks, missingTracks, collidingBuckets, missingBuckets };
}


function collectHeatmap(permutations: number[][], tracks: ITrackModel[]) {
    const heatMap = new Map<string, number>();

    for (const permutation of permutations) {
        const result = performTest(permutation, tracks);
        let count = heatMap.get(result.id) || 0;
        heatMap.set(result.id, ++count);
    }

    return heatMap;
}
