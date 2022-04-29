import * as React from 'react';

import { default as HelpCircle } from './icons/help-circle';
import { IconProps } from './types';

export interface Props extends IconProps {
  name: string;
}

const { lazy, Suspense, memo } = React;

const El = ({name }) => <>{lazy(async () => await import(`./icons/${name}`).then(res => res))}</>;

export const Icon = ({ name, ...rest }: Props) => {

  return (
    <Suspense fallback={<HelpCircle {...rest} />}>
      <El name={name} />
    </Suspense>
  );
};

export default memo(Icon);