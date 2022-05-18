import { TypographyProps } from '@aw-web-design/styled-system';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { generateAutomationId } from '../../utils';

import { StyledText } from './styled';

export interface Props extends TypographyProps {
  children: ReactNode;
  autoid?: string;
  values?: { [x: string]: string | number };
  ns?: string;
}

const Text = ({ children, autoid, values, ns, ...rest }: Props) => {
  const { t } = useTranslation();

  return (
    <StyledText data-autoid={generateAutomationId(autoid ?? '')} {...rest}>
      {typeof children === 'string' ? t(children, { ns, ...values }) : children}
    </StyledText>
  );
};

export default Text;
