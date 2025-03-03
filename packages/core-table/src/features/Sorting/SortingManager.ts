import { ColumnDef, RowDef, TableFeature } from '@core-table/types';
type SortingState = {
  columnKey: string;
  direction: SortingDirection;
};
export type SortingDirection = 'asc' | 'desc';

export interface SortingFn<TData extends RowDef> {
  (rowA: TData, rowB: TData, columnId: string): number;
}

export type SortingColumnDef<TData extends RowDef> = {
  sortingFn?: SortingFn<TData>;
  enableSorting?: boolean;
};
export class SortingManager<TData>
  implements TableFeature<TData, SortingState>
{
  private _sortState?: SortingState;
  private sortingFns?: Record<string, SortingFn<TData>>;

  constructor(sortingFns?: Record<string, SortingFn<TData>>) {
    this.sortingFns = sortingFns;
  }

  setState(sortState: SortingState) {
    this._sortState = sortState;
  }
  getState() {
    return this._sortState;
  }
  resetState() {
    this._sortState = undefined;
  }

  process(data: TData[], columns: ColumnDef<TData>[]): TData[] {
    if (!this._sortState) return data;
    const { columnKey, direction } = this._sortState;
    if (!columnKey || !direction) return data;

    const columnDef = columns.find(col => col.key === columnKey);
    const columnSortingFn = columnDef?.sortingFn;

    const sortingFn =
      columnSortingFn || (this.sortingFns && this.sortingFns[columnKey]);

    if (sortingFn) {
      return data.sort((a, b) => {
        const result = sortingFn(a, b, columnKey);
        return direction === 'asc' ? result : -result;
      });
    }

    return data.sort((a, b) => {
      const aValue = a[columnKey as keyof TData];
      const bValue = b[columnKey as keyof TData];

      if (aValue == null || bValue == null) return 0;
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
