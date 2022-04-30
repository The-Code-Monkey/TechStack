import * as React from 'react';

import { IconProps } from '../types';

const PenTool = (
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
      <path d='M12 19l7-7 3 3-7 7-3-3z' />
      <path d='M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z' />
      <path d='M2 2l7.586 7.586' />
      <circle cx='11' cy='11' r='2' />
    </svg>
  );
};

PenTool.displayName = 'PenTool';

export default React.forwardRef(PenTool);
