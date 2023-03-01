import { Box, Button, Icon, Input, Interactable } from '@techstack/components';
import { memo, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import {
  CarouselRecordType,
  DefaultRecordType,
  ImageRecordType,
  InnerSectionType,
  RecordType,
} from '../../utils/types';

import CarouselBuilder from './CarouselBuilder';
import Editor from './Editor';
import ImageUploader from './ImageUploader';
import ImageWithText from './ImageWithText';

interface Props {
  field: RecordType;
  handleOnChange: (e: any, index: number) => void;
  handleOnChangeType: (e: any, index: number) => void;
  blockTypes: Array<string>;
  index: number;
}

const InputRenderer = ({
  field,
  handleOnChange,
  handleOnChangeType,
  blockTypes,
  index,
}: Props) => {
  const onChangeType = useCallback(
    (e: any) => {
      handleOnChangeType(e, index);
    },
    [handleOnChangeType, index]
  );

  const onChange = useCallback(
    (e: any) => {
      handleOnChange(e, index);
    },
    [handleOnChange, index]
  );

  const handleOnClick = useCallback(() => {
    handleOnChange(
      {
        target: {
          value: [
            {
              id: uuid(),
              order: 0,
            },
          ],
        },
      },
      index
    );
  }, [handleOnChange, index]);

  const handleOnChangeInnerSection = useCallback(
    (e: any, innerIndex: number) => {
      const newValue = [...((field as InnerSectionType).value ?? [])];

      newValue[innerIndex].value = e.target.value;

      onChange({
        target: {
          value: newValue,
        },
      });
    },
    [field, onChange]
  );

  const handleOnChangeInnerType = useCallback(
    (e: any, innerIndex: number) => {
      const newValue = [...((field as InnerSectionType).value ?? [])];

      newValue[innerIndex].type = e.target.value.replace('/', '');
      newValue[innerIndex].value = undefined;

      onChange({
        target: {
          value: newValue,
        },
      });
    },
    [field, onChange]
  );

  const handleContentAdd = () => {
    const newField = { ...(field as InnerSectionType) };
    if (newField.value) {
      newField.value.push({
        id: uuid(),
        order: newField.value.length + 1,
      });
    }

    onChange({
      target: {
        value: newField.value,
      },
    });
  };

  const handleContentRemove = (index: number) => () => {
    console.log(index, field);
    const newState = [...((field as InnerSectionType).value ?? [])];
    newState.splice(index, 1);
    onChange({
      target: {
        value: newState,
      },
    });
  };

  const renderInput = () => {
    switch (field.type) {
      case 'carousel': {
        return (
          <CarouselBuilder
            field={field as CarouselRecordType}
            onChange={onChange}
          />
        );
      }
      case 'image-text': {
        return (
          <ImageWithText field={field as ImageRecordType} onChange={onChange} />
        );
      }
      case 'image': {
        return (
          <ImageUploader
            field={field as ImageRecordType}
            handleOnChange={onChange}
          />
        );
      }
      case 'textarea': {
        return <Editor value={field.value as string} onChange={onChange} />;
      }
      case 'inner-section': {
        field = field as InnerSectionType;

        return (field.value?.length ?? 0) > 0 ? (
          <Box d='flex' flexDir='column' flex='1' gap='6'>
            {field.value?.map((innerField, innerIndex) => (
              <Box
                d='flex'
                flexDirection='row'
                gap='5'
                mt='3'
                alignItems='center'
                key={innerField.id}
              >
                <InputRenderer
                  field={innerField}
                  handleOnChange={handleOnChangeInnerSection}
                  blockTypes={blockTypes}
                  handleOnChangeType={handleOnChangeInnerType}
                  index={innerIndex}
                />
                {innerField.type === 'inner-section' &&
                ((innerField as InnerSectionType).value?.length ?? 0) >
                  0 ? null : (
                  <Button
                    iconName='trash'
                    intent='error'
                    size='8'
                    alignSelf='start'
                    onClick={handleContentRemove(innerIndex)}
                  />
                )}
              </Box>
            ))}
            <Button
              iconName={'plus'}
              variant={'primary'}
              onClick={handleContentAdd}
              type='button'
              bg='neutrals.5'
              alignSelf='flex-start'
            >
              Add new item
            </Button>
          </Box>
        ) : (
          <Interactable
            w={'full'}
            h={'15'}
            d='flex'
            alignItems={'center'}
            justifyContent={'center'}
            onClick={handleOnClick}
          >
            <Icon name={'plussquare'} />
          </Interactable>
        );
      }
      default: {
        field = field as DefaultRecordType;

        return (
          <>
            <Input
              name={`${field.id}`}
              value={field.value}
              onChange={!field.type ? onChangeType : onChange}
              type={field.type as any}
              placeholder={!field.type ? 'Type / to select a block' : undefined}
              list={!field.type ? 'blocks' : undefined}
            />
            {!field.type && (
              <datalist id='blocks'>
                {blockTypes.map(type => (
                  <option key={type} value={type} />
                ))}
              </datalist>
            )}
          </>
        );
      }
    }
  };

  return renderInput();
};

export default memo(InputRenderer);
