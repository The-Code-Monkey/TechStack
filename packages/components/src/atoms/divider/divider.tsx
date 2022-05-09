import { FC } from 'react';

import { BoxProps } from '../../primal';

import { StyledHr } from './styled';

export type Props = BoxProps;

const Divider: FC<Props> = ({ ...rest }: Props) => {
  return <StyledHr {...rest} />;
};

export default Divider;
