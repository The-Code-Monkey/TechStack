import {
  SpaceProps,
  ColorProps,
  LayoutProps,
  PositionProps,
  BorderProps,
  ShadowProps,
  FlexboxProps,
  PseudoProps,
  TransitionProps,
} from '@bunstack/styled-system';
import { Property } from 'csstype';
import { ElementType, ReactNode } from 'react';

import { generateAutomationId } from '../../utils';

import { StyledBox } from './styled';
import React from 'react';

export interface Props
  extends SpaceProps,
    ColorProps,
    LayoutProps,
    PositionProps,
    BorderProps,
    ShadowProps,
    FlexboxProps,
    PseudoProps,
    TransitionProps {
  children?: ReactNode;
  as?: ElementType;
  testid?: string;
  className?: string;
  cursor?: Property.Cursor;
  pointerEvents?: Property.PointerEvents;
  defaultStyles?: Record<string, unknown>;
}

export const Box = <P extends keyof HTMLElementTagNameMap = 'div'>({
  children,
  as,
  testid = 'box',
  size,
  ...rest
}: Props & Partial<Omit<HTMLElementTagNameMap[P], 'children'>>) => (
  <StyledBox
    data-testid={generateAutomationId(testid)}
    as={as}
    w={size}
    h={size}
    {...rest}
  >
    {children}
  </StyledBox>
);

export default Box;
