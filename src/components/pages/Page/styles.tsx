import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${({ color }) => color};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 100px 48px 48px 48px;
  width: 100%;
`;

export const Container = styled.nav`
  margin: auto;
  max-width: 640px;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 100;
  margin-bottom: 24px;
  text-align: center;

  strong {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
  }
`;

export const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.4;
  margin-bottom: 48px;
  text-align: center;
`;
