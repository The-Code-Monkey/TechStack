import { StyledBox, Box } from '../../primal';
import styled from '../../workarounds/styled-components';

export const StyledAccordion = styled(Box)<{
  open: boolean;
  max: number;
  time: number;
}>`
  ${StyledBox}.panel {
    display: block;
    overflow: hidden;
    max-height: ${p => (p.open ? `${p.max}px` : '0')};
    transition: max-height ${p => p.time}ms ease-in-out;
  }
`;
