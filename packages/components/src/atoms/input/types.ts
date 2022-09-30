import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

import type { CheckboxProps } from './checkbox';

type InputProps = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  type: 'text';
};

export type InputPropsUnion =
  | InputProps
  | (
      | (CheckboxProps & { type: 'checkbox'; value?: undefined })
      | (Omit<InputProps, 'type'> & {
          type?: Omit<HTMLInputTypeAttribute, 'text' | 'checkbox'>;
        })
    );
