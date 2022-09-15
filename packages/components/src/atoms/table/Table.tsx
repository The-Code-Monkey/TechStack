import {
  flexRender,
  getCoreRowModel as getCoreRowModelFn,
  getSortedRowModel as getSortedRowModelFn,
  Row,
  SortingState,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import { FC, useContext, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';
import { ThemeContext } from 'styled-components';

import { DefaultThemeWithDefaultStyles } from '../../utils';

import {
  StyledTable,
  StyledTHead,
  StyledTr,
  StyledTh,
  StyledTBody,
  StyledTd,
} from './styled';

export interface Props
  extends Omit<
    TableOptions<Record<string, unknown>>,
    'onSortingChange' | 'getCoreRowModel' | 'columns'
  > {
  className?: string;
  onRowClick?: (id: string | number) => void;
  getCoreRowModel?: TableOptions<Record<string, unknown>>['getCoreRowModel'];
  columns: Array<string>;
}

const idVariations = ['id', 'Id', 'ID'];

const Table: FC<Props> = ({
  columns,
  data,
  className,
  getCoreRowModel = getCoreRowModelFn(),
  getSortedRowModel = getSortedRowModelFn(),
}: Props) => {
  const theme = useContext<DefaultThemeWithDefaultStyles>(ThemeContext);

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns: columns.map(column =>
      idVariations.includes(column)
        ? { header: 'ID', accessorKey: column, size: 60 }
        : { header: column, accessorKey: column }
    ),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel,
    getSortedRowModel,
    debugTable: process.env.NODE_ENV !== 'PRODUCTION',
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  // const handleRowClick = useCallback(
  //   (id: number | string) => {
  //     if (onRowClick) onRowClick(id);
  //   },
  //   [onRowClick]
  // );
  //
  // const handleColumnClick = useCallback(
  //   (
  //     column:
  //       | Accessor<object>
  //       | (string & (string | Accessor<object> | undefined))
  //       | undefined
  //   ) => {
  //     console.log('Sort Column: ', column);
  //   },
  //   []
  // );

  console.log(theme.defaultStyles);

  return (
    <div ref={tableContainerRef}>
      <StyledTable {...theme.defaultStyles?.table} className={className}>
        <StyledTHead {...theme.defaultStyles?.thead}>
          {table.getHeaderGroups().map(headerGroup => (
            <StyledTr
              key={headerGroup.id}
              {...theme.defaultStyles?.tr}
              {...theme.defaultStyles?.theadTr}
            >
              {headerGroup.headers.map(header => {
                return (
                  <StyledTh
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    {...theme.defaultStyles?.th}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </StyledTh>
                );
              })}
            </StyledTr>
          ))}
        </StyledTHead>
        <StyledTBody {...theme.defaultStyles?.tbody}>
          {paddingTop > 0 && (
            <StyledTr
              {...theme.defaultStyles?.tr}
              {...theme.defaultStyles?.tbodyTr}
            >
              <StyledTd
                style={{ height: `${paddingTop}px` }}
                {...theme.defaultStyles?.td}
              ></StyledTd>
            </StyledTr>
          )}
          {virtualRows.map(virtualRow => {
            const row = rows[virtualRow.index] as Row<Record<string, any>>;
            return (
              <StyledTr
                {...theme.defaultStyles?.tr}
                {...theme.defaultStyles?.tbodyTr}
                key={row.id}
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <StyledTd key={cell.id} {...theme.defaultStyles?.td}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </StyledTd>
                  );
                })}
              </StyledTr>
            );
          })}
          {paddingBottom > 0 && (
            <StyledTr
              {...theme.defaultStyles?.tr}
              {...theme.defaultStyles?.tbodyTr}
            >
              <StyledTd
                {...theme.defaultStyles?.td}
                style={{ height: `${paddingBottom}px` }}
              />
            </StyledTr>
          )}
        </StyledTBody>
      </StyledTable>
    </div>
  );
};

export default Table;
