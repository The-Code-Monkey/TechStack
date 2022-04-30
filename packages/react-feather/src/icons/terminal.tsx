import * as React from 'react';

import { IconProps } from '../types';

const Terminal = (
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
      <polyline points='4 17 10 11 4 5' />
      <line x1='12' y1='19' x2='20' y2='19' />
    </svg>
  );
};

Terminal.displayName = 'Terminal';

export default React.forwardRef(Terminal);
