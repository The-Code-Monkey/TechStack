import { GridProps } from '@bunstack/styled-system';
import { useMemo } from 'react';

import type { BoxProps } from '../../primal';

import { StyledGrid } from './styled';
import { getTemplate } from './utils';
import React from 'react';

export interface Props extends BoxProps, GridProps {
  columns: GridProps['gridTemplateColumns'];
  rows?: GridProps['gridTemplateRows'];
  areas?: GridProps['gridTemplateAreas'];
}

const Grid = ({ children, testid, columns, rows, areas, ...rest }: Props) => {
  const getTemplateColumnsMemo = useMemo(() => getTemplate(columns), [columns]);
  const getTemplateRowsMemo = useMemo(() => getTemplate(rows), [rows]);

  return (
    <StyledGrid
      testid={`${testid}_table`}
      gridTemplateColumns={getTemplateColumnsMemo}
      gridTemplateRows={getTemplateRowsMemo}
      gridTemplateAreas={areas}
      display='grid'
      {...rest}
    >
      {children}
    </StyledGrid>
  );
};

export default Grid;
