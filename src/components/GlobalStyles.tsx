import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        border: 0;
        box-sizing: border-box;
        color: inherit;
        font-size: inherit;
        margin: 0;
        padding: 0;
    }

    html, body, #root {
        height: 100%;
    }

    body{
        background-color: #333;
        color: rgba(255,255,255,0.9);
        font-family: "Raleway", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        font-size: 18px;
    }

    a {
        font-weight: 500;
        text-decoration: none;
    }

    /* Stylized elements */
    em {
        display: inline-block;
        font-family: "UnifrakturCook", sans-serif !important;
        font-weight: 700;
        font-style: normal;
        transform: rotate(-5deg) scale(1.1) translate(0, 5%);
        margin-left: 10px;
        margin-right: 10px;
        line-height: 0.75;
    }
`;

export { GlobalStyles };
