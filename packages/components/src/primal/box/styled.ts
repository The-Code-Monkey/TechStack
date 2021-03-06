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
} from '@aw-web-design/styled-system';
import styled from 'styled-components';

import { shouldForwardProp } from '../../utils';

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
