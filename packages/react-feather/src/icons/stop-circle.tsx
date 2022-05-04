import * as React from 'react';

import { IconProps } from '../types';

const StopCircle = (
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
      <rect x='9' y='9' width='6' height='6' />
    </svg>
  );
};

StopCircle.displayName = 'StopCircle';

export default React.forwardRef(StopCircle);
