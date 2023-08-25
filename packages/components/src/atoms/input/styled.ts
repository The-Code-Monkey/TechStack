import { StyledBoxProps } from '../../primal';
import { default as styled } from '../../workarounds/styled-components';

export const StyledInput = styled.input`
  ${StyledBoxProps}

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

export const StyledTextArea = styled.textarea`
  ${StyledBoxProps}
`;
