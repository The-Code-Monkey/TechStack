import React, { ForwardedRef, forwardRef } from 'react';
import { IconProps } from '../types';


const ArrowLeftCircle = ({ color = 'currentColor', size = 24, ...rest }: IconProps, ref: ForwardedRef<SVGSVGElement>) => {
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
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 8 8 12 12 16" />
        <line x1="16" y1="12" x2="8" y2="12" />
      </svg>
    );
  }
);

ArrowLeftCircle.propTypes = {
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ color: PropTypes.Requireable<string>; size... Remove this comment to see the full error message
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ArrowLeftCircle.displayName = 'ArrowLeftCircle';

export default ArrowLeftCircle;
