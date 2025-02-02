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
