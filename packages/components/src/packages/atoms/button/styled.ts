import { variant, Theme } from '@aw-web-design/styled-system';
import styled, { css } from 'styled-components';

import { Interactable, StyledBoxProps } from '../../primatives';

export const iconMargins = {
  left: {
    mr: 2,
    ml: -2,
  },
  right: {
    ml: 2,
    mr: -2,
  },
  top: {
    mb: 2,
  },
  bottom: {
    mt: 2,
  },
};

export const iconOrientations = {
  top: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
  },
  right: {
    flexDirection: 'row-reverse',
  },
};

export const ButtonVariants = (theme: Theme) => {
  if (typeof theme.variants?.buttons === 'function') {
    return variant({
      // @ts-ignore
      variants: theme.variants?.buttons(theme),
    });
  }
  return variant({
    // @ts-ignore
    variants: theme.variants?.buttons,
  });
};

export const StyledInteractable = styled(Interactable)<{ strong?: boolean }>`
  position: relative;
  display: inline-flex;
  overflow: hidden;
  min-height: ${(p) => p.theme.sizes[8]};
  -webkit-font-smoothing: antialiased;
  padding: ${(p) => p.theme.space[3]} ${(p) => p.theme.space[4]};
  cursor: pointer;
  user-select: none;
  text-align: center;
  border: none;
  border-radius: ${(p) => p.theme.radii[1]};
  outline: none;
  align-items: center;
  justify-content: center;
  ${(p) => p.strong && 'font-weight: bold;'}
  &:disabled {
    pointer-events: none;
  }
  &:focus {
    outline: none;
  }
  ${(p) => css`
    ${variant({
      prop: 'typography',
      scale: 'typography.type',
    })}
    ${ButtonVariants(p.theme)}
  `}
  ${StyledBoxProps}
`;
