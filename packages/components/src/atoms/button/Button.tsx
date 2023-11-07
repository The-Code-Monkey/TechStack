import * as React from 'react';

const { useMemo, lazy } = React;

const Icon = lazy(() =>
  import('../../primal').then(module => ({ default: module.Icon }))
);

import { ComponentPropsWithRef, ReactNode } from 'react';

import { InteractableProps, Text, IconProps } from '../../primal';

import { StyledInteractable, iconOrientations, iconMargins } from './styled';

export interface Props
  extends Omit<InteractableProps, 'size'>,
    Omit<
      ComponentPropsWithRef<'button'>,
      'onDoubleClick' | 'onClick' | 'color'
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
  onDragStart,
  onDrag,
  onDragEnd,
  onDrop,
  ...rest
}: Props): ReactNode => {
  const hasChildren = useMemo(
    () => !(typeof children === 'string' && children === ''),
    [children]
  );

  return (
    <StyledInteractable
      className={className}
      forwardedAs='button'
      data-testid={`${testid || children}_button`}
      typography='button'
      variant={variant}
      type={type}
      size={size}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
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
