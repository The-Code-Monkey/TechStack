export const AuthPages = {
  signIn: '/auth/signin',
};

export type FieldType = {
  column_name: string;
  data_type:
    | 'text'
    | 'textarea'
    | 'number'
    | 'object'
    | 'date'
    | 'array'
    | 'checkbox';
};

export type FieldsType = Array<FieldType>;
