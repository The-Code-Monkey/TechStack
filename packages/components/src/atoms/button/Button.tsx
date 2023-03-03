import * as React from 'react';

const { useMemo, lazy } = React;

const Icon = lazy(() =>
  import('../../primal').then(module => ({ default: module.Icon }))
);

import { InteractableProps, Text, IconProps } from '../../primal';

import { StyledInteractable, iconOrientations, iconMargins } from './styled';

export interface Props
  extends Omit<InteractableProps, 'size'>,
    Partial<
      Omit<
        HTMLButtonElement,
        'className' | 'children' | 'disabled' | 'onClick' | 'onDoubleClick'
      >
    > {
  iconName?: IconProps['name'];
  iconPosition?: 'left' | 'top' | 'right' | 'bottom';
  variant?: string;
  intent?: string;
  strong?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({
  className,
  children = '',
  iconName,
  iconPosition = 'left',
  testid,
  variant = 'default',
  type = 'button',
  size = 'md',
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
      testid={`${testid || children}_button`}
      typography='button'
      variant={variant}
      type={type}
      size={size}
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
