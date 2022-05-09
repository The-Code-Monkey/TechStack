import styled from 'styled-components';

import { Box } from '../../primal';

export const StyledBox = styled(Box)`
  button {
    border-radius: 0;

    &:not(:last-of-type) {
      border-right: ${p => p.theme.borders[1]} ${p => p.theme.colors.text};
    }
  }
`;
