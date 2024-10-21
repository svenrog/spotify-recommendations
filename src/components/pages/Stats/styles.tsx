import styled from 'styled-components';

export const Graphs = styled.div``;

export const Graph = styled.div`
  margin-bottom: 40px;
`;

export const List = styled.div`
    font-size: 0.8em;
    letter-spacing: 0.6px;
    margin-bottom: 40px;
    
    table {
        width: 100%;
    }

    ul, table {
       list-style-type: none;
       margin: 10px -5px;
       margin-top: 20px;
    }

    th {
        font-size: 0.75rem;
    }

    li, td, th {
        border: 1px solid #333;
        padding: 5px 8px;   
    }

    li {
        margin: -1px 0 0 0;
    }

    .count, .score {
        margin-left: 6px;
    }

    .count, .score, .dark {
        color: #999;
    }


    .artist {
        color: #86ccfb;
    }
`;

export const Dual = styled.div`
    width: 100%;
    
    canvas {
        margin: 12px 20px 30px 0;
    }

    @media only screen and (min-width: 640px) {
        display: flex;
        align-items: center;
        justify-content: center;

        canvas {
            flex: 1;
            max-width: 50%;
            max-height: 300px;
        }
    }
`;