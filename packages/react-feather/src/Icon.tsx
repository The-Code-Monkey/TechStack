import React, { Suspense, memo } from 'react';
import { default as HelpCircle } from './help-circle';

import { IconProps } from './types';

export interface Props extends IconProps {
  name: keyof typeof IconTypes;
}

const getIcon = async (name) => await import(`./icons/${name}`);

const Icon = async ({ name, ...rest }: Props) => {
  const Element = await getIcon(name);

  return (
    <Suspense fallback={<HelpCircle />}>
      <Element />
    </Suspense>
  );
};

export default memo(Icon);
