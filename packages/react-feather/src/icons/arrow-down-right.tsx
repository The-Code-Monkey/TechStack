import * as React from 'react';

import { IconProps } from '../types';

const ArrowDownRight = (
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
      <line x1='7' y1='7' x2='17' y2='17' />
      <polyline points='17 7 17 17 7 17' />
    </svg>
  );
};

ArrowDownRight.displayName = 'ArrowDownRight';

export default React.forwardRef(ArrowDownRight);
