import * as React from 'react';

export interface IconProps {
  color?: string;
  size?: string | 0 | number;
  className?: string;
}

export type Icon = React.FC<IconProps>;
