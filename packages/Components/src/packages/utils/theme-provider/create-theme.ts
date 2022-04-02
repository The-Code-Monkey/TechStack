import deepMerge from 'deepmerge';

import { ThemeModeEnum } from './enum';
import { ITheme } from './types';

const arrayMerge = (_destination: any, source: any) => source;

export type ThemeType = {
  colors: { mode: any; modes: Record<ThemeModeEnum, any> };
};

const getActiveMode = (
  theme?: ThemeType,
  parent?: ThemeType,
  mode?: ThemeModeEnum
) => {
  if (mode) return mode;
  if (theme && theme.colors && theme.colors.mode) return theme.colors.mode;
  if (parent && parent.colors && parent.colors.mode) return parent.colors.mode;

  return ThemeModeEnum.LIGHT;
};

const applyMode = (theme?: ThemeType, mode?: ThemeModeEnum): ITheme => {
  if (theme && theme.colors && theme.colors.modes) {
    const colors = { ...theme.colors, mode };

    if (mode && theme.colors.modes[mode]) {
      return {
        ...theme,
        colors: deepMerge(colors, colors.modes[mode], {
          arrayMerge,
        }) as unknown as ITheme['colors'],
      };
    }
    if (theme.colors.modes[ThemeModeEnum.LIGHT]) {
      return {
        ...theme,
        colors: deepMerge(colors, colors.modes[ThemeModeEnum.LIGHT], {
          arrayMerge,
        }) as unknown as ITheme['colors'],
      };
    }

    return { ...theme, colors: colors as unknown as ITheme['colors'] };
  }

  return theme as unknown as ITheme;
};

const createTheme =
  (theme?: ThemeType, mode?: ThemeModeEnum) =>
  (parent?: any): ITheme => {
    const activeMode = getActiveMode(theme, parent, mode);
    const themeWithAppliedMode = applyMode(theme, activeMode);
    const parentWithAppliedMode = applyMode(parent, activeMode);

    if (parentWithAppliedMode && themeWithAppliedMode)
      return deepMerge(parentWithAppliedMode, themeWithAppliedMode, {
        arrayMerge,
      }) as unknown as ITheme;
    if (themeWithAppliedMode) return themeWithAppliedMode;
    if (parentWithAppliedMode) return parentWithAppliedMode;

    return {};
  };

export default createTheme;
