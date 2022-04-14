import cn from 'classnames';
import React, { FC, useCallback, useMemo } from 'react';
import { Accessor, TableOptions, useTable } from 'react-table';

import {
  StyledTable,
  StyledTHead,
  StyledTr,
  StyledTh,
  StyledTBody,
  StyledTd,
} from './styled';

export interface Props extends TableOptions<object> {
  className?: string;
  onRowClick?: (id: string | number) => void;
}

const Table: FC<Props> = ({ columns, data, className, onRowClick }: Props) => {
  // const theme = useContext<ITheme<unknown>>(ThemeContext);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const tableProps = useMemo(() => getTableProps(), [getTableProps]);

  const handleRowClick = useCallback(
    (id: any) => {
      if (onRowClick) onRowClick(id);
    },
    [onRowClick]
  );

  const handleColumnClick = useCallback(
    (
      column:
        | Accessor<object>
        | (string & (string | Accessor<object> | undefined))
        | undefined
    ) => {
      console.log('Sort Column: ', column);
    },
    []
  );

  return (
    <StyledTable
      {...tableProps}
      className={cn(className, tableProps.className)}
    >
      <StyledTHead>
        {headerGroups.map((headerGroup) => (
          <StyledTr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <StyledTh
                {...column.getHeaderProps()}
                onClick={() => handleColumnClick(columns[index].accessor)}
              >
                {column.render('Header')}
              </StyledTh>
            ))}
          </StyledTr>
        ))}
      </StyledTHead>
      <StyledTBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <StyledTr
              {...row.getRowProps()}
              onClick={() => handleRowClick(row.id)}
            >
              {row.cells.map((cell) => {
                return (
                  <StyledTd {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </StyledTd>
                );
              })}
            </StyledTr>
          );
        })}
      </StyledTBody>
    </StyledTable>
  );
};

export default Table;
