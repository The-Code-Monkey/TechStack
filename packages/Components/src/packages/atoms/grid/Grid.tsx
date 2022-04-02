import React, { useMemo } from 'react';
import { GridProps } from '@aw-web-design/styled-system';

import { BoxProps } from '../../primatives';

import { StyledGrid } from './styled';
import { getTemplate } from './utils';

export interface Props extends BoxProps, GridProps {
  columns: GridProps['gridTemplateColumns'];
  rows?: GridProps['gridTemplateRows'];
  areas?: GridProps['gridTemplateAreas'];
}

const Grid = ({ children, autoid, columns, rows, areas, ...rest }: Props) => {
  const getTemplateColumnsMemo = useMemo(() => getTemplate(columns), [columns]);
  const getTemplateRowsMemo = useMemo(() => getTemplate(rows), [rows]);

  return (
    <StyledGrid
      autoid={`${autoid}_table`}
      gridTemplateColumns={getTemplateColumnsMemo}
      gridTemplateRows={getTemplateRowsMemo}
      gridTemplateAreas={areas}
      display="grid"
      {...rest}
    >
      {children}
    </StyledGrid>
  );
};

export default Grid;
