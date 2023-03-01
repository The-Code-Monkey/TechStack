import { Accordion, Box, Button } from '@techstack/components';
import { v4 as uuid } from 'uuid';

import { RecordType } from '../../utils/types';

interface Props {
  onAddElement: (element: RecordType, index: number) => void;
}

const ElementsAside = ({ onAddElement }: Props) => {
  const handleOnAddElement = (name: string) => () => {
    const id = uuid();

    switch (name) {
      case 'basic:innerSection': {
        onAddElement(
          {
            id,
            type: 'inner-section',
            value: [],
            order: 0,
          },
          0
        );
        break;
      }
      default: {
        onAddElement(
          {
            id,
            type: 'textarea',
            order: 0,
          },
          0
        );
      }
    }
  };

  return (
    <Box w='280px'>
      <Box>Elements:</Box>
      <Accordion title={'Basic'}>
        <Box d='flex' flexDir='row' flexWrap='wrap' gap='3'>
          <Button flex='40%' onClick={handleOnAddElement('basic:innerSection')}>
            Inner Section
          </Button>
          <Button flex='40%' onClick={handleOnAddElement('basic:heading')}>
            Heading
          </Button>
          <Button flex='40%' onClick={handleOnAddElement('basic:image')}>
            Image
          </Button>
          <Button flex='40%' onClick={handleOnAddElement('basic:textEditor')}>
            Text Editor
          </Button>
          <Button flex='40%' onClick={handleOnAddElement('basic:video')}>
            Video
          </Button>
          <Button flex='40%' onClick={handleOnAddElement('basic:divider')}>
            Divider
          </Button>
          <Button flex='40%' onClick={handleOnAddElement('basic:spacer')}>
            Spacer
          </Button>
          <Button flex='40%' onClick={handleOnAddElement('basic:gMaps')}>
            Google Maps
          </Button>
          <Button flex='40%' onClick={handleOnAddElement('basic:icon')}>
            Icon
          </Button>
        </Box>
      </Accordion>
    </Box>
  );
};

export default ElementsAside;
