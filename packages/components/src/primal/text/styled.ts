import {
  IntentVariants,
  TextVariants,
  typography,
} from '@bunstack/styled-system';

import styled from 'styled-components';

export const StyledText = styled.span`
  ${typography}
  ${TextVariants}
  ${IntentVariants}
`;
