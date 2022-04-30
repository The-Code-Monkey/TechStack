import * as React from 'react';

import { IconProps } from '../types';

const ToggleRight = (
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
      <rect x='1' y='5' width='22' height='14' rx='7' ry='7' />
      <circle cx='16' cy='12' r='3' />
    </svg>
  );
};

ToggleRight.displayName = 'ToggleRight';

export default React.forwardRef(ToggleRight);
