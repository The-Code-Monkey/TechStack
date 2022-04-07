import React, { ForwardedRef, forwardRef } from 'react';
import { IconProps } from '../types';


const Bluetooth = ({ color = 'currentColor', size = 24, ...rest }: IconProps, ref: ForwardedRef<SVGSVGElement>) => {
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
        <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
      </svg>
    );
  }
);

Bluetooth.propTypes = {
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ color: PropTypes.Requireable<string>; size... Remove this comment to see the full error message
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Bluetooth.displayName = 'Bluetooth';

export default Bluetooth;
