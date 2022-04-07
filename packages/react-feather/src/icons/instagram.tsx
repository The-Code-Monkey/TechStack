import React, { ForwardedRef, forwardRef } from 'react';
import { IconProps } from '../types';


const Instagram = ({ color = 'currentColor', size = 24, ...rest }: IconProps, ref: ForwardedRef<SVGSVGElement>) => {
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
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
);

Instagram.propTypes = {
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ color: PropTypes.Requireable<string>; size... Remove this comment to see the full error message
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Instagram.displayName = 'Instagram';

export default Instagram;
