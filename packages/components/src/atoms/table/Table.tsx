import {
  flexRender,
  getCoreRowModel as getCoreRowModelFn,
  getSortedRowModel as getSortedRowModelFn,
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

  console.log(theme);

  return (
    <div ref={tableContainerRef}>
      <StyledTable defaultStyles={'table'} className={className}>
        <StyledTHead defaultStyles={'thead'}>
          {table.getHeaderGroups().map(headerGroup => (
            <StyledTr key={headerGroup.id} defaultStyles={'theadTr'}>
              {headerGroup.headers.map(header => {
                return (
                  <StyledTh
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    defaultStyles={'th'}
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
        <StyledTBody defaultStyles={'tbody'}>
          {paddingTop > 0 && (
            <StyledTr defaultStyles={'tbodyTr'}>
              <StyledTd
                style={{ height: `${paddingTop}px` }}
                defaultStyles={'td'}
              ></StyledTd>
            </StyledTr>
          )}
          {virtualRows.map(virtualRow => {
            const row = rows[virtualRow.index];
            return (
              <StyledTr defaultStyles={'tbodyTr'} key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <StyledTd key={cell.id} defaultStyles={'td'}>
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
            <StyledTr defaultStyles={'tbodyTr'}>
              <StyledTd
                defaultStyles={'td'}
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
