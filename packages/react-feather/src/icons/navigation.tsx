import * as React from 'react';

import { IconProps } from '../types';

const Navigation = (
  { color = 'currentColor', size = 24, ...rest }: IconProps,
  ref: React.ForwardedRef<SVGSVGElement>
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
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
};

Navigation.displayName = 'Navigation';

export default React.forwardRef(Navigation);
