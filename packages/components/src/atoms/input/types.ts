import { ChangeEvent } from 'react';

import type { CheckboxProps } from './checkbox';

type DefaultProps = Partial<Omit<HTMLInputElement, 'list'>> & {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  list?: string;
};

type TextInputProps = {
  value?: string | number;
  placeholder?: string;
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'textarea'
    | 'tel'
    | 'time'
    | 'number'
    | 'date'
    | 'file';
  defaultValue?: string;
};

export type InputPropsUnion =
  | (DefaultProps & TextInputProps)
  | (Omit<DefaultProps, 'onChange'> & CheckboxProps & { type: 'checkbox' });
