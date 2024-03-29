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

const Interactable = <P extends Record<string, unknown>>({
  className,
  children,
  testid = '',
  onClick,
  onDoubleClick,
  disabled,
  ...rest
}: Props & P) => {
  const config = useContext(ConfigContext);
  const dblClickDelay = config?.dblClickDelay ?? 150;

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

    const waitForClick = cancellablePromise(delay(dblClickDelay));
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
      data-testid={testid}
      disabled={disabled}
      {...rest}
    >
      {children}
    </StyledInteractable>
  );
};

export default Interactable;
