import lazy from '@aw-web-design/react-lazy-named';
import * as React from 'react';

import { default as HelpCircle } from './icons/help-circle';
import { IconProps } from './types';

export interface Props extends IconProps {
  name: string;
}

const { Suspense, memo } = React;

export const getIcon = (name: string) => {
  return lazy(() => import(`./icons/${name}`));
};

export const Icon = ({ name, ...rest }: Props) => {
  const Element = getIcon(name);

  return (
    <Suspense fallback={<HelpCircle {...rest} data-name='fallback-icon' />}>
      <Element data-name={name} {...rest} />
    </Suspense>
  );
};

export default memo(Icon);
