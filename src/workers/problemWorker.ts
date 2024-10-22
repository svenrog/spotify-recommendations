// This file cannot include .tsx files or modules that reference React or JSX.
// Doing so will cause a runtime error inside the worker since there is no global Window object.

import { getPermutations, performTest } from "../data/combinations";
import { createBuckets } from "../types/AnalysisBuckets";
import { emptyAnalysis } from "../types/IProblemAnalysis";
import { ITrackModel, ITrackModelCount, ITrackModelScore, ITrackProps } from "../types/ITrackModel";
import { appendBuckets, getBuckets } from "../utils/BucketUtils";
import { Round } from "../utils/MathUtils";
import { getTrackDistance } from "../utils/RecommendationUtils";

onmessage = (event: MessageEvent<ITrackModel[]>) => {
    const tracks = event.data;
    if (!tracks || !tracks.length) {
        postMessage(emptyAnalysis);
        return;
    }

    const analysis = analyzeProblems(tracks);
    postMessage(analysis);
}

export function analyzeProblems(tracks: ITrackModel[]) {
    const permutations = getPermutations();
    const { heatMap, scoreMap } = collectMaps(permutations, tracks);
    const { collidingTracks, collidingBuckets,
        missingTracks, missingBuckets } = collectPropblemData(tracks, heatMap, scoreMap);

    return {
        collidingTracks,
        collidingBuckets,
        missingTracks,
        missingBuckets,
        heatMap,
        scoreMap,
        permutations: permutations.length
    };
}

function collectPropblemData(tracks: ITrackModel[], heatMap: Map<string, number>, scoreMap: Map<string, number>) {

    const collidingTracks: ITrackModelCount[] = [];
    const missingTracks: ITrackModelScore[] = [];
    const missingBuckets: ITrackProps<number[]> = createBuckets();
    const collidingBuckets: ITrackProps<number[]> = createBuckets();

    for (const track of tracks) {
        const count = heatMap.get(track.id);
        const score = scoreMap.get(track.id) ?? 0;
        const bucketIndexes = getBuckets(track);

        if (count === undefined) {
            appendBuckets(bucketIndexes, missingBuckets);
            missingTracks.push({ ...track, score });
        }
        else if (count > 100) {
            appendBuckets(bucketIndexes, collidingBuckets);
            collidingTracks.push({ ...track, count, score });
        }
    }

    collidingTracks.sort((a, b) => heatMap.get(b.id)! - heatMap.get(a.id)!);

    return { collidingTracks, missingTracks, collidingBuckets, missingBuckets };
}

function collectMaps(permutations: number[][], tracks: ITrackModel[]) {
    const heatMap = new Map<string, number>();
    const scoreMap = new Map<string, number>();

    for (const permutation of permutations) {
        const { recommendations, profile } = performTest(permutation, tracks);
        const topRecommendation = recommendations[0];

        let count = heatMap.get(topRecommendation.id) || 0;
        heatMap.set(topRecommendation.id, ++count);

        for (const recommendation of recommendations) {
            let score = scoreMap.get(recommendation.id) || 0;
            score += getTrackDistance(recommendation, profile) / permutations.length;

            scoreMap.set(recommendation.id, score);
        }
    }

    normalizeMap(scoreMap);

    return { heatMap, scoreMap };
}

function normalizeMap(input: Map<string, number>): Map<string, number> {

    let min: number | null = null;
    let max: number | null = null;

    input.forEach(x => {
        if (min === null || x < min) min = x;
        if (max === null || x > max) max = x;
    });

    if (min === null) min = 0;
    if (max === null) max = 1;

    const scale = 1 / (max - min);

    for (const [id, value] of input) {
        const normalized = (value - min) * scale;
        const rounded = Round(normalized);
        input.set(id, rounded);
    }

    return input;
}