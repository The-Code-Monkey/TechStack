import * as React from 'react';

import { IconProps } from '../types';

const Type = (
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
      <polyline points='4 7 4 4 20 4 20 7' />
      <line x1='9' y1='20' x2='15' y2='20' />
      <line x1='12' y1='4' x2='12' y2='20' />
    </svg>
  );
};

Type.displayName = 'Type';

export default React.forwardRef(Type);
