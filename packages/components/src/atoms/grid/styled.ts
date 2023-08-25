import { grid } from '@techstack/styled-system';

import { Box } from '../../primal';
import { default as styled } from '../../workarounds/styled-components';

export const StyledGrid = styled(Box)`
  ${grid}
`;

export const StyledCell = styled(Box)`
  ${grid}
`;
