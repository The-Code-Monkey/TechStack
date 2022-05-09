import { useTranslation } from 'react-i18next';

import { generateAutomationId } from '../../utils';

import { StyledText } from './styled';

export interface Props {
  children: string;
  autoid?: string;
  values?: { [x: string]: string | number };
  ns?: string;
}

const Text = ({ children, autoid, values, ns }: Props) => {
  const { t } = useTranslation();

  return (
    <StyledText data-autoid={generateAutomationId(autoid ?? '')}>
      {t(children, { ns, ...values })}
    </StyledText>
  );
};

export default Text;
