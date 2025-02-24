import { TableFeature } from '@core-table/types';

export type SortingDirection = 'asc' | 'desc';

type SortingState = {
  columnKey: string;
  direction: SortingDirection;
};

export class SortingManager<TData> implements TableFeature<TData> {
  private _sortState?: SortingState;
  private sortingFns?: Record<
    string,
    (rowA: TData, rowB: TData, columnKey: string) => number
  >;

  constructor(
    sortingFns?: Record<
      string,
      (rowA: TData, rowB: TData, columnKey: string) => number
    >
  ) {
    this.sortingFns = sortingFns;
  }

  setSorting(sortState: SortingState) {
    this._sortState = sortState;
  }

  clearSorting() {
    this._sortState = undefined;
  }

  process(data: TData[]): TData[] {
    if (!this._sortState) return data;
    const { columnKey, direction } = this._sortState;
    if (!columnKey || !direction) return data;

    // 컬럼 정의에서 sortingFn 이름이 있을 수 있으므로, 해당 함수가 존재하면 사용
    // 여기서는 옵션으로 받은 전역 sortingFns를 사용
    const sortingFn = this.sortingFns && this.sortingFns[columnKey];
    if (sortingFn) {
      return data.sort((a, b) => {
        const result = sortingFn(a, b, columnKey);
        return direction === 'asc' ? result : -result;
      });
    }

    // sortingFns가 없거나, 해당 컬럼에 대한 함수가 없는 경우 기본 비교
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
