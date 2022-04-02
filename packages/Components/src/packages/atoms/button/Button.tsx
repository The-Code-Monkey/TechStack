import React, { useMemo } from 'react';

import { Icon, InteractableProps, Text } from '../../primatives';

import { StyledInteractable, iconOrientations, iconMargins } from './styled';

export interface Props extends InteractableProps {
  iconName?: string;
  iconPosition?: 'left' | 'top' | 'right' | 'bottom';
  variant?: string;
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
  const hasChildren = useMemo(() => {
    if (typeof children === 'string' && children === '') {
      return false;
    }
    return true;
  }, [children]);

  return (
    <StyledInteractable
      className={className}
      forwardedAs="button"
      autoid={`${autoid || children}_button`}
      typography="button"
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
