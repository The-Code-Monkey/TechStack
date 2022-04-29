import * as React from 'react';

import { IconProps } from '../types';

const Check = (
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
      <title>check-icon</title>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

Check.displayName = 'Check';

export default React.forwardRef(Check);
