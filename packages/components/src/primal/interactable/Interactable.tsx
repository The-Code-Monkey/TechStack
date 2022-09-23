import { useContext } from 'react';

import { ConfigContext } from '../../utils';
import { BoxProps } from '../box';

import { StyledInteractable } from './styled';
import { delay, cancellablePromise } from './utils';

export interface Props extends BoxProps {
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  onDoubleClick?: (event: MouseEvent) => void;
}

const Interactable = ({
  className,
  children,
  autoid = '',
  onClick,
  onDoubleClick,
  disabled,
  ...rest
}: Props) => {
  const { dblClickDelay } = useContext(ConfigContext);

  let pendingPromises = [];

  const appendPendingPromise = promise => {
    pendingPromises = [...pendingPromises, promise];
  };

  const removePendingPromise = promise => {
    pendingPromises = pendingPromises.filter(p => p !== promise);
  };

  const cleanPendingPromise = () => pendingPromises.map(p => p.cancel());

  const handleOnClick = (event: MouseEvent) => {
    if (disabled) return;

    const waitForClick = cancellablePromise(delay(dblClickDelay ?? 150));
    appendPendingPromise(waitForClick);

    return waitForClick.promise
      .then(() => {
        removePendingPromise(waitForClick);
        if (onClick) {
          onClick(event);
        }
      })
      .catch(err => {
        removePendingPromise(waitForClick);
        if (!err.isCanceled) {
          throw err.error;
        }
      });
  };

  const handleOnDoubleClick = (event: MouseEvent) => {
    if (disabled) return;

    cleanPendingPromise();
    if (onDoubleClick) {
      onDoubleClick(event);
    }
  };

  return (
    <StyledInteractable
      className={className}
      onClick={handleOnClick}
      onDoubleClick={handleOnDoubleClick}
      data-autoid={autoid}
      disabled={disabled}
      {...rest}
    >
      {children}
    </StyledInteractable>
  );
};

export default Interactable;
