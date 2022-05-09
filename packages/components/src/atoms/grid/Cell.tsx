import { useMemo } from 'react';

import { BoxProps } from '../../primatives';

import { StyledCell } from './styled';
import { getGrid } from './utils';

export interface Props extends BoxProps {
  cellLeft?: number;
  cellTop?: number;
  cellWidth?: number;
  cellHeight?: number;
  cellArea?: string;
}

const Cell = ({
  children,
  autoid,
  cellLeft = 0,
  cellTop = 0,
  cellWidth = 1,
  cellHeight = 1,
  cellArea,
  ...rest
}: Props) => {
  const getGridColumnMemo = useMemo(
    () => getGrid(cellLeft, cellWidth),
    [cellLeft, cellWidth]
  );
  const getGridRowMemo = useMemo(
    () => getGrid(cellTop, cellHeight),
    [cellTop, cellHeight]
  );

  return (
    <StyledCell
      autoid={`${autoid || children}_cell`}
      gridColumn={getGridColumnMemo}
      gridRow={getGridRowMemo}
      gridArea={cellArea}
      display='flex'
      {...rest}
    >
      {children}
    </StyledCell>
  );
};

export default Cell;
