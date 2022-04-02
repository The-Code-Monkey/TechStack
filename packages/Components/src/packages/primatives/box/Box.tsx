import React, { ReactNode } from 'react';
import { Property } from 'csstype';
import {
  SpaceProps,
  ColorProps,
  LayoutProps,
  PositionProps,
  BorderProps,
  ShadowProps,
  FlexboxProps,
} from '@aw-web-design/styled-system';

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
  as?: any;
  autoid?: string;
  className?: string;
  cursor?: Property.Cursor;
  pointerEvents?: Property.PointerEvents;
}

const Box = ({ children, as, autoid, ...rest }: Props) => (
  <StyledBox data-autoid={generateAutomationId(autoid ?? '')} as={as} {...rest}>
    {children}
  </StyledBox>
);

export default Box;
