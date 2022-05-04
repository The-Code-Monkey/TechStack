import {
  IThemeColorsType,
  ModeThemeType,
  ThemeModeEnum,
} from '@aw-web-design/components';

import common from './dist/core';
import darkMode from './dist/dark-mode';
import intents from './dist/intents';
import lightMode from './dist/light-mode';
import neutrals from './dist/neutrals';

const dark: ModeThemeType = {
  mode: ThemeModeEnum.DARK,
  text: darkMode.text,
  highlight: darkMode.highlight,
  highlights: darkMode.highlights,
  primary: darkMode.primary,
  neutrals: neutrals.neutrals.dark,
  intents: {
    info: intents.intents.info.dark,
    success: intents.intents.success.dark,
    warning: intents.intents.warning.dark,
    danger: intents.intents.danger.dark,
  },
};

const light: ModeThemeType = {
  mode: ThemeModeEnum.LIGHT,
  text: lightMode.text,
  highlight: lightMode.highlight,
  highlights: lightMode.highlights,
  primary: lightMode.primary,
  neutrals: neutrals.neutrals.light,
  intents: {
    info: intents.intents.info.light,
    success: intents.intents.success.light,
    warning: intents.intents.warning.light,
    danger: intents.intents.danger.light,
  },
};

const colors: IThemeColorsType = {
  common: common.common,
  modes: {
    [ThemeModeEnum.LIGHT]: light,
    [ThemeModeEnum.DARK]: dark,
  },
};

export default colors;
