# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Swedish-language music recommendation quiz SPA built with Preact + Vite + TypeScript. Users answer 5 questions about their musical preferences, each question mapping to Spotify audio feature values (key, mode, tempo, energy, danceability, acousticness, instrumentalness, valence, liveness). Results show top track matches via distance-based scoring against a curated dataset of ~100 tracks with known Spotify IDs.

## Development commands

```bash
npm install                  # Install dependencies
npm run watch                # Start Vite dev server (watch mode)
npm run build                # Production build to dist/
npm run preview              # Build + serve dist/ locally
```

Requires Node.js 21.1.0 (NVM for Windows recommended).

## Architecture

### Core flow

1. **Quiz** (`/fraga-1` through `/fraga-5`) — Each question sets target values for specific Spotify audio features via answer buttons. State lives in `RecommendationContext.tsx`.
2. **Results** (`/resultat`) — Scores all tracks against the user's profile using distance calculation (`RecommendationUtils.ts`). Shows top match with Spotify embed.
3. **Stats** (`/stats`) and **Weights** (`/vikter`) — Chart.js visualizations of the underlying data distribution and weight configurations.

### Key files

- `src/App.tsx` — Root component with `LocationProvider` + `RecommendationContext`
- `src/components/Pages.tsx` — Route-based lazy loading with Suspense boundaries
- `src/hooks/useRecommendations.ts` — Core recommendation state management hook
- `src/utils/RecommendationUtils.ts` — Track scoring and distance calculation
- `src/data/popular.json` / `popular-large.json` — Track datasets with Spotify audio features
- `src/workers/problemWorker.ts` — Web Worker for brute-force permutation analysis

### Tech notes

- Preact configured as React via path aliases in `tsconfig.json` (`react`/`react-dom` → preact compat)
- SSR prerendering configured in `vite.config.ts` for routes `/fraga-1` through `/fraga-5`, `/resultat`, `/stats`, `/vikter`
- PWA support via `vite-plugin-pwa` with deferred service worker loading and autoUpdate registration
- Heavy computation (permutation analysis) runs in a Web Worker to avoid blocking the UI

## Self-hosting

Three server implementations are provided in `hosting/`:

| Server | Benchmarked throughput | File |
|--------|----------------------|------|
| Express | ~500 req/sec | `hosting/serve-express/serve.js` |
| Hono | ~900 req/sec | `hosting/serve-hono/serve.js` |
| Fastify | ~2,000 req/sec | `hosting/serve-fastify/serve.js` |

Each serves the static `dist/` output over HTTPS with HTTP/2. Copy the corresponding directory to your target machine, adjust `serveDir`, certificate paths, and host settings before running `node serve.js`.
