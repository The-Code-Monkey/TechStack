import { pseudoMixin } from '@aw-web-design/styled-system/src/pseudo/mixin';
import styled from 'styled-components';

import { StyledBoxProps } from '../../primatives';

export const StyledInput = styled('input')`
  ${pseudoMixin}
  ${StyledBoxProps}

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;
