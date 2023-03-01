import styled, { css } from '../../../workarounds/styled-components';

export const StyledSection = styled.section<{
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

  &:hover {
    border: ${p => p.theme.borders[1]} ${p => p.theme.colors.highlights[0]};
  }
`;
