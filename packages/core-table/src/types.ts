export type Row = unknown | object | any[];

export interface Table<TData extends Row> {
  columns: Column<TData>[];
  data: TData[];
}

export interface ColumnKey<TData extends Row> {
  key: (string & {}) | keyof TData; // string&{} 은 리터럴 타입을 유지하기 위함.
}

export interface ColumnHeader {
  header: string;
}

export interface ColumnStyle {
  width?: number;
}

export interface Column<TData extends Row, TValue = unknown>
  extends ColumnKey<TData>,
    ColumnHeader,
    ColumnStyle {}
