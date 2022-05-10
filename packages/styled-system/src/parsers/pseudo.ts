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

const pseudoConfig: SystemConfig<keyof typeof pseudoSelectors> = {
  _hover: {
    properties: pseudoSelectors._hover,
  },
  _active: {
    properties: pseudoSelectors._active,
  },
  _focus: {
    properties: pseudoSelectors._focus,
  },
  _highlighted: {
    properties: pseudoSelectors._highlighted,
  },
  _focusWithin: {
    properties: pseudoSelectors._focusWithin,
  },
  _focusVisible: {
    properties: pseudoSelectors._focusVisible,
  },
  _disabled: {
    properties: pseudoSelectors._disabled,
  },
  _readOnly: {
    properties: pseudoSelectors._readOnly,
  },
  _before: {
    properties: pseudoSelectors._before,
  },
  _after: {
    properties: pseudoSelectors._after,
  },
  _empty: {
    properties: pseudoSelectors._empty,
  },
  _expanded: {
    properties: pseudoSelectors._expanded,
  },
  _checked: {
    properties: pseudoSelectors._checked,
  },
  _grabbed: {
    properties: pseudoSelectors._grabbed,
  },
  _pressed: {
    properties: pseudoSelectors._pressed,
  },
  _invalid: {
    properties: pseudoSelectors._invalid,
  },
  _valid: {
    properties: pseudoSelectors._valid,
  },
  _loading: {
    properties: pseudoSelectors._loading,
  },
  _selected: {
    properties: pseudoSelectors._selected,
  },
  _hidden: {
    properties: pseudoSelectors._hidden,
  },
  _autofill: {
    properties: pseudoSelectors._autofill,
  },
  _even: {
    properties: pseudoSelectors._even,
  },
  _odd: {
    properties: pseudoSelectors._odd,
  },
  _first: {
    properties: pseudoSelectors._first,
  },
  _last: {
    properties: pseudoSelectors._last,
  },
  _notFirst: {
    properties: pseudoSelectors._notFirst,
  },
  _notLast: {
    properties: pseudoSelectors._notLast,
  },
  _visited: {
    properties: pseudoSelectors._visited,
  },
  _activeLink: {
    properties: pseudoSelectors._activeLink,
  },
  _indeterminate: {
    properties: pseudoSelectors._indeterminate,
  },
  _placeholder: {
    properties: pseudoSelectors._placeholder,
  },
  _fullScreen: {
    properties: pseudoSelectors._fullScreen,
  },
  _selection: {
    properties: pseudoSelectors._selection,
  },
};

export const pseudo = system(pseudoConfig);
