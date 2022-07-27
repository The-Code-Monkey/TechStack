import { helpcircle as DefaultIcon } from '@aw-web-design/react-feather';
import type { IconTypes } from '@aw-web-design/react-feather';
import { IconProps } from '@aw-web-design/react-feather/dist/types/types';
import * as React from 'react';
const { memo, Suspense, lazy } = React;

import { generateAutomationId } from '../../utils';

import { SvgWrapper } from './styled';

export interface Props extends IconProps {
  autoid?: string;
  name: IconTypes;
  noFill?: boolean;
}

export const getIcon = (name: IconTypes) => {
  return lazy(() =>
    import(`@aw-web-design/react-feather`).then(module => ({
      default: module[name],
    }))
  );
};

export const FeatherIcon = ({ name, ...rest }: Props) => {
  const Element = getIcon(name);

  return (
    <Suspense fallback={<DefaultIcon {...rest} data-name='fallback-icon' />}>
      <Element />
    </Suspense>
  );
};

const Icon = ({ autoid, name, ...rest }: Props) => {
  return (
    <SvgWrapper
      autoid={`${generateAutomationId(autoid ?? name)}_icon`}
      {...rest}
    >
      <FeatherIcon name={name} />
    </SvgWrapper>
  );
};

export default memo(Icon);
