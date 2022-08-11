import { IntentVariants } from '@techstack/styled-system';
import styled from 'styled-components';

import { SizesType } from '../../theme/types';
import { shouldForwardProp } from '../../utils';
import { Box, StyledBoxProps } from '../box';

export const SvgWrapper = styled(Box).withConfig({
  shouldForwardProp: shouldForwardProp([
    ...StyledBoxProps.propNames,
    'noFill',
    'cursor',
  ]) as () => boolean,
})<{ noFill?: boolean; size?: keyof SizesType }>`
  pointer-events: none;

  svg {
    ${p => !p.noFill && 'fill: currentColor;'}
    pointer-events: none;

    ${IntentVariants}
    ${StyledBoxProps}
  }

  ${StyledBoxProps}
`;
