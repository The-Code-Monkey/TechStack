import * as React from 'react';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
}

export type Icon = React.FC<IconProps>;
