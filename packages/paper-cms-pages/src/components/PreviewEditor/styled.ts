import { Interactable, StyledBoxProps } from '@techstack/components';

import styled, { css } from '../../workarounds/styled-components';

export const EditorWrapper = styled(Interactable)<{
  isTop: boolean;
  isHovered: boolean;
}>`
  transition-property: border-top-width, border-bottom-width;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  border-color: ${p => p.theme.colors.highlights[0]};
  border-width: 0;
  border-style: solid;

  ${p =>
    p.isHovered &&
    css`
      ${p.isTop
        ? css`
            border-top-width: 5px;
          `
        : css`
            border-bottom-width: 5px;
          `};
    `};

  .wmde-markdown {
    ${StyledBoxProps as any}
  }
`;
