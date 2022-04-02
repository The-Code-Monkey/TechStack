import React from 'react';

import { generateAutomationId } from '../../utils';

import { StyledText } from './styled';

export interface Props {
  children: string;
  autoid?: string;
}

const Text = ({ children, autoid }: Props) => (
  <StyledText data-autoid={generateAutomationId(autoid ?? '')}>
    {children}
  </StyledText>
);

export default Text;
