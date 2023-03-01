import { Box, Input } from '@techstack/components';
import Image from 'next/image';
import { useCallback } from 'react';

import { ImageRecordType } from '../../utils/types';

interface Props {
  field: ImageRecordType;
  handleOnChange: (e: any) => void;
  multiple?: boolean;
}

const ImageUploader = ({ field, handleOnChange, multiple = false }: Props) => {
  const handleOnClick = useCallback(() => {
    document.getElementById(`image-upload-${field.id}`)?.click();
  }, [field.id]);

  return (
    <>
      {typeof field.url === 'string' && (
        <Box
          minH='15'
          position='relative'
          flex='1'
          d='flex'
          justifyContent='space-around'
        >
          <Image
            src={field.url}
            alt={'uploaded image'}
            fill
            style={{ objectFit: 'contain' }}
            onClick={handleOnClick}
          />
        </Box>
      )}
      <Input
        name={`${field.id}`}
        onChange={handleOnChange}
        type={'file'}
        multiple={multiple}
        accept='image/*'
        hidden={!!field.url}
        id={`image-upload-${field.id}`}
      />
    </>
  );
};

export default ImageUploader;
