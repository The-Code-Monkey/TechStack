import { helpcircle as DefaultIcon, IconProps } from '@techstack/react-feather';
import type { IconTypes } from '@techstack/react-feather';
import { ResponsiveValue, TLengthStyledSystem } from '@techstack/styled-system';
import { Property } from 'csstype';
import * as React from 'react';
const { memo, Suspense, lazy } = React;

import { generateAutomationId } from '../../utils';

import { SvgWrapper } from './styled';

export interface Props {
  testid?: string;
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
  testid,
  ...rest
}: IconProps & Pick<Props, 'name' | 'testid'>) => {
  const Element = getIcon(name);

  return (
    <Suspense fallback={<DefaultIcon {...rest} data-name='fallback-icon' />}>
      <Element data-testid={testid} />
    </Suspense>
  );
};

const Icon = ({ testid, name, ...rest }: Props) => {
  return (
    <SvgWrapper {...rest}>
      <FeatherIcon
        name={name}
        testid={`${generateAutomationId(testid ?? name)}_icon`}
      />
    </SvgWrapper>
  );
};

export default memo(Icon);
