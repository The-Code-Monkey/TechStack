import { useCallback, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.core.css';

import { DefaultRecordType } from '../../../utils/types';
import { EditorWrapper } from '../styled';

interface Props {
  item: DefaultRecordType;
  styles: Record<string, string>;
  onChange: (index: string, value: string) => void;
  onHoverChange: (hoveredElement: string, isTop: boolean) => void;
  hoveredElement: [string, boolean];
  onReorder: (thisId: string, thatId: string, top: boolean) => void;
}
const Editor = ({
  item,
  styles,
  onChange,
  onHoverChange,
  hoveredElement: [hoveredId, isTop],
  onReorder,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleOnChange = (index: string) => (value: string) => {
    onChange(index, value);
  };

  const findCorrectTarget = useCallback(
    (parentTarget: any): any => {
      return parentTarget.className.includes(item.id)
        ? parentTarget
        : findCorrectTarget(parentTarget.parentElement);
    },
    [item.id]
  );

  const handleOnDragOver = useCallback(
    (e: any) => {
      if (!isDragging) {
        e.preventDefault();
        let target = e.target;
        if (!target.className.includes(item.id)) {
          target = findCorrectTarget(target.parentElement);
        }

        const box = target.getBoundingClientRect();
        const offsetTop = e.clientY - box.top - box.height / 2;

        const id = target.className
          .split(' ')
          .find((str: string) => str.startsWith('#'))
          .split('_')[1];

        onHoverChange(id, offsetTop < 0);
      }
    },
    [findCorrectTarget, isDragging, item.id, onHoverChange]
  );

  const handleOnDragEnd = () => {
    setIsDragging(false);
    onReorder(item.id, hoveredId, isTop);
  };

  const className = `innerSection_${item.id}`;

  const isHovered = hoveredId === item.id;

  return (
    <EditorWrapper
      {...(styles ?? {})}
      draggable
      onDragOver={handleOnDragOver}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleOnDragEnd}
      className={`#${className}`}
      isTop={isTop}
      isHovered={isHovered}
    >
      <ReactQuill
        theme={false as any}
        value={item.value}
        onChange={handleOnChange(item.id)}
      />
    </EditorWrapper>
  );
};

export default Editor;
