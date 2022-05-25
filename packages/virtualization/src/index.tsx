import {
  memo,
  cloneElement,
  ReactElement,
  FunctionComponentElement,
} from 'react';

import useVirtualGrid from './hooks/useVirtualGrid';
import { CellType } from './types';

interface Props {
  child: FunctionComponentElement<unknown> | ReactElement;
  childProps: Record<string, unknown>;
  useChildProps: (key: string) => Record<string, unknown>;
  total: number;
  cell: CellType;
  onRender?: () => void;
  viewportRowOffset?: number;
  scrollContainer?: Record<string, unknown>;
}

export const VirtualGrid = ({
  child,
  childProps = {},
  useChildProps = null,
  ...props
}: Props) => {
  const { container, children } = useVirtualGrid(props);

  const Child = props => cloneElement(child, props);

  return (
    <div {...container}>
      {children.map(({ key, ...props }) => (
        <Child
          {...childProps}
          key={key}
          {...(typeof useChildProps === 'function' ? useChildProps(key) : {})}
          {...props}
        />
      ))}
    </div>
  );
};

export default memo(VirtualGrid);
