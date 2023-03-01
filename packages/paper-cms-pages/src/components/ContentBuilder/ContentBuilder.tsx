import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import { Box, Button } from '@techstack/components';
import { v4 as uuid } from 'uuid';

import useDB from '../../db';
import {
  ImageRecordType,
  InnerSectionType,
  isImageRecordType,
  RecordType,
} from '../../utils/types';

import InputRenderer from './InputRenderer';
import { StyledList, StyledItem } from './styled';

const blockTypes = [
  '/textarea',
  '/image',
  '/image-text',
  '/carousel',
  '/inner-section',
];

interface Props {
  content?: Array<RecordType>;
  onChange: (value: Array<RecordType>) => void;
  tid: string;
  title?: string;
}

const ContentBuilder = ({
  content = [],
  onChange,
  tid,
  title = 'unknown',
}: Props) => {
  const DB = useDB();

  const handleOnChangeType = (e: any, index: number) => {
    const newState = [...content];

    if (blockTypes.includes(e.target.value)) {
      newState[index].type = e.target.value.replace('/', '');
      delete newState[index].value;
    }

    onChange(newState);
  };

  const handleOnChange = async (e: any, index: number) => {
    const newState = [...content];

    if (
      isImageRecordType(newState[index]) &&
      (e.target.files || e.target.value.images)
    ) {
      const images = await DB.upload(
        e.target.files ?? e.target.value.images,
        `${tid}/${title}`
      );
      if (images[0].url) {
        (newState[index] as ImageRecordType).url = images[0].url;
      }
    } else {
      newState[index].value = e.target.value;
    }
    onChange(newState);
  };

  const handleContentRemove = (index: number) => () => {
    const newState = [...content];
    newState.splice(index, 1);
    onChange(newState);
  };

  const handleContentAdd = () => {
    const id = uuid();

    onChange([
      ...content,
      {
        id,
        order: content.length + 1,
      },
    ]);
  };

  const reorder = (
    list: Array<RecordType>,
    startIndex: number,
    endIndex: number
  ): Array<RecordType> => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    const newState = [...content];
    if (result.combine) {
      newState.splice(result.source.index, 1);
      onChange(newState);
      return;
    }
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }

    onChange(reorder(newState, result.source.index, result.destination.index));
  };

  return (
    <Box>
      Content builder:
      {content.length === 0 ? (
        <br />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='droppable'>
            {(provided, snapshot) => (
              <StyledList
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {content.map((field, index) => (
                  <Draggable
                    key={`${field.id}-${field.type}`}
                    draggableId={`${field.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <StyledItem
                        key={`${field.id}-${field.type}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                        style={provided.draggableProps.style}
                      >
                        <Box
                          d='flex'
                          flexDirection='row'
                          gap='5'
                          mt='3'
                          alignItems='center'
                        >
                          <InputRenderer
                            field={field}
                            handleOnChangeType={handleOnChangeType}
                            handleOnChange={handleOnChange}
                            blockTypes={blockTypes}
                            index={index}
                          />
                          {field.type === 'inner-section' &&
                          ((field as InnerSectionType).value?.length ?? 0) >
                            0 ? null : (
                            <Button
                              iconName='trash'
                              intent='error'
                              size='8'
                              alignSelf='start'
                              onClick={handleContentRemove(index)}
                            />
                          )}
                        </Box>
                      </StyledItem>
                    )}
                  </Draggable>
                ))}
              </StyledList>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <Button
        mt='2'
        iconName={'plus'}
        variant={'primary'}
        onClick={handleContentAdd}
        type='button'
        bg='neutrals.7'
      >
        Add new item
      </Button>
    </Box>
  );
};

export default ContentBuilder;
