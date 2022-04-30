import * as React from 'react';

import { IconProps } from '../types';

const Trello = (
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
      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
      <rect x='7' y='7' width='3' height='9' />
      <rect x='14' y='7' width='3' height='5' />
    </svg>
  );
};

Trello.displayName = 'Trello';

export default React.forwardRef(Trello);
