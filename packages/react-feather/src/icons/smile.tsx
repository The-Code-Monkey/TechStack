import * as React from 'react';

import { IconProps } from '../types';

const Smile = (
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
      <path d='M8 14s1.5 2 4 2 4-2 4-2' />
      <line x1='9' y1='9' x2='9.01' y2='9' />
      <line x1='15' y1='9' x2='15.01' y2='9' />
    </svg>
  );
};

Smile.displayName = 'Smile';

export default React.forwardRef(Smile);
