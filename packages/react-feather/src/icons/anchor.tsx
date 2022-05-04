import * as React from 'react';

import { IconProps } from '../types';

const Anchor = (
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
      <circle cx='12' cy='5' r='3' />
      <line x1='12' y1='22' x2='12' y2='8' />
      <path d='M5 12H2a10 10 0 0 0 20 0h-3' />
    </svg>
  );
};

Anchor.displayName = 'Anchor';

export default React.forwardRef(Anchor);
