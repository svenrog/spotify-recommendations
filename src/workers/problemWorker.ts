import { getPermutations, performTest } from "../data/combinations";
import { emptyAnalysis } from "../types/IProblemAnalysis";
import { ITrackModel, ITrackModelCount } from "../types/ITrackModel";

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
    const heatMap = new Map<string, number>();

    for (const permutation of permutations) {
        const result = performTest(permutation, tracks);
        let count = heatMap.get(result.id) || 0;
        heatMap.set(result.id, ++count);
    }

    const collidingTracks: ITrackModelCount[] = [];
    const missingTracks: ITrackModel[] = [];

    for (const track of tracks) {
        const count = heatMap.get(track.id);

        if (count === undefined) {
            missingTracks.push(track);
        }
        else if (count > 100) {
            collidingTracks.push({ ...track, count });
        }
    }

    collidingTracks.sort((a, b) => heatMap.get(b.id)! - heatMap.get(a.id)!);

    return { collidingTracks, missingTracks, heatMap, permutations: permutations.length };
}