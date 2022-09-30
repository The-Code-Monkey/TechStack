import { TypographyProps } from '@techstack/styled-system';
import { useTranslation } from 'react-i18next';

import { generateAutomationId } from '../../utils';

import { StyledText } from './styled';

export interface Props extends TypographyProps {
  children: string;
  testid?: string;
  values?: { [x: string]: string | number };
  ns?: string;
}

const Text = ({ children, testid, values, ns, ...rest }: Props) => {
  const { t } = useTranslation();

  return (
    <StyledText data-testid={generateAutomationId(testid ?? '')} {...rest}>
      {t(children, { ns, ...values })}
    </StyledText>
  );
};

export default Text;
