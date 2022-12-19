import { ChangeEvent } from 'react';

import type { CheckboxProps } from './checkbox';
import type { DateProps } from './date';
import type { DateTimeProps } from './date-time';

type DefaultProps = {
  name?: string;
  onChange?: (e: boolean | ChangeEvent<HTMLInputElement>) => void;
};

type TextInputProps = {
  value?: string | number;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'textarea' | 'tel' | 'time' | 'number';
  defaultValue?: string;
};

export type InputPropsUnion =
  | (DefaultProps & TextInputProps)
  | (DefaultProps & CheckboxProps & { type: 'checkbox' })
  | (DefaultProps & DateProps & { type: 'date' })
  | (DefaultProps & DateTimeProps & { type: 'date-time' });
