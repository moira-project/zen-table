import {
  GetRowId,
  HeaderModel,
  RowDef,
  RowModel,
  TableDef,
  TableOptions,
} from '@core-table/types';

interface TableModel<TData extends RowDef> {
  options: TableOptions<TData>;
  getHeaderModel: () => HeaderModel<TData>;
  getRowModel?: () => RowModel<TData>;
  // getFooterModel:
  _getRowId: GetRowId<TData>;
}

export class TableCore<TData> implements TableModel<TData> {
  options: TableOptions<TData>;
  constructor(options: TableOptions<TData>) {
    this.options = options;
  }

  getRowModel() {
    return {
      rows: this.options.data.map((row, index) => ({
        id: this._getRowId(row, index),
        index,
        original: row,
        getCells: () =>
          this.options.columns.map(column => ({
            column,
            value: row[column.key as keyof TData],
          })),
      })),
    };
  }
  _getRowId(row: TData, index: number) {
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
