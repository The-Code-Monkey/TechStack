import { RefObject } from 'react';

import { CellType } from '../types';

import useVirtualGridChildren from './useVirtualGridChildren';
import useVirtualGridDisplay from './useVirtualGridDisplay';
import useVirtualGridFirstRowIndex from './useVirtualGridFirstRowIndex';

interface Props {
  cell: CellType;
  total: number;
  viewportRowOffset?: number;
  onRender?: () => void;
  scrollContainer?: Record<string, unknown>;
}

interface Return {
  container: {
    ref: RefObject<HTMLDivElement>;
    style: Record<string, unknown>;
  };
  children: Array<{
    key: string;
    index: number;
    scrolling: boolean;
    readyInViewport: boolean;
    style: Record<string, unknown>;
  }>;
}

const useVirtualGrid = ({
  cell,
  total,
  viewportRowOffset = 4,
  onRender,
  scrollContainer,
}: Props): Return => {
  const rowOffset = Math.max(2, Math.round(viewportRowOffset / 2) * 2);
  const {
    display,
    style,
    ref: innerRef,
  } = useVirtualGridDisplay({ cell, total, rowOffset });
  const { firstRowIndex, scrolling } = useVirtualGridFirstRowIndex(
    display,
    scrollContainer
  );
  const children = useVirtualGridChildren({
    firstRowIndex,
    scrolling,
    display,
    onRender,
  });

  const ref = innerRef as unknown as RefObject<HTMLDivElement>;

  return { container: { ref, style }, children };
};

export default useVirtualGrid;
