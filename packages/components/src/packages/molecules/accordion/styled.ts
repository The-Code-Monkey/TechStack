import { pseudoMixin } from '@aw-web-design/styled-system';
import styled from 'styled-components';

import { StyledBox, Box, StyledBoxProps } from '../../primatives';

export const StyledAccordion = styled(Box)<{
  open: boolean;
  max: number;
  time: number;
}>`
  ${StyledBoxProps}
  ${pseudoMixin}

  ${StyledBox}.panel {
    max-height: ${(p) => (p.open ? `${p.max}px` : '0')};
    transition: max-height ${(p) => p.time}ms ease-in-out;
  }
`;
