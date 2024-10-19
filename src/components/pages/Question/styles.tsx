import styled, { css } from 'styled-components';

export const Container = styled.nav<{ $hasSelection?: boolean }>`
  margin: auto;
  max-width: 800px;
  width: 100%;

  ${(props) =>
        props.$hasSelection &&
        css`
      pointer-events: none;
      cursor: default !important;
    `}
`;

export const Answers = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
`;

export const answerStyles = css`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: calc(50% - 10px);
`;
