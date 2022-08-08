import { helpcircle as DefaultIcon } from '@aw-web-design/react-feather';
import type { IconTypes } from '@aw-web-design/react-feather';
import * as React from 'react';
const { memo, Suspense, lazy } = React;

import { SizesType } from '../../theme/types';
import { generateAutomationId } from '../../utils';

import { SvgWrapper } from './styled';

export interface Props {
  autoid?: string;
  name: IconTypes;
  noFill?: boolean;
  size?: keyof SizesType;
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
