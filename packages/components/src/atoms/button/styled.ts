import { variant } from '@techstack/styled-system';

import { Interactable, StyledBoxProps } from '../../primal';
import { default as styled } from '../../workarounds/styled-components';

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

export const StyledInteractable = styled(Interactable)<{ strong?: boolean }>`
  position: relative;
  display: inline-flex;
  overflow: hidden;
  min-height: ${p => p.theme.sizes[8]};
  -webkit-font-smoothing: antialiased;
  padding: ${p => p.theme.space[3]} ${p => p.theme.space[4]};
  cursor: pointer;
  user-select: none;
  text-align: center;
  border: none;
  border-radius: ${p => p.theme.radii[1]};
  outline: none;
  align-items: center;
  justify-content: center;
  ${p => p.strong && 'font-weight: bold;'}
  &:focus {
    outline: none;
  }
  ${variant({
    prop: 'typography',
    key: 'typography.type',
  })}
  ${variant({
    key: 'buttons.variants',
  })}
  ${variant({
    key: 'buttons.size',
    prop: 'size',
  })}
  ${variant({
    prop: 'intent',
    key: 'buttons.intents',
  })}
  ${StyledBoxProps}
`;
