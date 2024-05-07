import { useState, ReactNode, useEffect, useCallback } from 'react';
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
} from '@techstack/react-feather';
import { $findMatchingParent, mergeRegister } from '@lexical/utils';
import { $isLinkNode } from '@lexical/link';
import { $isParentElementRTL } from '@lexical/selection';

import { LowPriority } from '../utils/priorities';
import getSelectedNode from '../utils/getSelectedNode';
import DropDown, { DropDownItem } from '../ui/Dropdown';

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
  const [isRTL, setIsRTL] = useState(false);

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

      setIsRTL($isParentElementRTL(selection));
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
    <DropDown buttonIcon={formatOption.icon} buttonLabel={formatOption.name}>
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
      >
        <i className='icon'>
          <AlignLeft />
        </i>
        <span className="text">
            Align Left
        </span>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
      >
        <i className='icon'>
          <AlignCenter />
        </i>
        <span className="text">
            Align Center
        </span>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
      >
        <i className='icon'>
          <AlignRight />
        </i>
        <span className="text">
            Align Right
        </span>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
      >
        <i className='icon'>
          <AlignJustify />
        </i>
        <span className="text">
            Align Justify
        </span>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'start');
        }}
      >
        <i className='icon'>
          {isRTL
            ? ELEMENT_FORMAT_OPTIONS.start.iconRTL
            : ELEMENT_FORMAT_OPTIONS.start.icon}
        </i>
        <span className="text">
            Align Start
        </span>
      </DropDownItem>
      <DropDownItem
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'end');
        }}
      >
        <i className='icon'>
          {isRTL
            ? ELEMENT_FORMAT_OPTIONS.end.iconRTL
            : ELEMENT_FORMAT_OPTIONS.end.icon}
        </i>
        <span className="text">
            Align End
        </span>
      </DropDownItem>
    </DropDown>
  );
};
export default ListPlugin;
