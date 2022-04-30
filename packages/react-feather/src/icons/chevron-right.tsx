import * as React from 'react';

import { IconProps } from '../types';

const ChevronRight = (
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
      <polyline points='9 18 15 12 9 6' />
    </svg>
  );
};

ChevronRight.displayName = 'ChevronRight';

export default React.forwardRef(ChevronRight);
