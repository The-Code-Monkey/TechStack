import * as React from 'react';

import { IconProps } from '../types';

const VolumeX = (
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
      <polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5' />
      <line x1='23' y1='9' x2='17' y2='15' />
      <line x1='17' y1='9' x2='23' y2='15' />
    </svg>
  );
};

VolumeX.displayName = 'VolumeX';

export default React.forwardRef(VolumeX);
