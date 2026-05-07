import tracks from './popular.json';

export { tracks }; // static — used by Stats, Weights, SSR prerendering

let cached: typeof tracks | null = null;

export async function preloadTracks(): Promise<typeof tracks> {
    if (cached) return cached;
    const res = await fetch('/data/popular.json');
    cached = await res.json() as typeof tracks
    return cached;
}
