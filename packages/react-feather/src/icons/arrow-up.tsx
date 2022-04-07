import React, { ForwardedRef, forwardRef } from 'react';
import { IconProps } from '../types';


const ArrowUp = ({ color = 'currentColor', size = 24, ...rest }: IconProps, ref: ForwardedRef<SVGSVGElement>) => {
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
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    );
  }
);

ArrowUp.propTypes = {
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ color: PropTypes.Requireable<string>; size... Remove this comment to see the full error message
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ArrowUp.displayName = 'ArrowUp';

export default ArrowUp;
