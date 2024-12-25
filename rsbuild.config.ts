import { pluginPreact } from '@rsbuild/plugin-preact';

export default {
    plugins: [pluginPreact()],
    html: {
        template: './index.html',
    },
    source: {
        entry: {
            index: './src/index.tsx',
        },
    },
};