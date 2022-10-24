import { ChangeEvent } from 'react';

import type { CheckboxProps } from './checkbox';

type DefaultProps = {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement> | boolean) => void;
};

type TextInputProps = {
  value?: string | number;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
};

export type InputPropsUnion = DefaultProps &
  (TextInputProps | (CheckboxProps & { type: 'checkbox' }));
