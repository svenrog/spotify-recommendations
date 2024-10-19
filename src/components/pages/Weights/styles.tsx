import styled from 'styled-components';

export const Subtitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: 0.6px;
  line-height: 1.4;
  margin-bottom: 10px;
  margin-top: 20px;
  text-align: center;

  @media only screen and (min-width: 600px) {
        font-size: 1.4rem;
        font-weight: 700;
        text-align: left;
        margin-bottom: 6px;
    }
`;

export const Section = styled.div`
    font-size: 1.1rem;

    canvas {
        margin: 10px 20px 20px 0;
    }

    div {
        margin-bottom: 16px;
    }

    @media only screen and (min-width: 600px) {
        display: flex;
        
        div, canvas {
            flex: 1 0.5;
        }

        canvas {
            flex: 0 0.5;
            max-width: 33%;
            max-height: 200px;
            height: auto;
            margin-top: 18px;
        }

        div {
            flex: 1 1 100%;
            order: 1;
            margin-bottom: 28px;
        }
    }
`;