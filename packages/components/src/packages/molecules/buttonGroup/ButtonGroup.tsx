import React, { ReactElement } from 'react';

import { Button, ButtonProps } from '../../atoms';

import { StyledBox } from './styled';

export interface Props extends ButtonProps {
  children: Array<ReactElement<ButtonProps, typeof Button>>;
}

const ButtonGroup = ({ children, ...rest }: Props) => {
  return (
    <StyledBox
      display="inline-flex"
      flexDir="row"
      borderRadius="2"
      overflow="hidden"
    >
      {children.map((child) => (
        <Button {...child.props} {...rest}>
          {child.props.children}
        </Button>
      ))}
    </StyledBox>
  );
};

export default ButtonGroup;
