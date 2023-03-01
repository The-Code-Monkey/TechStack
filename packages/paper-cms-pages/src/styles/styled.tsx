import { Box, BoxProps } from '@techstack/components';
import { ReactNode } from 'react';

import styled from '../workarounds/styled-components';

interface StyledMainProps extends BoxProps {
  children: ReactNode;
}

export const StyledMain = ({ children, ...rest }: StyledMainProps) => (
  <Box<'main'>
    d='flex'
    flex='1'
    p='0'
    m='0'
    w='w-16'
    flexDir='column'
    {...rest}
  >
    {children}
  </Box>
);

export const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: ${p => p.theme.sizes[10]};
  overflow-x: hidden;
  transition: width 400ms ease-in-out;

  ul {
    list-style-type: none;
  }

  li {
    transition: background-color 200ms ease-in-out;
    white-space: nowrap;

    .active,
    &:hover {
      background-color: ${p => p.theme.colors.neutrals[12]};
    }
  }

  span {
    visibility: hidden;
    margin-left: 10px;
  }

  a {
    display: flex;
    align-items: center;
    padding: ${p => p.theme.space[2]} 0 ${p => p.theme.space[2]} 0.75em;
    width: 100%;
    text-decoration: none;
    color: unset;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }

  &:hover {
    width: ${p => p.theme.sizes[15]};
    transition: width 400ms ease-in-out;

    ul {
      padding-right: 0.75em;
    }

    span {
      visibility: visible;
    }
  }
`;
