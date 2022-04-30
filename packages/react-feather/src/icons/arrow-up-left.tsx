import * as React from 'react';

import { IconProps } from '../types';

const ArrowUpLeft = (
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
      <line x1='17' y1='17' x2='7' y2='7' />
      <polyline points='7 17 7 7 17 7' />
    </svg>
  );
};

ArrowUpLeft.displayName = 'ArrowUpLeft';

export default React.forwardRef(ArrowUpLeft);
