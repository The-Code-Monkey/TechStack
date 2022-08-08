import * as React from 'react';

export interface IconProps {
  color?: string;
  size?: string | number;
}

export type Icon = React.FC<IconProps>;
