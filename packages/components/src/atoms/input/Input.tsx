import {
  useCallback,
  ChangeEvent,
  HTMLInputTypeAttribute,
  useState,
  useContext,
} from 'react';
import { ThemeContext } from 'styled-components';

import { BoxProps } from '../../primal';
import { DefaultThemeWithDefaultStyles } from '../../utils';

import { StyledInput } from './styled';

export interface Props extends BoxProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  value?: string | number;
  name: string;
  placeholder?: string;
}

const Input = ({
  onChange,
  type = 'text',
  value,
  name,
  placeholder = 'Placeholder',
  ...rest
}: Props) => {
  const theme = useContext<DefaultThemeWithDefaultStyles>(ThemeContext);
  const [v, setValue] = useState<string | number | undefined>(value);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (onChange) onChange(event);
    },
    [onChange]
  );

  return (
    <StyledInput
      name={name}
      placeholder={placeholder}
      value={v}
      type={type}
      onChange={handleOnChange}
      {...theme.defaultStyles?.input}
      {...rest}
    />
  );
};

export default Input;
