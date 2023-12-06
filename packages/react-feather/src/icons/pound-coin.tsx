import * as React from 'react';

import { IconProps } from '../types';

const PoundCoin = (
  { color = 'currentColor', size = 24, ...rest }: IconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) => {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M5.77098 11.7212V10.5332H6.52998V8.65219H5.81498V7.69519H6.52998V6.90319C6.52998 5.22019 7.50898 4.48319 8.76298 4.48319C9.38998 4.48319 10.094 4.70319 10.677 5.20919L9.93998 6.19919C9.66498 5.93519 9.31298 5.79219 8.98298 5.79219C8.45498 5.79219 8.01498 6.05619 8.01498 6.83719V7.69519H9.77498V8.65219H8.01498V10.4232H10.875V11.7212H5.77098Z'
        fill={color}
      />
      <circle
        cx='8.5'
        cy='8.40576'
        r='6.93457'
        stroke={color}
        strokeWidth='1.5'
      />
    </svg>
  );
};

PoundCoin.displayName = 'PoundCoin';

export default React.forwardRef(PoundCoin);
