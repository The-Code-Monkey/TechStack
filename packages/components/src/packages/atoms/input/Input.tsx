import { css } from '@aw-web-design/styled-system';
import React, {
  useCallback,
  ChangeEvent,
  HTMLInputTypeAttribute,
  useState,
  useContext,
} from 'react';
import { ThemeContext } from 'styled-components';

import { BoxProps } from '../../primatives';
import { ITheme } from '../../utils';

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
  const theme = useContext<ITheme<unknown>>(ThemeContext);
  const [v, setValue] = useState<string | number | undefined>(value);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (onChange) onChange(event);
    },
    [onChange]
  );

  console.log(theme);

  console.log(
    css({
      ...(theme.defaultStyles.input as object),
    })()
  );

  return (
    <StyledInput
      name={name}
      placeholder={placeholder}
      value={v}
      type={type}
      onChange={handleOnChange}
      {...theme.defaultStyles.input}
      {...rest}
    />
  );
};

export default Input;
