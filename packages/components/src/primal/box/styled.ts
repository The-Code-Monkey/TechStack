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
  getContrast,
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
    properties: ['color', 'backgroundColor'],
    scale: 'colors',
    transform: (scale, n) => {
      console.log(scale, n);
      console.log(get(scale, n));

      return [getContrast(get(scale, n, `${n}`), scale as ColorsType), n];
    },
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
