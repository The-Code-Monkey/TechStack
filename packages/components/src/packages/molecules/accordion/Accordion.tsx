import React, {FC, PropsWithChildren, ReactNode, useState} from "react";

import {StyledAccordion} from "./styled";
import {Box} from "../../primatives";
import {Button} from "../../atoms";

export interface Props {
    open?: boolean;
    title: string;
    children: ReactNode;
    maxHeight?: number;
    time?: number;
}

const Accordion: FC<PropsWithChildren<Props>> = ({ open = false, children, title, maxHeight = 50, time = 200 }: PropsWithChildren<Props>) => {
    const [isOpen, setIsOpen] = useState(open);
    return (
        <StyledAccordion open={isOpen} max={maxHeight} time={time}>
            <Button bg="neutrals.4" h="12" w="full" strong iconName="Plus" justifyContent="flex-start" className="accordion" onClick={() => setIsOpen(prevState => !prevState)}>{title}</Button>
            <Box className="panel">
                <p>{children}</p>
            </Box>
        </StyledAccordion>
    );
}

export default Accordion;