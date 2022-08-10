import {
  SpaceProps,
  ColorProps,
  LayoutProps,
  PositionProps,
  BorderProps,
  ShadowProps,
  FlexboxProps,
} from '@aw-web-design/styled-system';
import { Property } from 'csstype';
import { ElementType, ReactNode } from 'react';

import { generateAutomationId } from '../../utils';

import { StyledBox } from './styled';

export interface Props
  extends SpaceProps,
    ColorProps,
    LayoutProps,
    PositionProps,
    BorderProps,
    ShadowProps,
    FlexboxProps {
  children?: ReactNode;
  as?: ElementType;
  autoid?: string;
  className?: string;
  cursor?: Property.Cursor;
  pointerEvents?: Property.PointerEvents;
}

const Box = ({ children, as, autoid = 'box', size, ...rest }: Props) => (
  <StyledBox
    data-autoid={generateAutomationId(autoid)}
    as={as}
    w={size}
    h={size}
    {...rest}
  >
    {children}
  </StyledBox>
);

export default Box;
