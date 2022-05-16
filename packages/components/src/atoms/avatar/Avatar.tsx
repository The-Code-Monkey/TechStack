import { IconTypes } from '@aw-web-design/react-feather';
import { get, TypographyProps } from '@aw-web-design/styled-system';
import { memo, useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';

import { Box, Icon, BoxProps, Text } from '../../primal';

export interface Props extends BoxProps {
  iconName?: IconTypes;
  url?: string;
  children?: string;
  size?: string | number;
  typography?: TypographyProps;
}

export const Avatar = ({
  iconName,
  url,
  children,
  size = 10,
  typography,
  ...rest
}: Props) => {
  const { space } = useContext(ThemeContext);

  const memoSize = useMemo(() => get(space, size, size), [size, space]);

  return (
    <Box
      size={size}
      overflow='hidden'
      borderRadius={5}
      bg='neutrals.8'
      display='flex'
      justifyContent='center'
      alignItems='center'
      border='1'
      borderColor='common.black'
      {...rest}
    >
      {iconName && <Icon name={iconName} />}
      {url && <img src={url} width={memoSize} height={memoSize} />}
      {children && (
        <Text textAlign='center' {...typography}>
          {children
            .split(/\s/g)
            .map(s => s.substr(0, 1).toUpperCase())
            .join('')}
        </Text>
      )}
    </Box>
  );
};

export default memo(Avatar);
