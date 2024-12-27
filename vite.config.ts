import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa'
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        preact({
            prerender: {
                enabled: true,
                renderTarget: '#root',
                additionalPrerenderRoutes: [
                    'fraga-1', 'fraga-2', 'fraga-3', 'fraga-4', 'fraga-5', 'resultat', 'stats', 'vikter'
                ]
            }
        }),
        VitePWA({
            injectRegister: 'script-defer',
            registerType: 'autoUpdate',
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
                globPatterns: ['**/*.{js,css,html,ico,png,svg,json,txt,ttf,woff2}']
            },
            manifest: false,
        })
    ],
});