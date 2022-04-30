import * as React from 'react';

import { IconProps } from '../types';

const Maximize2 = (
  { color = 'currentColor', size = 24, ...rest }: IconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) => {
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...rest}
    >
      <polyline points='15 3 21 3 21 9' />
      <polyline points='9 21 3 21 3 15' />
      <line x1='21' y1='3' x2='14' y2='10' />
      <line x1='3' y1='21' x2='10' y2='14' />
    </svg>
  );
};

Maximize2.displayName = 'Maximize2';

export default React.forwardRef(Maximize2);
