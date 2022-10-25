import type { CheckboxProps } from './checkbox';

type DefaultProps = {
  name?: string;
  onChange?: (e: any) => void;
};

type TextInputProps = {
  value?: string | number;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
};

export type InputPropsUnion = (DefaultProps & TextInputProps) | (Omit<DefaultProps, 'onChange'> & CheckboxProps & { type: 'checkbox'});
