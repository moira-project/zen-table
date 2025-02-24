import { TableFeature } from '@core-table/types';

export type SortingDirection = 'asc' | 'desc';

type SortingState = {
  columnKey: string;
  direction: SortingDirection;
};

export interface SortingStrategy<TData> {
  sort(data: TData[], columnKey: string, direction: SortingDirection): TData[];
}
export class DefaultSortingStrategy<TData> implements SortingStrategy<TData> {
  sort(data: TData[], columnKey: string, direction: SortingDirection): TData[] {
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

export class SortingManager<TData> implements TableFeature<TData> {
  private _sortState?: SortingState;
  private strategy: SortingStrategy<TData>;

  // 생성자에서 전략을 주입할 수 있고, 기본값으로 DefaultSortingStrategy 사용
  constructor(strategy?: SortingStrategy<TData>) {
    this.strategy = strategy || new DefaultSortingStrategy<TData>();
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
    return this.strategy.sort(data, columnKey, direction);
  }
}
