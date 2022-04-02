import styled from 'styled-components';

import { StyledBoxProps } from '../../primatives';

export const StyledInput = styled.input`
  padding: ${(p) => p.theme.space[3]};
  border-radius: ${(p) => p.theme.radii[2]};
  border: ${(p) => p.theme.borders[1]} ${(p) => p.theme.colors.common.black};
  cursor: pointer;
  min-height: ${(p) => p.theme.sizes[7]};

  ${StyledBoxProps}

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;
