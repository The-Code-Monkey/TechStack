import { jest } from "@jest/globals"

jest.mock("styled-components", () => {
  const actual = jest.requireActual(
    "styled-components"
  ) as typeof import("styled-components");
  const styled = actual.default;

  return Object.assign(styled, actual);
});

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));