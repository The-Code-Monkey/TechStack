import React, { ForwardedRef, forwardRef } from 'react';
import { IconProps } from '../types';


const CornerLeftUp = ({ color = 'currentColor', size = 24, ...rest }: IconProps, ref: ForwardedRef<SVGSVGElement>) => {
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
        <polyline points="14 9 9 4 4 9" />
        <path d="M20 20h-7a4 4 0 0 1-4-4V4" />
      </svg>
    );
  }
);

CornerLeftUp.propTypes = {
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ color: PropTypes.Requireable<string>; size... Remove this comment to see the full error message
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CornerLeftUp.displayName = 'CornerLeftUp';

export default CornerLeftUp;
