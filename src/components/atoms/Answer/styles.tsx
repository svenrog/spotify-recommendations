import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const Container = styled.button<{
    $selected?: boolean;
    $deemphasize?: boolean;
    $css?: FlattenSimpleInterpolation;
}>`
  width: 100%;
  color: #ffffffdd;
  background-color: #ffffff22;
  padding: 16px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 400ms ease-in-out;
  text-shadow: 2px 2px 3px #00000022;
  font-size: 20px;
  line-height: 1.4;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  
  &:hover {
    background-color: #ffffff47;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }

  ${(props) =>
        props.$selected &&
        css`
      color: #fff;
      transition: all 300ms ease-in-out;
      background-color: #90ee90cc !important;
      text-shadow: 2px 2px #00000033;
      box-shadow: 0 5px 40px rgba(70,120,70,0.2) !important;
    `}

  ${(props) =>
        props.$deemphasize &&
        css`
      padding: 14px;
      background-color: #ffffff08;

      &:hover {
            background-color: #ffffff11;
            box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        }
    `}

  ${(props) => props.$css}
`;
