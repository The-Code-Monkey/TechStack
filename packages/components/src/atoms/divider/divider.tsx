import { FC } from 'react';

import { BoxProps } from '../../primatives';

import { StyledHr } from './styled';

export type Props = BoxProps;

const Divider: FC<Props> = ({ ...rest }: Props) => {
  return <StyledHr {...rest} />;
};

export default Divider;
