import { IntentVariants } from '@aw-web-design/styled-system';
import styled from 'styled-components';

import { shouldForwardProp } from '../../utils';
import { Box, StyledBoxProps } from '../box';

export const SvgWrapper = styled(Box).withConfig({
  shouldForwardProp: shouldForwardProp()([
    ...StyledBoxProps.propNames,
    'noFill',
    'cursor',
  ]) as () => boolean,
})<{ noFill?: boolean }>`
  pointer-events: none;

  svg {
    ${p => !p.noFill && 'fill: currentColor;'}
    pointer-events: none;

    ${IntentVariants}
    ${StyledBoxProps}
  }

  ${StyledBoxProps}
`;
