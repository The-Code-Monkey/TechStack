import * as React from 'react';

import { IconProps } from '../types';

const Twitter = (
  { color = 'currentColor', size = 24, ...rest }: IconProps,
  ref: React.ForwardedRef<SVGSVGElement>
) => {
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 16 17'
      stroke={color}
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...rest}
    >
      <path d='M9.51664 6.79444L15.3449 0.0195312H13.9638L8.90311 5.90209L4.86115 0.0195312H0.199219L6.31146 8.915L0.199219 16.0195H1.58041L6.92464 9.80735L11.1933 16.0195H15.8552L9.5163 6.79444H9.51664ZM7.62491 8.99337L7.00561 8.10758L2.07808 1.05927H4.19951L8.17609 6.74748L8.79538 7.63327L13.9645 15.0271H11.843L7.62491 8.99371V8.99337Z' />
    </svg>
  );
};

Twitter.displayName = 'Twitter/X';

export default React.forwardRef(Twitter);
