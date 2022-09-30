import { useCallback, ChangeEvent, useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { BoxProps } from '../../primal';
import { DefaultThemeWithDefaultStyles } from '../../utils';

import Checkbox from './checkbox';
import { StyledInput } from './styled';
import { InputPropsUnion } from './types';

export interface Props extends BoxProps {
  name: string;
  onChange?: () => void;
}

const Input = ({
  onChange,
  type = 'text',
  value,
  name,
  ...rest
}: Props & InputPropsUnion) => {
  const theme = useContext<DefaultThemeWithDefaultStyles>(ThemeContext);
  const [v, setValue] = useState<string | number | undefined>(value);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (onChange) onChange(event);
    },
    [onChange]
  );

  const renderInput = useCallback(
    (type: InputPropsUnion['type']) => {
      switch (type) {
        case 'checkbox': {
          return (
            <Checkbox
              name={name}
              {...theme.defaultStyles?.checkbox}
              {...rest}
            />
          );
        }
        default: {
          return (
            <StyledInput
              name={name}
              value={v}
              type={type}
              onChange={handleOnChange}
              {...theme.defaultStyles?.input}
              {...rest}
            />
          );
        }
      }
    },
    [type]
  );

  return renderInput(type);
};

export default Input;
