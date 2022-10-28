import { ObjectOrArray, system, SystemConfig } from '../core';
import { RequiredTheme, ResponsiveValue, Theme, ThemeValue } from '../types';
import { pseudoSelectors } from '../utils';

export interface PseudoProps<
  ThemeType extends Theme = RequiredTheme,
  TVal = ThemeValue<keyof ThemeType, ThemeType>
> {
  _hover?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _active?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _focus?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _highlighted?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _focusWithin?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _focusVisible?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _disabled?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _readOnly?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _before?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _after?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _empty?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _expanded?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _checked?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _grabbed?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _pressed?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _invalid?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _valid?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _loading?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _selected?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _hidden?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _autofill?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _even?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _odd?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _first?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _last?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _notFirst?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _notLast?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _visited?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _activeLink?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _indeterminate?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _placeholder?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _fullScreen?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
  _selection?: ObjectOrArray<ResponsiveValue<TVal, ThemeType>>;
}

export const pseudoConfig: SystemConfig<keyof typeof pseudoSelectors> = {
  _hover: {
    properties: pseudoSelectors._hover as any,
    transform: (scale, path, fallback) => {
      console.log(scale, path, fallback);
      return path;
    },
  },
  _active: {
    properties: pseudoSelectors._active as any,
  },
  _focus: {
    properties: pseudoSelectors._focus as any,
  },
  _highlighted: {
    properties: pseudoSelectors._highlighted as any,
  },
  _focusWithin: {
    properties: pseudoSelectors._focusWithin as any,
  },
  _focusVisible: {
    properties: pseudoSelectors._focusVisible as any,
  },
  _disabled: {
    properties: pseudoSelectors._disabled as any,
  },
  _readOnly: {
    properties: pseudoSelectors._readOnly as any,
  },
  _before: {
    properties: pseudoSelectors._before as any,
  },
  _after: {
    properties: pseudoSelectors._after as any,
  },
  _empty: {
    properties: pseudoSelectors._empty as any,
  },
  _expanded: {
    properties: pseudoSelectors._expanded as any,
  },
  _checked: {
    properties: pseudoSelectors._checked as any,
  },
  _grabbed: {
    properties: pseudoSelectors._grabbed as any,
  },
  _pressed: {
    properties: pseudoSelectors._pressed as any,
  },
  _invalid: {
    properties: pseudoSelectors._invalid as any,
  },
  _valid: {
    properties: pseudoSelectors._valid as any,
  },
  _loading: {
    properties: pseudoSelectors._loading as any,
  },
  _selected: {
    properties: pseudoSelectors._selected as any,
  },
  _hidden: {
    properties: pseudoSelectors._hidden as any,
  },
  _even: {
    properties: pseudoSelectors._even as any,
  },
  _odd: {
    properties: pseudoSelectors._odd as any,
  },
  _first: {
    properties: pseudoSelectors._first as any,
  },
  _last: {
    properties: pseudoSelectors._last as any,
  },
  _notFirst: {
    properties: pseudoSelectors._notFirst as any,
  },
  _notLast: {
    properties: pseudoSelectors._notLast as any,
  },
  _visited: {
    properties: pseudoSelectors._visited as any,
  },
  _activeLink: {
    properties: pseudoSelectors._activeLink as any,
  },
  _indeterminate: {
    properties: pseudoSelectors._indeterminate as any,
  },
  _placeholder: {
    properties: pseudoSelectors._placeholder as any,
  },
  _fullScreen: {
    properties: pseudoSelectors._fullScreen as any,
  },
  _selection: {
    properties: pseudoSelectors._selection as any,
  },
};

export const pseudo = system(pseudoConfig);
