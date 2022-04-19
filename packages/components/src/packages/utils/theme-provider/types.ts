import { StandardProperties } from 'csstype';

import { ThemeModeEnum } from './enum';

export type ColorType = Array<string> | Record<string, string>;

export type IntentsType = {
  info: ColorType;
  success: ColorType;
  warning: ColorType;
  danger: ColorType;
};

export type ModeThemeType = {
  mode: ThemeModeEnum;
  text: string;
  highlight: string;
  highlights: ColorType;
  primary: ColorType;
  neutrals: ColorType;
  intents: IntentsType;
};

export type IThemeColorsType = {
  mode?: ThemeModeEnum;
  common: Record<string, string | ColorType>;
  modes: {
    [x in ThemeModeEnum]: ModeThemeType;
  };
};

export interface ITheme<V extends unknown = unknown> {
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
  [x: string]: any;
  defaultStyles: Record<
    string,
    Record<string, string | Record<string, string>>
  >;
}
