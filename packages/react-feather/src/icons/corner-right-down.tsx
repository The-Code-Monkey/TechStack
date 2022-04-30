import * as React from 'react';

import { IconProps } from '../types';

const CornerRightDown = (
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
      <polyline points='10 15 15 20 20 15' />
      <path d='M4 4h7a4 4 0 0 1 4 4v12' />
    </svg>
  );
};

CornerRightDown.displayName = 'CornerRightDown';

export default React.forwardRef(CornerRightDown);
