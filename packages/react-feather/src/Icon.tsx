import * as React from 'react';
const { lazy } = React;

import { default as HelpCircle } from './icons/help-circle';
import { IconProps } from './types';
import IconTypes from "./iconTypes";

export interface Props extends IconProps {
  name: IconTypes;
}

const { Suspense, memo } = React;

export const getIcon = (name: IconTypes) => {
  return lazy(() => import(`./icons/${name}`));
};

export const Icon = ({name, ...rest}: Props) => {
  const Element = getIcon(name);

  return (
      <Suspense fallback={<HelpCircle {...rest} data-name='fallback-icon'/>}>
        <Element data-name={name} {...rest} />
      </Suspense>
  );
};

export default memo(Icon);
