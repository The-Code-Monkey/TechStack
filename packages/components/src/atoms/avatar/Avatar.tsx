import { IconTypes } from '@techstack/react-feather';
import { get, TypographyProps } from '@techstack/styled-system';
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
  const { sizes } = useContext(ThemeContext);

  const memoSize = useMemo(() => get(sizes, size, '100%'), [size, sizes]);

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
      data-testid='avatar'
      {...rest}
    >
      {iconName && <Icon name={iconName} />}
      {url && (
        <img
          src={url}
          style={{ width: memoSize, height: memoSize }}
          data-testid='img'
          alt={''}
        />
      )}
      {children && (
        <Box
          zIndex='99'
          position='absolute'
          display='flex'
          justifyContent='center'
          alignItems='center'
          data-testid='initials'
        >
          <Text textAlign='center' {...typography}>
            {children
              .split(/\s/g)
              .map(s => s.substr(0, 1).toUpperCase())
              .join('')}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default memo(Avatar);
