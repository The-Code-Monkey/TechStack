import React, {
  FC,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';

import { Button } from '../../atoms';
import { Box, BoxProps } from '../../primatives';
import { ITheme } from '../../utils';

import { StyledAccordion } from './styled';

export interface Props extends BoxProps {
  open?: boolean;
  title: string;
  children: ReactNode;
  maxHeight?: number;
  time?: number;
}

const Accordion: FC<PropsWithChildren<Props>> = ({
  open = false,
  children,
  title,
  maxHeight = 50,
  time = 200,
  ...rest
}: PropsWithChildren<Props>) => {
  const theme = useContext<ITheme>(ThemeContext);
  const [isOpen, setIsOpen] = useState(open);

  return (
    <StyledAccordion
      open={isOpen}
      max={maxHeight}
      time={time}
      bgColor="neutrals.6"
      {...theme.defaultStyles.accordion.accordion}
      {...rest}
    >
      <Button
        bgColor="transparent"
        h="12"
        w="full"
        strong
        iconName="Plus"
        justifyContent="flex-start"
        className="accordion"
        onClick={() => setIsOpen((prevState) => !prevState)}
        {...theme.defaultStyles.accordion.button}
      >
        {title}
      </Button>
      <Box
        className="panel"
        bgColor="neutrals.4"
        {...theme.defaultStyles.accordion.panel}
      >
        <p>{children}</p>
      </Box>
    </StyledAccordion>
  );
};

export default Accordion;
