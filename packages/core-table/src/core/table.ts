import {
  SortingManager,
  SortingStrategy,
} from '@core-table/features/SortingManager';
import { HeaderModel, RowDef, RowModel, TableFeature } from '@core-table/types';

interface TableModel<TData extends RowDef> {
  options: TableOptions<TData>;
  getHeaderModel: () => HeaderModel<TData>;
  getRowModel?: () => RowModel<TData>;
  // getFooterModel:
}
// 1. TableOptions 인터페이스에 sortingStrategy 옵션 추가
interface TableOptions<TData extends RowDef> {
  data: TData[];
  columns: { key: string }[];
  enableSorting?: boolean;
  sortingStrategy?: SortingStrategy<TData>; // 사용자 정의 정렬 전략
  getRowId?: (row: TData, index: number) => string | number;
  // 그 외 옵션들...
}

// 2. CoreTable 클래스에서 _managerMap을 수정
export class CoreTable<TData> implements TableModel<TData> {
  options: TableOptions<TData>;

  private _features: TableFeature<TData>[] = [];
  private readonly _managerMap: Record<string, () => TableFeature<TData>>;

  constructor(options: TableOptions<TData>) {
    this.options = options;
    this._managerMap = {
      // enableSorting 옵션이 true이면, options.sortingStrategy가 있다면 해당 전략을 주입
      enableSorting: () =>
        new SortingManager<TData>(this.options.sortingStrategy),
    };
    this._initializeManagers();
  }

  private _initializeManagers() {
    Object.entries(this._managerMap).forEach(([optionKey, createManager]) => {
      if (this.options[optionKey as keyof TableOptions<TData>]) {
        this._addManager(createManager);
      }
    });
  }

  private _addManager(createManager: () => TableFeature<TData>) {
    const manager = createManager();
    if (manager) this._features.push(manager);
  }

  // 특정 매니저 인스턴스를 가져오기 위한 헬퍼 메서드
  getFeatureManager<T extends TableFeature<TData>>(
    ManagerClass: new (...args: any[]) => T
  ): T | undefined {
    return this._features.find(feature => feature instanceof ManagerClass) as
      | T
      | undefined;
  }

  getRowModel() {
    let data = this.options.data;
    // 각 기능(정렬, 필터링 등)을 순차적으로 데이터에 적용
    for (const feature of this._features) {
      data = feature.process(data);
    }
    return {
      rows: data.map((row, index) => ({
        id: this._getRowId(row, index),
        index,
        rowData: row,
        getCells: () =>
          this.options.columns.map(column => ({
            column,
            value: row[column.key as keyof TData],
          })),
      })),
    };
  }

  private _getRowId(row: TData, index: number) {
    return this.options.getRowId?.(row, index) ?? index;
  }

  getHeaderModel() {
    return {
      headers: this.options.columns.map(column => ({
        id: column.key,
        column,
      })),
    };
  }
}
