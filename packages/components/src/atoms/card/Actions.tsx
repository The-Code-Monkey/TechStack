import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Box, BoxProps } from '../../primal';
import { DefaultThemeWithDefaultStyles } from '../../utils';

export type Props = BoxProps;
export const Actions = ({ children, ...rest }: Props) => {
  const theme = useContext<DefaultThemeWithDefaultStyles>(ThemeContext);
  return (
    <Box {...theme.defaultStyles?.cardActions} {...rest}>
      {children}
    </Box>
  );
};

export default Actions;
