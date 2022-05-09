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
import { ReactNode } from 'react';

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
  bg?: ColorProps['bgColor'];
}

const Box = ({ children, as, autoid = 'box', ...rest }: Props) => (
  <StyledBox data-autoid={generateAutomationId(autoid)} as={as} {...rest}>
    {children}
  </StyledBox>
);

export default Box;
