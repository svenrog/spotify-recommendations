import styled from 'styled-components';

export const Container = styled.nav`
  margin: auto;
  max-width: 640px;
  width: 100%;
`;

export const Subtitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: 0.6px;
  line-height: 1.4;
  margin-bottom: 10px;
  margin-top: 20px;
  text-align: center;
`;

export const Graphs = styled.div``;

export const Graph = styled.div`
  margin-bottom: 40px;
`;

export const List = styled.div`
    font-size: 0.8em;
    letter-spacing: 0.6px;
    margin-bottom: 40px;
    
    ul {
       list-style-type: none;
       margin: 10px -5px;
       margin-top: 20px;
    }

    li {
        border: 1px solid #333;
        padding: 5px 8px;
        margin: -1px 0 0 0;
    }

    .count {
        margin-left: 6px;
    }

    .count, .dark {
        color: #999;
    }


    .artist {
        color: #86ccfb;
    }
`;

export const Dual = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    canvas {
        margin: 12px 10px 30px 0;
    }
`;