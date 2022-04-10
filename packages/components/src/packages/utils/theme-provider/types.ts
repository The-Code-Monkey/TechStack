import { ThemeModeEnum } from './enum';

export type ColorType = Array<string> | Record<string, string>;

export type IntentsType = {
  info: ColorType;
  success: ColorType;
  warning: ColorType;
  danger: ColorType;
};

export type IThemeColorsType = {
  mode?: ThemeModeEnum;
  common: Record<string, string | ColorType>;
  modes: {
    [x in ThemeModeEnum]: {
      mode: ThemeModeEnum;
      text: string;
      highlight: string;
      highlights: ColorType;
      primary: ColorType;
      neutrals: ColorType;
      intents: IntentsType;
    };
  };
};

export interface ITheme<V extends {}> {
  colors?: IThemeColorsType;
  variants?: V;
  fonts: Record<string, string>;
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
