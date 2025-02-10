import { TableFeature } from '@core-table/types';

export type SortingDirection = 'asc' | 'desc';
type SortingState = {
  columnKey: string;
  direction: SortingDirection;
};
// TODO: custom sorting 함수
export class SortingManager<TData> implements TableFeature<TData> {
  private _sortState?: SortingState;

  setSorting(columnKey: string, direction: SortingDirection) {
    this._sortState = { columnKey, direction };
  }

  private _hasSorting(): boolean {
    return !!this._sortState;
  }
  clearSorting() {
    this._sortState = undefined;
  }
  process(data: TData[]): TData[] {
    if (!this._hasSorting()) return data;
    const { columnKey, direction } = this._sortState!;
    if (!columnKey || !direction) return data;

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
