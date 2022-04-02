import styled from 'styled-components';

export const StyledDiv = styled.div<{ direction: 'row' | 'column' }>`
  display: flex;
  overflow: hidden;
  flex-direction: ${(p) => p.direction};
  flex: 1;
  color: ${(p) => p.theme.colors.text};
  background-color: ${(p) => p.theme.colors.neutrals[0]};
`;
