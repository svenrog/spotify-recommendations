import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const Container = styled.button<{
  $selected?: boolean;
  $deemphasize?: boolean;
  $css?: FlattenSimpleInterpolation;
}>`
  width: 100%;
  color: #ffffffdd;
  background-color: #ffffff33;
  padding: 16px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  text-shadow: 2px 2px 3px #00000022;
  font-size: 1.1rem;
  line-height: 1.3;
  font-weight: 500;
  letter-spacing: 0.8px;

  &:hover {
    background-color: #ffffff44;
  }

  ${(props) =>
    props.$selected &&
    css`
      color: #fff;
      background-color: #90ee90cc !important;
      text-shadow: 2px 2px #00000033;
    `}

  ${(props) =>
    props.$deemphasize &&
    css`
      font-size: 1rem;
      padding: 14px;
      color: rgba(255, 255, 255, 0.8);
    `}

  ${(props) => props.$css}
`;
