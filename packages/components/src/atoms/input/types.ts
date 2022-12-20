import { ChangeEvent } from 'react';

import type { CheckboxProps } from './checkbox';

type DefaultProps = {
  name?: string;
  onChange?: (e: boolean | ChangeEvent<HTMLInputElement>) => void;
};

type TextInputProps = {
  value?: string | number;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'textarea' | 'tel' | 'time' | 'number' | 'date';
  defaultValue?: string;
};

export type InputPropsUnion =
  | (DefaultProps & TextInputProps)
  | (DefaultProps & CheckboxProps & { type: 'checkbox' });
