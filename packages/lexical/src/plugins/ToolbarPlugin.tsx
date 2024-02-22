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
  CODE_LANGUAGE_MAP,
    getCodeLanguages,
} from '@lexical/code';
import { $isTableNode } from '@lexical/table';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_CHECK_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from '@lexical/rich-text';
import { $isAtNodeEnd, $patchStyleText, $wrapNodes, $getSelectionStyleValueForProperty } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $isTableSelection } from '@lexical/table';
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection, $isElementNode,
  $isRangeSelection, $isRootOrShadowRoot,
  BaseSelection, ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
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
  Edit, CheckSquare,
} from '@techstack/react-feather';

import DropdownColorPicker from '../components/DropdownColorPicker';
import {$findMatchingParent} from "lexical/LexicalUtils";
// import DropDown, {DropDownItem} from "../components/Dropdown";

const LowPriority = 1;

type supportedBlockTypesType =
  | 'paragraph'
  | 'quote'
  | 'code'
  | 'h1'
  | 'h2'
//     | 'h3'
// | 'h4'
// | 'h5'
//     |'h6'
    | 'bullet'
    | 'check'
    | 'number' ;

const supportedBlockTypes = new Set<supportedBlockTypesType>([
  'paragraph',
  'quote',
  'code',
  'h1',
  'h2',
    // 'h3',
    // 'h4',
    // 'h5',
    // 'h6',
    'bullet',
    'check',
    'number',
]);

const supportedBlockTypesIcons: Record<supportedBlockTypesType, ReactNode> = {
  code: <Code size={14} />,
  h1: <TypeH1 size={14} />,
  h2: <TypeH2 size={14} />,
    // h3: <TypeH3 size={14} />,
    // h4: <TypeH4 size={14} />,
    // h5: <TypeH5 size={14} />,
    // h6: <TypeH6 size={14} />,
  paragraph: <TextParagraph size={14} />,
  quote: <Quote size={14} />,
    bullet: <ListUl size={14} />,
    check: <CheckSquare size={14} />,
    number: <ListOl size={14} />,
};

const blockTypeToBlockName: Record<supportedBlockTypesType, string> = {
  code: 'Code Block',
  h1: 'Large Heading',
  h2: 'Small Heading',
  // h3: 'Heading',
  // h4: 'Heading',
  // h5: 'Heading',
  number: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
  bullet: 'Bulleted List',
  check: 'Check List',
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

// function FontDropDown({
//                         editor,
//                         value,
//                         style,
//                         disabled = false,
//                       }: {
//   editor: LexicalEditor;
//   value: string;
//   style: string;
//   disabled?: boolean;
// }): JSX.Element {
//   const handleClick = useCallback(
//       (option: string) => {
//         editor.update(() => {
//           const selection = $getSelection();
//           if (selection !== null) {
//             $patchStyleText(selection, {
//               [style]: option,
//             });
//           }
//         });
//       },
//       [editor, style],
//   );
//
//   const buttonAriaLabel =
//       style === 'font-family'
//           ? 'Formatting options for font family'
//           : 'Formatting options for font size';
//
//   return (
//       <DropDown
//           disabled={disabled}
//           buttonClassName={'toolbar-item ' + style}
//           buttonLabel={value}
//           buttonIconClassName={
//             style === 'font-family' ? 'icon block-type font-family' : ''
//           }
//           buttonIcon={}
//           buttonAriaLabel={buttonAriaLabel}>
//         {(style === 'font-family' ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(
//             ([option, text]) => (
//                 <DropDownItem
//                     className={`item ${dropDownActiveClass(value === option)} ${
//                         style === 'font-size' ? 'fontsize-item' : ''
//                     }`}
//                     onClick={() => handleClick(option)}
//                     key={option}>
//                   <span className="text">{text}</span>
//                 </DropDownItem>
//             ),
//         )}
//       </DropDown>
//   );
// }

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
  const [lastSelection, setLastSelection] = useState<BaseSelection | null>(
    null
  );

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
          >
            <Edit size={12} />
          </div>
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
    const toolbar = toolbarRef.current;
    const dropDown = dropDownRef.current;

    if (toolbar !== null && dropDown !== null) {
      dropDown.style.top = `40px`;
      dropDown.style.left = `0px`;
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
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatNumberedList = () => {
    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatCheckList = () => {
    if (blockType !== 'check') {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
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
          <TextParagraph size={14} />
        </span>
        <span className='text'>Normal</span>
        {blockType === 'paragraph' && <span className='active' />}
      </button>
      <button type='button' className='item' onClick={formatLargeHeading}>
        <span className='icon large-heading'>
          <TypeH1 size={14} />
        </span>
        <span className='text'>Large Heading</span>
        {blockType === 'h1' && <span className='active' />}
      </button>
      <button type='button' className='item' onClick={formatSmallHeading}>
        <span className='icon small-heading'>
          <TypeH2 size={14} />
        </span>
        <span className='text'>Small Heading</span>
        {blockType === 'h2' && <span className='active' />}
      </button>
      <button type='button' className='item' onClick={formatBulletList}>
        <span className='icon bullet-list'>
          <ListUl size={14} />
        </span>
        <span className='text'>Bullet List</span>
        {blockType === 'bullet' && <span className='active' />}
      </button>
      <button type='button' className='item' onClick={formatNumberedList}>
        <span className='icon numbered-list'>
          <ListOl size={14} />
        </span>
        <span className='text'>Numbered List</span>
        {blockType === 'number' && <span className='active' />}
      </button>
        <button type='button' className='item' onClick={formatCheckList}>
            <span className='icon check-list'>
            <CheckSquare size={14} />
            </span>
            <span className='text'>Check List</span>
            {blockType === 'check' && <span className='active' />}
        </button>
      <button type='button' className='item' onClick={formatQuote}>
        <span className='icon quote'>
          <Quote size={14} />
        </span>
        <span className='text'>Quote</span>
        {blockType === 'quote' && <span className='active' />}
      </button>
      <button type='button' className='item' onClick={formatCode}>
        <span className='icon code'>
          <Code size={14} />
        </span>
        <span className='text'>Code Block</span>
        {blockType === 'code' && <span className='active' />}
      </button>
    </div>
  );
}

const rootTypeToRootName = {
  root: 'Root',
  table: 'Table',
};

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [blockType, setBlockType] =
    useState<supportedBlockTypesType>('paragraph');
  // @ts-ignore
  const [rootType, setRootType] =
      useState<keyof typeof rootTypeToRootName>('root');
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
  const [fontColor, setFontColor] = useState<string>('#000');
  const [bgColor, setBgColor] = useState<string>('#fff');
  // @ts-ignore
  const [fontSize, setFontSize] = useState<string>('16px');
  // @ts-ignore
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  // @ts-ignore
  const [elementFormat, setElementFormat] = useState<ElementFormatType>('left');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
          anchorNode.getKey() === 'root'
              ? anchorNode
              : $findMatchingParent(anchorNode, (e) => {
                const parent = e.getParent();
                return parent !== null && $isRootOrShadowRoot(parent);
              });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

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

      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        setRootType('table');
      } else {
        setRootType('root');
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
              anchorNode,
              ListNode,
          );
          const type = parentList
              ? parentList.getListType()
              : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
              ? element.getTag()
              : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
          if ($isCodeNode(element)) {
            const language =
                element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            setCodeLanguage(
                language ? CODE_LANGUAGE_MAP[language] || language : '',
            );
            return;
          }
        }
      }
      // Handle buttons
      setFontSize(
          $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
      );
      setFontColor(
          $getSelectionStyleValueForProperty(selection, 'color', '#000'),
      );
      setBgColor(
          $getSelectionStyleValueForProperty(
              selection,
              'background-color',
              '#fff',
          ),
      );
      setFontFamily(
          $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'),
      );
      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
            node,
            (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
        );
      }

      // If matchingParent is a valid node, pass it's format type
      setElementFormat(
          $isElementNode(matchingParent)
              ? matchingParent.getFormatType()
              : $isElementNode(node)
                  ? node.getFormatType()
                  : parent?.getFormatType() || 'left',
      );
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
            $isTableSelection(selection)
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
          {showBlockOptionsDropDown && (
            <BlockOptionsDropdownList
              editor={editor}
              blockType={blockType}
              toolbarRef={toolbarRef}
              setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
            />
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
          {/*<FontDropDown*/}
          {/*    disabled={!isEditable}*/}
          {/*    style={'font-family'}*/}
          {/*    value={fontFamily}*/}
          {/*    editor={editor}*/}
          {/*/>*/}
          {/*<Divider />*/}
          {/*<FontSize*/}
          {/*    selectionFontSize={fontSize.slice(0, -2)}*/}
          {/*    editor={editor}*/}
          {/*    disabled={!isEditable}*/}
          {/*/>*/}
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
            }}
            className={`toolbar-item spaced ${isBold ? 'active' : ''}`}
            aria-label='Format Bold'
          >
            <i className='format bold'>
              <Bold size={14} />
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
              <Italic size={14} />
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
              <Underline size={14} />
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
              <Strikethrough size={14} />
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
              <Code size={14} />
            </i>
          </button>
          <button
            type='button'
            onClick={insertLink}
            className={`toolbar-item spaced ${isLink ? 'active' : ''}`}
            aria-label='Insert Link'
          >
            <i className='format link'>
              <Link size={14} />
            </i>
          </button>
          {isLink &&
            createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
          <DropdownColorPicker
            buttonClassName='toolbar-item color-picker'
            buttonAriaLabel='Formatting text color'
            buttonIconClassName='format font-color'
            buttonIcon={<FontColor size={14} />}
            color={fontColor}
            onChange={onFontColorSelect}
            title='text color'
          />
          <DropdownColorPicker
            buttonClassName='toolbar-item color-picker'
            buttonAriaLabel='Formatting background color'
            buttonIconClassName='format bg-color'
            buttonIcon={<BgColor size={14} />}
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
          </button>{' '}
        </>
      )}
    </div>
  );
}
