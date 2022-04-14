import React, { ForwardedRef, forwardRef } from 'react';

import { IconProps } from '../types';

const ChevronUp = (
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
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
};

ChevronUp.displayName = 'ChevronUp';

export default forwardRef(ChevronUp);
