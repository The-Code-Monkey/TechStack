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
});

export const StyledBoxProps = compose(
  space,
  color,
  layout,
  position,
  border,
  shadow,
  flexbox,
  utilProps
);

export const StyledBox = styled.div.withConfig({
  shouldForwardProp: shouldForwardProp(StyledBoxProps.propNames),
})`
  display: block;
  box-sizing: border-box;
  ${StyledBoxProps}
`;
