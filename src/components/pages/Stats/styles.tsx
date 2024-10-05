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

export const Subtitle = styled.h3`
  font-size: 1.2rem;
  line-height: 1.4;
  margin-bottom: 10px;
  text-align: center;
`;

export const Graphs = styled.div``;

export const Graph = styled.div`
  margin-bottom: 30px;
`;
