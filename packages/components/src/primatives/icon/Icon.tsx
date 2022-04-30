import FeatherIcon from '@aw-web-design/react-feather';
import * as React from 'react';
const { memo } = React;

import { generateAutomationId } from '../../utils';
import { BoxProps } from '../box';

import { SvgWrapper } from './styled';

export interface Props extends Omit<BoxProps, 'children'> {
  name: string;
  noFill?: boolean;
}

const Icon = ({ autoid, name, ...rest }: Props) => {
  // const config = useContext(ConfigContext);

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
