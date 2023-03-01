import { Box, Input } from '@techstack/components';

import { ImageRecordType } from '../../utils/types';

import Editor from './Editor';
import ImageUploader from './ImageUploader';
import { StyledAccordion } from './styled';

interface Props {
  field: ImageRecordType;
  onChange: (e: any) => void;
}

const ImageWithText = ({ field, onChange }: Props) => {
  const handleOnChange = (
    value: string | boolean | Array<string>,
    name: string
  ) => {
    const e = {
      target: {
        value: {
          ...(field.value ?? {}),
          [name]: value,
        },
      },
    };

    console.log(e);

    onChange(e);
  };

  const handleCheckboxOnChange = (name: string) => (e: boolean) => {
    console.log(name, e);

    handleOnChange(e, name);
  };

  const handleOnChangeImage = async (e: any) => {
    handleOnChange(e.target.files, 'images');
  };

  return (
    <Box d='flex' flexDir='column' w='full'>
      <StyledAccordion title='Settings'>
        <Box d='flex' flexDir='row' gap='5'>
          <Box pt='1'>{field.value?.img_left ? 'Right' : 'Left'} Image</Box>
          <Input
            value={field.value?.img_left ? 'checked' : 'unchecked'}
            name='img_left'
            onChange={handleCheckboxOnChange('img_left')}
            type='checkbox'
          />
        </Box>
      </StyledAccordion>
      <StyledAccordion title='Content'>
        <Box d='flex' flex='50%' flexDir='column' gap='5'>
          <ImageUploader
            field={field as ImageRecordType}
            handleOnChange={handleOnChangeImage}
          />
          <Editor
            name='content'
            value={`${field.value?.content ?? ''}`}
            onChange={e => handleOnChange(e.target.value, e.target.name)}
          />
        </Box>
      </StyledAccordion>
    </Box>
  );
};

export default ImageWithText;
