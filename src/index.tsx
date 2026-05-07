import { hydrate, prerender as ssr } from 'preact-iso';
import type { IApplicationProps } from './App';
import App from './App';
import { ServerStyleSheet } from 'styled-components';

if (typeof window !== 'undefined') {
    hydrate(<App />, document.getElementById('root'));
}

export async function prerender(data: IApplicationProps) {
    const styleSheet = new ServerStyleSheet();
    const appNode = styleSheet.collectStyles(<App {...data} />);

    const { html, links } = await ssr(appNode);
    const styles = styleSheet._emitSheetCSS();

    return {
        html: styles + html,
        links
    }
}