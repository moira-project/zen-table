import { SortingManager } from '@core-table/features/SortingManager';
import {
  HeaderModel,
  RowDef,
  RowModel,
  TableFeature,
  TableOptions,
} from '@core-table/types';

interface TableModel<TData extends RowDef> {
  options: TableOptions<TData>;
  getHeaderModel: () => HeaderModel<TData>;
  getRowModel?: () => RowModel<TData>;
  // getFooterModel:
}

export class CoreTable<TData> implements TableModel<TData> {
  options: TableOptions<TData>;
  private readonly _managerMap: Record<string, () => TableFeature<TData>>;
  private _features: TableFeature<TData>[] = [];
  constructor(options: TableOptions<TData>) {
    this.options = options;
    this._managerMap = {
      enableSorting: () => new SortingManager<TData>(),
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
  getRowModel() {
    let data = this.options.data;
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
