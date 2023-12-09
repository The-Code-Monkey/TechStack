export type DataTypeSingle =
  | string
  | boolean
  | number
  | [unknown]
  | Record<string, unknown>
  | undefined;

export type DataTypeArray = Array<Record<string, DataTypeSingle>>;

export type DefaultFieldType = {
  name: string;
};

export type TextFieldType = DefaultFieldType & {
  type: 'text';
};

export type FieldType = TextFieldType;
