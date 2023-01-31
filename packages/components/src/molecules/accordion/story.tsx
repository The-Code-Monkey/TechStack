import Accordion from './index';

export default {
  title: 'Components / Molecules / Accordion',
  component: Accordion,
};

export const story = () => <Accordion title='Title'>This is a test</Accordion>;

export const MultiDeep = () => <Accordion title='Level 1'>Level 1<Accordion title='Level 2'>Level 2<Accordion title='Level 3'>Level 3</Accordion></Accordion></Accordion>
