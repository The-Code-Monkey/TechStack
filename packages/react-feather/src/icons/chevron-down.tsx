import * as React from 'react';

import { IconProps } from '../types';

const ChevronDown = (
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
      <polyline points='6 9 12 15 18 9' />
    </svg>
  );
};

ChevronDown.displayName = 'ChevronDown';

export default React.forwardRef(ChevronDown);
