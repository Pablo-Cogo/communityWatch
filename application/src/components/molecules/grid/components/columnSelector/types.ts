export interface ColumnsSelectorProps {
  gridId: string;
}

export interface ColumnsSelectorType<T> {
  name: string;
  column: keyof T;
  show: boolean;
}
