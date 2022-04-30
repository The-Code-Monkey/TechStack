import * as React from 'react';

import { IconProps } from '../types';

const Rss = (
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
      <path d='M4 11a9 9 0 0 1 9 9' />
      <path d='M4 4a16 16 0 0 1 16 16' />
      <circle cx='5' cy='19' r='1' />
    </svg>
  );
};

Rss.displayName = 'Rss';

export default React.forwardRef(Rss);
