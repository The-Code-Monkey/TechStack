import React, { Suspense, memo } from 'react';

import { default as HelpCircle } from './icons/help-circle';
import { IconProps } from './types';

export interface Props extends IconProps {
  name: string;
}

const getIcon = async (name) => await import(`./icons/${name}`);

const Icon = async ({ name, ...rest }: Props) => {
  const Element = await getIcon(name);

  return (
    <Suspense fallback={<HelpCircle {...rest} />}>
      <Element {...rest} />
    </Suspense>
  );
};

export default memo(Icon);
