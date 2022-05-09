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
  pseudo,
  getContrast,
  pseudoMixin,
  ColorsType,
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
    transform: (scale, n) =>
      getContrast(get(scale, n, n), scale as unknown as ColorsType),
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
  shouldForwardProp: shouldForwardProp(StyledBoxProps.propNames),
})`
  display: block;
  box-sizing: border-box;
  ${pseudoMixin}
  ${StyledBoxProps}
`;
