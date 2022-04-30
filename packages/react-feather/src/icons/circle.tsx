import * as React from 'react';

import { IconProps } from '../types';

const Circle = (
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
    </svg>
  );
};

Circle.displayName = 'Circle';

export default React.forwardRef(Circle);
