import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  $createCodeNode,
  $isCodeNode,
  getCodeLanguages,
  getDefaultCodeLanguage,
} from '@lexical/code';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from '@lexical/rich-text';
import { $isAtNodeEnd, $patchStyleText, $wrapNodes } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  DEPRECATED_$isGridSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import type { GridSelection, NodeSelection } from 'lexical/LexicalSelection';
import { createPortal } from 'react-dom';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  BgColor,
  Bold,
  ChevronDown,
  Code,
  FontColor,
  Italic,
  Link,
  ListOl,
  ListUl,
  Quote,
  Strikethrough,
  TextParagraph,
  TypeH1,
  TypeH2,
  Underline,
} from '@techstack/react-feather';

import DropdownColorPicker from '../components/DropdownColorPicker';

const LowPriority = 1;

type supportedBlockTypesType =
  | 'paragraph'
  | 'quote'
  | 'code'
  | 'h1'
  | 'h2'
  | 'ul'
  | 'ol';

const supportedBlockTypes = new Set<supportedBlockTypesType>([
  'paragraph',
  'quote',
  'code',
  'h1',
  'h2',
  'ul',
  'ol',
]);

const supportedBlockTypesIcons: Record<supportedBlockTypesType, ReactNode> = {
  code: <Code />,
  h1: <TypeH1 />,
  h2: <TypeH2 />,
  ol: <ListOl />,
  paragraph: <TextParagraph />,
  quote: <Quote />,
  ul: <ListUl />,
};

const blockTypeToBlockName = {
  code: 'Code Block',
  h1: 'Large Heading',
  h2: 'Small Heading',
  h3: 'Heading',
  h4: 'Heading',
  h5: 'Heading',
  ol: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
  ul: 'Bulleted List',
};

function Divider() {
  return <div className='divider' />;
}

function positionEditorElement(
  editor: HTMLDivElement,
  rect: DOMRect | undefined | null
) {
  if (rect === null) {
    editor.style.opacity = '0';
    editor.style.top = '-1000px';
    editor.style.left = '-1000px';
  } else {
    editor.style.opacity = '1';
    editor.style.top = `${
      (rect?.top ?? 1) + (rect?.height ?? 1) + window.scrollY + 10
    }px`;
    editor.style.left = `${
      (rect?.left ?? 1) +
      window.scrollX -
      editor.offsetWidth / 2 +
      (rect?.width ?? 1) / 2
    }px`;
  }
}

function getSelectedNode(selection: RangeSelection) {
  const { anchor } = selection;
  const { focus } = selection;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  }
  return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
}

interface FloatingLinkEditorProps {
  editor: LexicalEditor;
}

function FloatingLinkEditor({ editor }: FloatingLinkEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState<
    RangeSelection | NodeSelection | GridSelection | null
  >(null);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const { activeElement } = document;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      !nativeSelection?.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection?.getRangeAt(0);
      let rect;
      if (nativeSelection?.anchorNode === rootElement) {
        let inner: HTMLElement | Element = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange?.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== 'link-input') {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl('');
    }

    return true;
  }, [editor]);

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            updateLinkEditor();
          });
        }),

        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateLinkEditor();
            return true;
          },
          LowPriority
        )
      ),
    [editor, updateLinkEditor]
  );

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div ref={editorRef} className='link-editor'>
      {isEditMode ? (
        <input
          ref={inputRef}
          className='link-input'
          value={linkUrl}
          onChange={event => {
            setLinkUrl(event.target.value);
          }}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              if (lastSelection !== null) {
                if (linkUrl !== '') {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                }
                setEditMode(false);
              }
            } else if (event.key === 'Escape') {
              event.preventDefault();
              setEditMode(false);
            }
          }}
        />
      ) : (
        <div className='link-input'>
          <a href={linkUrl} target='_blank' rel='noopener noreferrer'>
            {linkUrl}
          </a>
          <div
            className='link-edit'
            role='button'
            tabIndex={0}
            onMouseDown={event => event.preventDefault()}
            onClick={() => {
              setEditMode(true);
            }}
          />
        </div>
      )}
    </div>
  );
}

interface SelectProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className: string;
  options: Array<string>;
  value: string;
}

function Select({ onChange, className, options, value }: SelectProps) {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden value=''>
        &nbsp;
      </option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

interface BlockOptionsDropdownListProps {
  editor: LexicalEditor;
  blockType: supportedBlockTypesType;
  toolbarRef: RefObject<HTMLDivElement>;
  setShowBlockOptionsDropDown: Dispatch<SetStateAction<boolean>>;
}

function BlockOptionsDropdownList({
  editor,
  blockType,
  toolbarRef,
  setShowBlockOptionsDropDown,
}: BlockOptionsDropdownListProps) {
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("toolbar ref", toolbarRef);
    const toolbar = toolbarRef.current;
    const dropDown = dropDownRef.current;

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect();
      dropDown.style.top = `${top + 40}px`;
      dropDown.style.left = `${left}px`;
    }
  }, [dropDownRef, toolbarRef]);

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const toolbar = toolbarRef.current;

    if (dropDown !== null && toolbar !== null) {
      const handle = (event: MouseEvent) => {
        const { target } = event;

        if (
          !dropDown.contains(target as never) &&
          !toolbar.contains(target as never)
        ) {
          setShowBlockOptionsDropDown(false);
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatLargeHeading = () => {
    if (blockType !== 'h1') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode('h1'));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatSmallHeading = () => {
    if (blockType !== 'h2') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode('h2'));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatNumberedList = () => {
    console.log(blockType);

    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  return (
    <div className='toolbar-dropdown' ref={dropDownRef}>
      <button type='button' className='item' onClick={formatParagraph}>
        <span className='icon paragraph'>
          <TextParagraph />
        </span>
        <span className='text'>Normal</span>
        {blockType === 'paragraph' && <span className='active' />}
      </button>
      <button type='button' className='item' onClick={formatLargeHeading}>
        <span className='icon large-heading'>
          <TypeH1 />
        </span>
        <span className='text'>Large Heading</span>
        {blockType === 'h1' && <span className='active' />}
      </button>
      <button type='button' className='item' onClick={formatSmallHeading}>
        <span className='icon small-heading'>
          <TypeH2 />
        </span>
        <span className='text'>Small Heading</span>
        {blockType === 'h2' && <span className='active' />}
      </button>
      <button type='button' className='item' onClick={formatBulletList}>
        <span className='icon bullet-list'>
          <ListUl />
        </span>
        <span className='text'>Bullet List</span>
        {blockType === 'ul' && <span className='active' />}
      </button>
      <button type='button' className='item' onClick={formatNumberedList}>
        <span className='icon numbered-list'>
          <ListOl />
        </span>
        <span className='text'>Numbered List</span>
        {blockType === 'ol' && <span className='active' />}
      </button>
      <button type='button' className='item' onClick={formatQuote}>
        <span className='icon quote'>
          <Quote />
        </span>
        <span className='text'>Quote</span>
        {blockType === 'quote' && <span className='active' />}
      </button>
      <button type='button' className='item' onClick={formatCode}>
        <span className='icon code'>
          <Code />
        </span>
        <span className='text'>Code Block</span>
        {blockType === 'code' && <span className='active' />}
      </button>
    </div>
  );
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [blockType, setBlockType] =
    useState<supportedBlockTypesType>('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null
  );
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
    useState(false);
  const [codeLanguage, setCodeLanguage] = useState('');
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [fontColor] = useState<string>('#000');
  const [bgColor] = useState<string>('#fff');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = ($isHeadingNode(
            element
          ) as unknown as supportedBlockTypesType)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            updateToolbar();
          });
        }),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateToolbar();
            return false;
          },
          LowPriority
        )
      ),
    [editor, updateToolbar]
  );

  const codeLanguges = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
          }
        }
      });
    },
    [editor, selectedElementKey]
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [editor]
  );

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value });
    },
    [applyStyleText]
  );

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ 'background-color': value });
    },
    [applyStyleText]
  );

  return (
    <div className='toolbar' ref={toolbarRef}>
      {supportedBlockTypes.has(blockType) && (
        <>
          <button
            className='toolbar-item block-controls'
            type='button'
            onClick={() =>
              setShowBlockOptionsDropDown(!showBlockOptionsDropDown)
            }
            aria-label='Formatting Options'
          >
            <span className={`icon block-type ${blockType}`}>
              {supportedBlockTypesIcons[blockType]}
            </span>
            <span className='text'>{blockTypeToBlockName[blockType]}</span>
            <i className='chevron-down'>
              <ChevronDown />
            </i>
          </button>
          {showBlockOptionsDropDown &&
            createPortal(
              <BlockOptionsDropdownList
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarRef}
                setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />,
              editor.getRootElement()
            )}
          <Divider />
        </>
      )}
      {blockType === 'code' ? (
        <>
          <Select
            className='toolbar-item code-language'
            onChange={onCodeLanguageSelect}
            options={codeLanguges}
            value={codeLanguage}
          />
          <i className='chevron-down inside' />
        </>
      ) : (
        <>
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
            }}
            className={`toolbar-item spaced ${isBold ? 'active' : ''}`}
            aria-label='Format Bold'
          >
            <i className='format bold'>
              <Bold />
            </i>
          </button>
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
            }}
            className={`toolbar-item spaced ${isItalic ? 'active' : ''}`}
            aria-label='Format Italics'
          >
            <i className='format italic'>
              <Italic />
            </i>
          </button>
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
            }}
            className={`toolbar-item spaced ${isUnderline ? 'active' : ''}`}
            aria-label='Format Underline'
          >
            <i className='format underline'>
              <Underline />
            </i>
          </button>
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
            }}
            className={`toolbar-item spaced ${isStrikethrough ? 'active' : ''}`}
            aria-label='Format Strikethrough'
          >
            <i className='format strikethrough'>
              <Strikethrough />
            </i>
          </button>
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
            }}
            className={`toolbar-item spaced ${isCode ? 'active' : ''}`}
            aria-label='Insert Code'
          >
            <i className='format code'>
              <Code />
            </i>
          </button>
          <button
            type='button'
            onClick={insertLink}
            className={`toolbar-item spaced ${isLink ? 'active' : ''}`}
            aria-label='Insert Link'
          >
            <i className='format link'>
              <Link />
            </i>
          </button>
          {isLink &&
            createPortal(<FloatingLinkEditor editor={editor} />, editor.getRootElement())}
          <DropdownColorPicker
            buttonClassName='toolbar-item color-picker'
            buttonAriaLabel='Formatting text color'
            buttonIconClassName='icon font-color'
            buttonIcon={<FontColor />}
            color={fontColor}
            onChange={onFontColorSelect}
            title='text color'
          />
          <DropdownColorPicker
            buttonClassName='toolbar-item color-picker'
            buttonAriaLabel='Formatting background color'
            buttonIconClassName='icon bg-color'
            buttonIcon={<BgColor />}
            color={bgColor}
            onChange={onBgColorSelect}
            title='bg color'
          />
          <Divider />
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
            }}
            className='toolbar-item spaced'
            aria-label='Left Align'
          >
            <i className='format left-align'>
              <AlignLeft />
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
              <AlignCenter />
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
              <AlignRight />
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
              <AlignJustify />
            </i>
          </button>{' '}
        </>
      )}
    </div>
  );
}
