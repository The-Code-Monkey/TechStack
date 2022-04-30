import * as React from 'react';

import { IconProps } from '../types';

const Delete = (
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
      <path d='M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z' />
      <line x1='18' y1='9' x2='12' y2='15' />
      <line x1='12' y1='9' x2='18' y2='15' />
    </svg>
  );
};

Delete.displayName = 'Delete';

export default React.forwardRef(Delete);
