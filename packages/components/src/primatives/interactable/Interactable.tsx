import { BoxProps } from '../box';

import { StyledInteractable } from './styled';

export interface Props extends BoxProps {
  onClick?: (event: MouseEvent) => void;
}

const Interactable = ({
  className,
  children,
  autoid = '',
  onClick,
  ...rest
}: Props) => {
  const handleOnClick = (event: MouseEvent) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <StyledInteractable
      className={className}
      onClick={handleOnClick}
      data-autoid={autoid}
      {...rest}
    >
      {children}
    </StyledInteractable>
  );
};

export default Interactable;
