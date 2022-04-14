import React, {
  useCallback,
  ChangeEvent,
  HTMLInputTypeAttribute,
  useState,
} from 'react';

import { BoxProps } from '../../primatives';

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
  // const theme = useContext<ITheme<unknown>>(ThemeContext);
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
      {...rest}
    />
  );
};

export default Input;
