import React, { useCallback, useContext, useMemo } from 'react';
import cn from 'classnames';
import { Accessor, TableOptions, useTable } from 'react-table';
import { ThemeContext } from 'styled-components';

import { ITheme } from '../../utils/theme-provider/types';

import {
  StyledTable,
  StyledTHead,
  StyledTr,
  StyledTh,
  StyledTBody,
  StyledTd,
} from './styled';

export interface Props extends TableOptions<object> {
  className: string;
  onRowClick?: (id: string | number) => void;
}

const Table = ({ columns, data, className, onRowClick }: Props) => {
  const theme = useContext<ITheme>(ThemeContext);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const tableProps = useMemo(() => getTableProps(), [getTableProps]);

  const handleRowClick = useCallback(
    (id) => {
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
      {...theme.table?.table}
      className={cn(className, tableProps.className)}
    >
      <StyledTHead {...theme.table?.thead}>
        {headerGroups.map((headerGroup) => (
          <StyledTr
            {...headerGroup.getHeaderGroupProps()}
            {...theme.table?.tr}
            {...theme.table?.trHead}
          >
            {headerGroup.headers.map((column, index) => (
              <StyledTh
                {...column.getHeaderProps()}
                {...theme.table?.th}
                onClick={() => handleColumnClick(columns[index].accessor)}
              >
                {column.render('Header')}
              </StyledTh>
            ))}
          </StyledTr>
        ))}
      </StyledTHead>
      <StyledTBody {...getTableBodyProps()} {...theme.table?.tbody}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <StyledTr
              {...row.getRowProps()}
              {...theme.table?.tr}
              {...theme.table?.trBody}
              onClick={() => handleRowClick(row.id)}
            >
              {row.cells.map((cell) => {
                return (
                  <StyledTd {...cell.getCellProps()} {...theme.table?.td}>
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
