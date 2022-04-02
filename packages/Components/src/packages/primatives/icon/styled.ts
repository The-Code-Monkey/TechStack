import styled from 'styled-components';
import { IntentVariants } from '@aw-web-design/styled-system';

import { Box, StyledBoxProps } from '../box';
import { shouldForwardProp } from '../../utils';

export const SvgWrapper = styled(Box).withConfig({
  shouldForwardProp: shouldForwardProp([
    ...StyledBoxProps.propNames,
    'noFill',
    'cursor',
  ]) as () => boolean,
})<{ noFill?: boolean }>`
  pointer-events: none;

  svg {
    ${(p) => !p.noFill && 'fill: currentColor;'}
    pointer-events: none;

    ${IntentVariants}
    ${StyledBoxProps}
  }

  ${StyledBoxProps}
`;
