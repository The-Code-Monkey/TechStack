import React, { ForwardedRef, forwardRef } from 'react';

import { IconProps } from '../types';

const Hexagon = (
  { color = 'currentColor', size = 24, ...rest }: IconProps,
  ref: ForwardedRef<SVGSVGElement>
) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  );
};

Hexagon.displayName = 'Hexagon';

export default forwardRef(Hexagon);
