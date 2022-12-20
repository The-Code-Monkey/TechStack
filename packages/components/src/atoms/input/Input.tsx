import {
  useCallback,
  useState,
  useContext,
  ChangeEvent,
  useEffect,
} from 'react';
import { ThemeContext } from 'styled-components';

import { BoxProps } from '../../primal';
import { DefaultThemeWithDefaultStyles } from '../../utils';

import Checkbox from './checkbox';
import { StyledInput } from './styled';
import { InputPropsUnion } from './types';

export type Props = BoxProps & InputPropsUnion;

const Input = ({ onChange, type, value, name, ...rest }: Props) => {
  const theme = useContext<DefaultThemeWithDefaultStyles>(ThemeContext);
  const [v, setValue] = useState<string | number | undefined | unknown>();

  const handleOnChange = useCallback(
    (event: boolean | ChangeEvent<HTMLInputElement>) => {
      if (typeof event !== 'boolean') {
        setValue(event.target.value);
      } else {
        setValue(event);
      }
      if (onChange) onChange(event);
    },
    [onChange, value]
  );

  useEffect(() => {
    if (value !== v) {
      setValue(value);
    }
  }, [value]);

  const renderInput = useCallback(
    (type: InputPropsUnion['type']) => {
      switch (type) {
        case 'checkbox': {
          return (
            <Checkbox
              name={name}
              value={value}
              onChange={handleOnChange}
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
    [type, value]
  );

  return renderInput(type);
};

export default Input;
