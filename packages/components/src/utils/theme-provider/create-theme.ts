import deepMerge from 'deepmerge';

import { ThemeModeEnum } from './enum';
import { ITheme } from './types';

const arrayMerge = (_destination: any, source: any) => source;

const getActiveMode = <V extends object>(
  theme?: ITheme<V>,
  parent?: ITheme<V>,
  mode?: ThemeModeEnum
): ThemeModeEnum => {
  if (mode) return mode;
  if (theme?.colors?.mode) return theme.colors.mode;
  if (parent?.colors?.mode) return parent.colors.mode;

  return ThemeModeEnum.LIGHT;
};

const applyMode = <V extends object>(
  theme?: ITheme<V>,
  mode?: ThemeModeEnum
): ITheme<V> => {
  if (theme?.colors?.modes) {
    const colors = { ...theme.colors };

    if (mode) {
      colors.mode = mode;
    }

    if (mode && theme.colors.modes[mode]) {
      return {
        ...theme,
        colors: deepMerge<ITheme<V>['colors']>(colors, colors.modes[mode], {
          arrayMerge,
        }),
      };
    }
    if (theme.colors.modes[ThemeModeEnum.LIGHT]) {
      return {
        ...theme,
        colors: deepMerge<ITheme<V>['colors']>(
          colors,
          colors.modes[ThemeModeEnum.LIGHT],
          {
            arrayMerge,
          }
        ),
      };
    }

    return { ...theme, colors };
  }

  return theme as ITheme<V>;
};

const createTheme =
  <V extends object>(theme?: ITheme<V>, mode?: ThemeModeEnum) =>
  (parent?: any): ITheme<V> => {
    const activeMode = getActiveMode<V>(theme, parent, mode);
    const themeWithAppliedMode = applyMode<V>(theme, activeMode);
    const parentWithAppliedMode = applyMode<V>(parent, activeMode);

    if (parentWithAppliedMode && themeWithAppliedMode)
      return deepMerge<ITheme<V>>(parentWithAppliedMode, themeWithAppliedMode, {
        arrayMerge,
      });
    if (themeWithAppliedMode) return themeWithAppliedMode;
    if (parentWithAppliedMode) return parentWithAppliedMode;

    return {} as ITheme<V>;
  };

export default createTheme;
