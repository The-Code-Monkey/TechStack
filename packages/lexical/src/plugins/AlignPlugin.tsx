import { useRef, useState, ReactNode, useEffect, useCallback } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ChevronDown,
} from '@techstack/react-feather';
import { $findMatchingParent, mergeRegister } from '@lexical/utils';
import { $isLinkNode } from '@lexical/link';

import { LowPriority } from '../utils/priorities';
import getSelectedNode from '../utils/getSelectedNode';

const ELEMENT_FORMAT_OPTIONS: {
  [key in Exclude<ElementFormatType, ''>]: {
    icon: ReactNode;
    iconRTL: ReactNode;
    name: string;
  };
} = {
  center: {
    icon: <AlignCenter />,
    iconRTL: <AlignCenter />,
    name: 'Center Align',
  },
  end: {
    icon: <AlignRight />,
    iconRTL: <AlignLeft />,
    name: 'End Align',
  },
  justify: {
    icon: <AlignJustify />,
    iconRTL: <AlignJustify />,
    name: 'Justify Align',
  },
  left: {
    icon: <AlignLeft />,
    iconRTL: <AlignLeft />,
    name: 'Left Align',
  },
  right: {
    icon: <AlignRight />,
    iconRTL: <AlignRight />,
    name: 'Right Align',
  },
  start: {
    icon: <AlignLeft />,
    iconRTL: <AlignRight />,
    name: 'Start Align',
  },
};

const ListPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const dropDownRef = useRef<HTMLDivElement>(null);

  const [showListOptionsDropdown, setShowListOptionsDropdown] = useState(false);
  const [elementFormat, setElementFormat] = useState<ElementFormatType>('left');

  const formatOption = ELEMENT_FORMAT_OPTIONS[elementFormat || 'left'];

  const update = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          parentNode => $isElementNode(parentNode) && !parentNode.isInline()
        );
      }

      setElementFormat(
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
            ? node.getFormatType()
            : parent?.getFormatType() || 'left'
      );
    }
  }, []);

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            update();
          });
        }),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            update();
            return false;
          },
          LowPriority
        )
      ),
    [editor, update]
  );

  return (
    <>
      <button
        className='toolbar-item block-controls'
        type='button'
        onClick={() => setShowListOptionsDropdown(prevState => !prevState)}
        aria-label='Formatting Options'
      >
        <span className={`icon`}>{formatOption.icon}</span>
        <span className='text'>{formatOption.name}</span>
        <i className='chevron-down'>
          <ChevronDown />
        </i>
      </button>
      {showListOptionsDropdown && (
        <div className='toolbar-dropdown' ref={dropDownRef}>
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
            }}
            className='toolbar-item spaced'
            aria-label='Left Align'
          >
            <i className='format left-align'>
              <AlignLeft size={14} />
            </i>
          </button>
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
            }}
            className='toolbar-item spaced'
            aria-label='Center Align'
          >
            <i className='format center-align'>
              <AlignCenter size={14} />
            </i>
          </button>
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
            }}
            className='toolbar-item spaced'
            aria-label='Right Align'
          >
            <i className='format right-align'>
              <AlignRight size={14} />
            </i>
          </button>
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
            }}
            className='toolbar-item'
            aria-label='Justify Align'
          >
            <i className='format justify-align'>
              <AlignJustify size={14} />
            </i>
          </button>
        </div>
      )}
    </>
  );
};
export default ListPlugin;
