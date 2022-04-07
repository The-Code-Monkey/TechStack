import React, { ForwardedRef, forwardRef } from 'react';
import { IconProps } from '../types';


const ToggleLeft = ({ color = 'currentColor', size = 24, ...rest }: IconProps, ref: ForwardedRef<SVGSVGElement>) => {
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
        <rect x="1" y="5" width="22" height="14" rx="7" ry="7" />
        <circle cx="8" cy="12" r="3" />
      </svg>
    );
  }
);

ToggleLeft.propTypes = {
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ color: PropTypes.Requireable<string>; size... Remove this comment to see the full error message
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ToggleLeft.displayName = 'ToggleLeft';

export default ToggleLeft;
