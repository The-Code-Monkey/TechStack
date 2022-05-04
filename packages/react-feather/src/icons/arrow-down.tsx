import * as React from 'react';

import { IconProps } from '../types';

const ArrowDown = (
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
      <line x1='12' y1='5' x2='12' y2='19' />
      <polyline points='19 12 12 19 5 12' />
    </svg>
  );
};

ArrowDown.displayName = 'ArrowDown';

export default React.forwardRef(ArrowDown);
