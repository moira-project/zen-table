import {
  SortingFn,
  SortingManager,
} from '@core-table/features/Sorting/SortingManager';
import {
  ColumnDef,
  HeaderModel,
  RowDef,
  RowModel,
  TableFeature,
} from '@core-table/types';

interface TableModel<TData extends RowDef> {
  options: TableOptions<TData>;
  getHeaderModel: () => HeaderModel<TData>;
  getRowModel?: () => RowModel<TData>;
  // getFooterModel:
}

interface TableOptions<TData extends RowDef> {
  data: TData[];
  columns: ColumnDef<TData>[];
  enableSorting?: boolean;
  sortingFns?: Record<string, SortingFn<TData>>;
  getRowId?: (row: TData, index: number) => string | number;
}

export class CoreTable<TData> implements TableModel<TData> {
  options: TableOptions<TData>;
  private _features: TableFeature<TData>[] = [];
  private readonly _managerMap: Record<string, () => TableFeature<TData>>;

  constructor(options: TableOptions<TData>) {
    this.options = options;
    this._managerMap = {
      enableSorting: () => new SortingManager<TData>(this.options.sortingFns),
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
  getFeatureManager<T extends TableFeature<TData>>(
    ManagerClass: new (...args: any[]) => T
  ): T | undefined {
    return this._features.find(feature => feature instanceof ManagerClass) as
      | T
      | undefined;
  }

  getRowModel() {
    let data = this.options.data;
    const columns = this.options.columns;
    for (const feature of this._features) {
      data = feature.process(data, columns);
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
