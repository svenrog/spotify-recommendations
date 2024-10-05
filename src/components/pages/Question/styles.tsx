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

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 300;
  margin-bottom: 24px;
  max-width: 720px;
  text-align: center;
  text-wrap: balance;
  letter-spacing: 1.1px;
  margin: 10px auto 40px;

  em {
    color: #eee;
    font-size: 4rem;
    letter-spacing: 0px;
  }
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
