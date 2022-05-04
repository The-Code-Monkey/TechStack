import * as React from 'react';

import { IconProps } from '../types';

const Twitch = (
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
      <path d='M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7' />
    </svg>
  );
};

Twitch.displayName = 'Twitch';

export default React.forwardRef(Twitch);
