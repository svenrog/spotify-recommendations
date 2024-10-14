import styled from 'styled-components';

export const Container = styled.nav`
  margin: auto;
  max-width: 640px;
  width: 100%;
`;

export const Subtitle = styled.h3`
  font-size: 1.45rem;
  font-weight: 500;
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
    line-height: 1.3;
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
        color: #888;
    }


    .artist {
        color: #86ccfb;
    }
`;