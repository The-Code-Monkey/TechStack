import styled from 'styled-components';

import { StyledBoxProps } from '../../primal';

export const StyledInput = styled.input`
  ${StyledBoxProps}

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;
