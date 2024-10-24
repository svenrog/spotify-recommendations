import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const Answers = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Container = styled.button<{
    $selected?: boolean;
    $selection?: boolean;
    $deemphasize?: boolean;
    $index: number;
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
  opacity: 1;
  transform: translateX(0);

  // General animation
  animation-duration: 500ms;
  animation-delay: 0;
  animation-fill-mode: forwards;
  animation-timing-function: 'cubic-bezier(.41,0,.93,.6)';

  // Shine animation
  background-image: linear-gradient(45deg, #ffffff00 0%, #ffffff66 50%, #ffffff00 100%);
  background-position: 200% 0;
  background-repeat: no-repeat;
  background-size: 200% 200%;

  @keyframes shine {
    from { background-position: 200% 0; }
    to { background-position: -200% 0; }
  }

  @keyframes disappear {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(100px); }
  }

  &:hover {
    background-color: #ffffff47;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }

  ${(props) =>
        props.$selection && !props.$selected &&
        css`
        animation-name: disappear;
        animation-duration: 800ms;
        animation-delay: calc(${props.$index} * 45ms);
    `}

  ${(props) =>
        props.$selected &&
        css`
      color: #fff;
      transition: all 300ms ease-in-out;
      animation-name: shine;
      background-color: #90ee90cc !important;
      text-shadow: 2px 2px #00000033;
      box-shadow: 0 5px 40px rgba(70,120,70,0.2) !important;
      z-index: 1;
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
