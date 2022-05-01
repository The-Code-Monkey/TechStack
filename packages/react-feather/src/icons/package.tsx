import * as React from 'react';

import { IconProps } from '../types';

const Package = (
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
      <line x1='16.5' y1='9.4' x2='7.5' y2='4.21' />
      <path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' />
      <polyline points='3.27 6.96 12 12.01 20.73 6.96' />
      <line x1='12' y1='22.08' x2='12' y2='12' />
    </svg>
  );
};

Package.displayName = 'Package';

export default React.forwardRef(Package);
