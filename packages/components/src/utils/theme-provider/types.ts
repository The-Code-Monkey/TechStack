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

type OptionalRecord<K extends string, T> = {
  [P in K]?: T;
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
