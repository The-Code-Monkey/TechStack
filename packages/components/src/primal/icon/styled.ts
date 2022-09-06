import { IntentVariants } from '@techstack/styled-system';
import styled from 'styled-components';

import { shouldForwardProp } from '../../utils';
import { Box, StyledBoxProps } from '../box';

export const SvgWrapper = styled(Box).withConfig({
  shouldForwardProp: shouldForwardProp([
    ...StyledBoxProps.propNames,
    'fill',
    'cursor',
  ]) as () => boolean,
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
