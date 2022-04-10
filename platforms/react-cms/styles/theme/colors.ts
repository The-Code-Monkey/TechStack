import { IThemeColorsType, ThemeModeEnum } from "@aw-web-design/components";

import common from "./dist/core";
import neutrals from "./dist/neutrals";
import intents from "./dist/intents";
import darkMode from "./dist/dark-mode";
import lightMode from "./dist/light-mode";

const colors: IThemeColorsType = {
  common: common.common,
  modes: {
    light: {
      mode: ThemeModeEnum.LIGHT,
      ...lightMode,
      neutrals: neutrals.neutrals.light,
      intents: {
        info: intents.intents.info.light,
        success: intents.intents.success.light,
        warning: intents.intents.warning.light,
        danger: intents.intents.danger.light,
      },
    },
    dark: {
      mode: ThemeModeEnum.DARK,
      ...darkMode,
      neutrals: neutrals.neutrals.dark,
      intents: {
        info: intents.intents.info.dark,
        success: intents.intents.success.dark,
        warning: intents.intents.warning.dark,
        danger: intents.intents.danger.dark,
      },
    },
  },
};

export default colors;
