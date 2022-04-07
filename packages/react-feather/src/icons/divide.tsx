import React, { ForwardedRef, forwardRef } from 'react';
import { IconProps } from '../types';

const Divide = (
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
      <circle cx="12" cy="6" r="2" />
      <line x1="5" y1="12" x2="19" y2="12" />
      <circle cx="12" cy="18" r="2" />
    </svg>
  );
};

Divide.displayName = 'Divide';

export default forwardRef(Divide);
