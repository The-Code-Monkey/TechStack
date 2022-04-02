import React, { useContext, Suspense, memo } from 'react';
import { HelpCircle } from 'react-feather';

import { generateAutomationId, ConfigContext } from '../../utils';
import { BoxProps } from '../box';

import { getIcon } from './utils';
import { SvgWrapper } from './styled';

export interface Props extends Omit<BoxProps, 'children'> {
  name: string;
  noFill?: boolean;
}

const Icon = ({ autoid, name, ...rest }: Props) => {
  const config = useContext(ConfigContext);
  const Element = getIcon(config, name);

  return (
    <Suspense fallback={<HelpCircle />}>
      <SvgWrapper
        autoid={`${generateAutomationId(autoid ?? name)}_icon`}
        {...rest}
      >
        <Element />
      </SvgWrapper>
    </Suspense>
  );
};

export default memo(Icon);
