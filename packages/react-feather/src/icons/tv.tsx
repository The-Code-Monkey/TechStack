import * as React from 'react';

import { IconProps } from '../types';

const Tv = (
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
      <rect x='2' y='7' width='20' height='15' rx='2' ry='2' />
      <polyline points='17 2 12 7 7 2' />
    </svg>
  );
};

Tv.displayName = 'Tv';

export default React.forwardRef(Tv);
