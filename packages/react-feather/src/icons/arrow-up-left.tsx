import React, { ForwardedRef, forwardRef } from 'react';
import { IconProps } from '../types';


const ArrowUpLeft = ({ color = 'currentColor', size = 24, ...rest }: IconProps, ref: ForwardedRef<SVGSVGElement>) => {
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
        <line x1="17" y1="17" x2="7" y2="7" />
        <polyline points="7 17 7 7 17 7" />
      </svg>
    );
  }
);

ArrowUpLeft.propTypes = {
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ color: PropTypes.Requireable<string>; size... Remove this comment to see the full error message
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ArrowUpLeft.displayName = 'ArrowUpLeft';

export default ArrowUpLeft;
