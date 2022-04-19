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
  pseudo,
  pseudoMixin,
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
  pseudo,
  utilProps
);

export const StyledBox = styled.div.withConfig({
  shouldForwardProp: shouldForwardProp(StyledBoxProps.propNames) as any,
})`
  display: block;
  box-sizing: border-box;
  ${pseudoMixin}
  ${StyledBoxProps}
`;
