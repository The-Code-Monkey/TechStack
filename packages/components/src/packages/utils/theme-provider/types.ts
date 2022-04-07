export interface ITheme {
  colors?: {
    common: Record<string, string>;
  };
  table?: {
    [x in
      | 'th'
      | 'tr'
      | 'td'
      | 'table'
      | 'thead'
      | 'tbody'
      | 'trHead'
      | 'trBody']: {
      [x: string]: Record<string, string>;
    };
  };
}
