export type DataTypeSingle =
  | string
  | boolean
  | number
  | [unknown]
  | Record<string, unknown>
  | undefined;

export type DataTypeArray = Array<Record<string, DataTypeSingle>>;
