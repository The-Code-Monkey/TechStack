import * as React from 'react';

import { IconProps } from '../types';

const Slash = (
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
      <circle cx='12' cy='12' r='10' />
      <line x1='4.93' y1='4.93' x2='19.07' y2='19.07' />
    </svg>
  );
};

Slash.displayName = 'Slash';

export default React.forwardRef(Slash);
