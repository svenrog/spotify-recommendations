import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [preact({
        prerender: {
            enabled: true,
            renderTarget: '#root',
            additionalPrerenderRoutes: [
                'fraga-1', 'fraga-2', 'fraga-3', 'fraga-4', 'fraga-5', 'resultat', 'stats', 'vikter'
            ]
        }
    })],
});
