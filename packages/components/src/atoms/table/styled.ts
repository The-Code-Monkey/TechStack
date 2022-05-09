import { pseudoMixin } from '@aw-web-design/styled-system';
import styled from 'styled-components';

import { StyledBoxProps } from '../../primal';

export const StyledTable = styled.table`
  ${pseudoMixin}
  ${StyledBoxProps}
`;

export const StyledTHead = styled.thead`
  ${pseudoMixin}
  ${StyledBoxProps}
`;

export const StyledTr = styled.tr`
  ${pseudoMixin}
  ${StyledBoxProps}
`;

export const StyledTh = styled.th`
  ${pseudoMixin}
  ${StyledBoxProps}
`;

export const StyledTBody = styled.tbody`
  ${pseudoMixin}
  ${StyledBoxProps}
`;

export const StyledTd = styled.td`
  ${pseudoMixin}
  ${StyledBoxProps}
`;
