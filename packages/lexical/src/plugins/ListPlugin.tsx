import { ListPlugin as LexicalListPlugin } from '@lexical/react/LexicalListPlugin';
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import {
  CheckSquare,
  ChevronDown,
  ListOl,
  ListUl,
} from '@techstack/react-feather';

import { LowPriority } from '../utils/priorities';

type SupportedListTypes = 'bullet' | 'number' | 'check';

const supportedListTypesIcons: Record<SupportedListTypes, ReactNode> = {
  bullet: <ListUl size={14} />,
  check: <CheckSquare size={14} />,
  number: <ListOl size={14} />,
};

const listTypeToListName: Record<SupportedListTypes, string> = {
  bullet: 'Bullet List',
  check: 'Check List',
  number: 'Numbered List',
};

const ListPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const dropDownRef = useRef<HTMLDivElement>(null);

  const [showListOptionsDropdown, setShowListOptionsDropdown] = useState(false);
  const [listType, setListType] = useState<SupportedListTypes>('bullet');

  const formatBulletList = () => {
    if (listType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setShowListOptionsDropdown(false);
  };

  const formatNumberedList = () => {
    if (listType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setShowListOptionsDropdown(false);
  };

  const formatCheckList = () => {
    if (listType !== 'check') {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const update = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, e => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setListType(type);
        }
      }
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
      <LexicalListPlugin />
      <button
        className='toolbar-item block-controls'
        type='button'
        onClick={() => setShowListOptionsDropdown(prevState => !prevState)}
        aria-label='Formatting Options'
      >
        <span className={`icon block-type ${listType}`}>
          {supportedListTypesIcons[listType]}
        </span>
        <span className='text'>{listTypeToListName[listType]}</span>
        <i className='chevron-down'>
          <ChevronDown />
        </i>
      </button>
      {showListOptionsDropdown && (
        <div className='toolbar-dropdown' ref={dropDownRef}>
          <button type='button' className='item' onClick={formatBulletList}>
            <span className='icon bullet-list'>
              <ListUl size={14} />
            </span>
            <span className='text'>Bullet List</span>
            {listType === 'bullet' && <span className='active' />}
          </button>
          <button type='button' className='item' onClick={formatNumberedList}>
            <span className='icon numbered-list'>
              <ListOl size={14} />
            </span>
            <span className='text'>Numbered List</span>
            {listType === 'number' && <span className='active' />}
          </button>
          <button type='button' className='item' onClick={formatCheckList}>
            <span className='icon check-list'>
              <CheckSquare size={14} />
            </span>
            <span className='text'>Check List</span>
            {listType === 'check' && <span className='active' />}
          </button>
        </div>
      )}
    </>
  );
};
export default ListPlugin;
