import * as React from 'react';

const { useMemo } = React;

import { Icon, InteractableProps, Text, IconProps } from '../../primal';

import { StyledInteractable, iconOrientations, iconMargins } from './styled';

export interface Props extends InteractableProps {
  iconName?: IconProps['name'];
  iconPosition?: 'left' | 'top' | 'right' | 'bottom';
  variant?: string;
  strong?: boolean;
}

const Button = ({
  className,
  children = '',
  iconName,
  iconPosition = 'left',
  autoid,
  variant = 'default',
  ...rest
}: Props) => {
  const hasChildren = useMemo(
    () => !(typeof children === 'string' && children === ''),
    [children]
  );

  return (
    <StyledInteractable
      className={className}
      forwardedAs='button'
      autoid={`${autoid || children}_button`}
      typography='button'
      variant={variant}
      {...rest}
      {...iconOrientations[iconPosition]}
    >
      {iconName && (
        <Icon
          name={iconName}
          {...(hasChildren &&
            iconPosition in iconMargins &&
            iconMargins[iconPosition])}
        />
      )}
      {typeof children === 'string' ? <Text>{children}</Text> : { children }}
    </StyledInteractable>
  );
};

export default Button;
