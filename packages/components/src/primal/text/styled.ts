import {
  IntentVariants,
  TextVariants,
  typography,
} from '@techstack/styled-system';

import { default as styled } from '../../workarounds/styled-components';

export const StyledText = styled.span`
  ${typography}
  ${TextVariants}
  ${IntentVariants}
`;
