import { FC, PropsWithChildren, ReactNode, useState } from 'react';

import { Button } from '../../atoms';
import { Box } from '../../primal';

import { StyledAccordion } from './styled';

export interface Props {
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
  maxHeight = 999999,
  time = 200,
}: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <StyledAccordion max={maxHeight} time={time}>
      <Button
        bg='neutrals.4'
        h='12'
        w='full'
        strong
        iconName='plus'
        justifyContent='flex-start'
        className='accordion'
        onClick={() => setIsOpen(prevState => !prevState)}
      >
        {title}
      </Button>
      <Box className='panel' maxH={isOpen ? `${maxHeight}px` : '0'}>
        <p>{children}</p>
      </Box>
    </StyledAccordion>
  );
};

export default Accordion;
