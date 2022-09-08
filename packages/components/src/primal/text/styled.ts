import {
  IntentVariants,
  TextVariants,
  typography,
} from '@techstack/styled-system';

import styled from '../../workarounds/styled-components';

export const StyledText = styled.span`
  ${typography}
  ${TextVariants}
  ${IntentVariants}
`;
