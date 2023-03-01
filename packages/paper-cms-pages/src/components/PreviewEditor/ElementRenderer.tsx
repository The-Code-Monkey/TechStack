import { Carousel, CarouselProps } from '@techstack/components';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

import { RecordType, InnerSectionType } from '../../utils/types';

import { SiteThemeContext } from './context';
import InnerSection from './elements/InnerSection';
import Editor from './fields/Editor';

interface Props {
  content: Array<RecordType>;
  setContent: Dispatch<SetStateAction<RecordType[]>>;
}

const ElementRenderer = ({ content, setContent }: Props) => {
  const SiteConfig = useContext(SiteThemeContext);

  const [hoveredElement, setHoveredElement] = useState<[string, boolean]>([
    '',
    false,
  ]);

  const handleOnHoverChange = (hoveredElement: string, isTop: boolean) => {
    setHoveredElement([hoveredElement, isTop]);
  };
  const handleOnReorder = (thisId: string, thatId: string, top: boolean) => {
    const thisContentIndex = content.findIndex(item => item.id === thisId);
    const thisContent = content[thisContentIndex];
    const thatContentIndex = content.findIndex(item => item.id === thatId);
    if (top && thatContentIndex !== -1 && thisContentIndex !== -1) {
      setContent(prevState => {
        const newState = [...prevState];
        newState.splice(thisContentIndex, 1);
        newState.splice(
          thatContentIndex < thisContentIndex
            ? thatContentIndex
            : thatContentIndex - 1,
          0,
          thisContent
        );
        return newState;
      });
    } else if (!top && thatContentIndex !== -1 && thisContentIndex !== -1) {
      setContent(prevState => {
        const newState = [...prevState];
        newState.splice(thisContentIndex, 1);
        newState.splice(
          thatContentIndex < thisContentIndex
            ? thatContentIndex + 1
            : thatContentIndex,
          0,
          thisContent
        );
        return newState;
      });
    }

    handleOnHoverChange('', false);
  };
  const handleOnChangeEditor = (index: string, value: string) => {
    const contentIndex = content.findIndex(item => item.id === index);
    if (contentIndex !== -1) {
      setContent(prevState => {
        const newState = [...prevState];
        newState[contentIndex].value = value;
        return newState;
      });
    }
  };

  const handleOnChange = (index: string) => (value: any) => {
    const contentIndex = content.findIndex(item => item.id === index);
    if (contentIndex !== -1) {
      setContent(prevState => {
        const newState = [...prevState];
        newState[contentIndex].value = value;
        return newState;
      });
    }
  };

  return (
    <>
      {content.map(item => {
        switch (item.type) {
          case 'textarea': {
            return (
              <Editor
                item={item}
                styles={{ ...(SiteConfig?.styles.content ?? {}) }}
                onChange={handleOnChangeEditor}
                onHoverChange={handleOnHoverChange}
                hoveredElement={hoveredElement}
                onReorder={handleOnReorder}
              />
            );
          }
          case 'carousel': {
            return <Carousel {...(item.value as unknown as CarouselProps)} />;
          }
          case 'inner-section': {
            item = item as InnerSectionType;

            return (
              <InnerSection
                key={item.id}
                {...item}
                onChange={handleOnChange(item.id)}
                onHoverChange={handleOnHoverChange}
                hoveredElement={hoveredElement}
                onReorder={handleOnReorder}
              />
            );
          }
          default: {
            return <>{item.type}</>;
          }
        }
      })}
    </>
  );
};

export default ElementRenderer;
