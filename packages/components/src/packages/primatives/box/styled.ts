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
  get,
  // pseudo,
  getContrast,
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
  bg: {
    property: 'color',
    scale: 'colors',
    transform: (scale, n) => getContrast(get(scale, n, n), scale as any),
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
  // pseudo,
  utilProps
);

export const StyledBox = styled.div.withConfig({
  shouldForwardProp: shouldForwardProp(StyledBoxProps.propNames) as any,
})`
  display: block;
  box-sizing: border-box;
  ${StyledBoxProps}
`;
