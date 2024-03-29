import { IntentVariants } from '@techstack/styled-system';

import { shouldForwardProp } from '../../utils';
import { default as styled } from '../../workarounds/styled-components';
import { Box, StyledBoxProps } from '../box';

export const SvgWrapper = styled(Box).withConfig({
  shouldForwardProp: shouldForwardProp([
    ...StyledBoxProps.propNames,
    'fill',
    'cursor',
  ]),
})<{ fill?: boolean }>`
  pointer-events: none;

  svg {
    color: currentColor;
    pointer-events: none;
    ${p => p.fill && `fill: currentColor;`}

    ${IntentVariants}
    ${StyledBoxProps}
  }

  ${StyledBoxProps}
`;
