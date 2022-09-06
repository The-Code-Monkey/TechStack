import { helpcircle as DefaultIcon, IconProps } from '@techstack/react-feather';
import type { IconTypes } from '@techstack/react-feather';
import { ResponsiveValue, TLengthStyledSystem } from '@techstack/styled-system';
import { Property } from 'csstype';
import * as React from 'react';
const { memo, Suspense, lazy } = React;

import { generateAutomationId } from '../../utils';

import { SvgWrapper } from './styled';

export interface Props {
  autoid?: string;
  name: IconTypes;
  fill?: boolean;
  size?: ResponsiveValue<Property.Width<TLengthStyledSystem>>;
}

export const getIcon = (name: IconTypes) => {
  return lazy(() =>
    import(`@techstack/react-feather`).then(module => ({
      default: module[name],
    }))
  );
};

export const FeatherIcon = ({
  name,
  ...rest
}: IconProps & Pick<Props, 'name'>) => {
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
