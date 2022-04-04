import React, { Children, cloneElement, ReactElement } from 'react';

import Button, { ButtonProps } from '../../atoms/button';

export interface Props extends ButtonProps {
  children: ReactElement<ButtonProps, typeof Button>;
}

const ButtonGroup = ({ children, ...rest }: Props) => {
  return (
    <div>
      {Children.map(children, (child: ReactElement<ButtonProps>) =>
        cloneElement(child, {
          ...rest,
        })
      )}
    </div>
  );
};

export default ButtonGroup;
