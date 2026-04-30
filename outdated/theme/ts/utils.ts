import { StandardProperties } from 'csstype';

type OptionalRecord<K extends string, T> = {
  [P in K]?: T;
};

export type ColorType = Array<string> | Record<string, string>;

export type IntentsType = {
  info: ColorType;
  success: ColorType;
  warning: ColorType;
  error: ColorType;
};

export type ModeThemeType = {
  mode: string;
  text: string;
  highlight: string;
  highlights: ColorType;
  primary: ColorType;
  neutrals: ColorType;
  intents: IntentsType;
};
export interface ITheme<V> {
  colors?: ModeThemeType & IThemeColorsType;
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
      | 'trBody']?: {
      [x in keyof StandardProperties]?: string;
    };
  };
  borders: Record<string, string>;
  sizes: Record<string, string>;
  space: Record<string, string>;
  [x: string]: unknown;
  defaultStyles?: OptionalRecord<string, unknown>;
}

export type IThemeColorsType = {
  mode?: string;
  common: Record<string, string | ColorType>;
  modes: {
    [x: string]: ModeThemeType;
  };
};
