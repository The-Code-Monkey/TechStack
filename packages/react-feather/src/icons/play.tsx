import * as React from 'react';

import { IconProps } from '../types';

const Play = (
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
      <polygon points='5 3 19 12 5 21 5 3' />
    </svg>
  );
};

Play.displayName = 'Play';

export default React.forwardRef(Play);
