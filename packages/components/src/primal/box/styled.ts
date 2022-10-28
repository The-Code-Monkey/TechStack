import {
  compose,
  color,
  layout,
  space,
  position,
  border,
  shadow,
  flexbox,
  system,
  typography,
  defaultStyles,
} from '@techstack/styled-system';

import { shouldForwardProp } from '../../utils';
import styled from '../../workarounds/styled-components';

const utilProps = system({
  visibility: {
    property: 'visibility',
  },
  pointerEvents: {
    property: 'pointerEvents',
  },
  borderCollapse: {
    property: 'borderCollapse',
  },
});

export const StyledBoxProps = compose(
  space,
  color,
  layout,
  position,
  border,
  shadow,
  flexbox,
  typography,
  utilProps,
  defaultStyles
);

export const StyledBox = styled.div.withConfig({
  shouldForwardProp: shouldForwardProp(StyledBoxProps.propNames),
})`
  display: block;
  box-sizing: border-box;
  ${StyledBoxProps}
`;
