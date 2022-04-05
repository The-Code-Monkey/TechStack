import deepMerge from "deepmerge";

import { ThemeModeEnum } from "./enum";

const arrayMerge = (destination, source) => source;

const getActiveMode = (theme, parent, mode) => {
  if (mode) return mode;
  if (theme && theme.colors && theme.colors.mode) return theme.colors.mode;
  if (parent && parent.colors && parent.colors.mode) return parent.colors.mode;

  return ThemeModeEnum.LIGHT;
};

const applyMode = (theme, mode) => {
  if (theme && theme.colors && theme.colors.modes) {
    const colors = { ...theme.colors, mode };

    if (theme.colors.modes[mode]) {
      return {
        ...theme,
        colors: deepMerge(colors, colors.modes[mode], { arrayMerge }),
      };
    }
    if (theme.colors.modes[ThemeModeEnum.LIGHT]) {
      return {
        ...theme,
        colors: deepMerge(colors, colors.modes[ThemeModeEnum.LIGHT], {
          arrayMerge,
        }),
      };
    }

    return { ...theme, colors };
  }

  return theme;
};

const createTheme = (theme?: any, mode?: ThemeModeEnum) => (parent?: any) => {
  const activeMode = getActiveMode(theme, parent, mode);
  const themeWithAppliedMode = applyMode(theme, activeMode);
  const parentWithAppliedMode = applyMode(parent, activeMode);

  if (parentWithAppliedMode && themeWithAppliedMode)
    return deepMerge(parentWithAppliedMode, themeWithAppliedMode, {
      arrayMerge,
    });
  if (themeWithAppliedMode) return themeWithAppliedMode;
  if (parentWithAppliedMode) return parentWithAppliedMode;

  return {};
};

export default createTheme;
