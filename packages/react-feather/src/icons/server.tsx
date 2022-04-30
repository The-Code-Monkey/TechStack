import * as React from 'react';

import { IconProps } from '../types';

const Server = (
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
      <rect x='2' y='2' width='20' height='8' rx='2' ry='2' />
      <rect x='2' y='14' width='20' height='8' rx='2' ry='2' />
      <line x1='6' y1='6' x2='6.01' y2='6' />
      <line x1='6' y1='18' x2='6.01' y2='18' />
    </svg>
  );
};

Server.displayName = 'Server';

export default React.forwardRef(Server);
