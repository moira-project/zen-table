export type RowDef = unknown | object | any[];

export interface TableDef<TData extends RowDef> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export interface ColumnKeyDef<TData extends RowDef> {
  key: (string & {}) | keyof TData; // string&{} 은 리터럴 타입을 유지하기 위함.
}

export interface ColumnHeaderDef {
  header: string;
}

export interface ColumnStyleDef {
  width?: number;
}

export interface ColumnDef<TData extends RowDef, TValue = unknown>
  extends ColumnKeyDef<TData>,
    ColumnHeaderDef,
    ColumnStyleDef {}

export interface RowModel<TData extends RowDef> {
  rows: any[];
}
export interface HeaderModel<TData extends RowDef> {
  headers: any[];
}

export type RowId = string | number;
export type GetRowId<TData extends RowDef> = (
  row: TData,
  index: number
) => string | number;
export interface TableOptions<TData extends RowDef> extends TableDef<TData> {
  getRowId?: GetRowId<TData>;
}
