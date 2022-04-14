import styled from 'styled-components';

import { StyledBoxProps } from '../../primatives';

export const StyledInput = styled.input`
  ${StyledBoxProps}

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;
