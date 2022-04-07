import React, { ForwardedRef, forwardRef } from "react";
import { IconProps } from "../types";

const CornerLeftDown = (
  { color = "currentColor", size = 24, ...rest }: IconProps,
  ref: ForwardedRef<SVGSVGElement>
) => {
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
      <polyline points="14 15 9 20 4 15" />
      <path d="M20 4h-7a4 4 0 0 0-4 4v12" />
    </svg>
  );
};

CornerLeftDown.displayName = "CornerLeftDown";

export default forwardRef(CornerLeftDown);
