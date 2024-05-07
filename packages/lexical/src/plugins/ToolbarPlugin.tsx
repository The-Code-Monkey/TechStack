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
import { $isLinkNode } from '@lexical/link';
import { $isListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from '@lexical/rich-text';
import {
  $wrapNodes,
  $getSelectionStyleValueForProperty,
} from '@lexical/selection';
import { mergeRegister, $findMatchingParent } from '@lexical/utils';
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  ElementFormatType,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import {
  Bold,
  ChevronDown,
  Code,
  Italic,
  Quote,
  Strikethrough,
  TextParagraph,
  TypeH1,
  TypeH2,
  Underline,
} from '@techstack/react-feather';

import getSelectedNode from '../utils/getSelectedNode';

const LowPriority = 1;

type supportedBlockTypesType = 'paragraph' | 'quote' | 'code' | 'h1' | 'h2';
//     | 'h3'
// | 'h4'
// | 'h5'
//     |'h6';

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
};

const blockTypeToBlockName: Record<supportedBlockTypesType, string> = {
  code: 'Code Block',
  h1: 'Large Heading',
  h2: 'Small Heading',
  // h3: 'Heading',
  // h4: 'Heading',
  // h5: 'Heading',
  paragraph: 'Normal',
  quote: 'Quote',
};

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
  // @ts-expect-error not using this yet but will do
  const [rootType, setRootType] =
    useState<keyof typeof rootTypeToRootName>('root');
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null
  );
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
    useState(false);
  const [codeLanguage, setCodeLanguage] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  // @ts-expect-error not using this yet but will do
  const [fontSize, setFontSize] = useState<string>('16px');
  // @ts-expect-error not using this yet but will do
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  // @ts-expect-error not using this yet but will do
  const [elementFormat, setElementFormat] = useState<ElementFormatType>('left');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, e => {
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

      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        setRootType('table');
      } else {
        setRootType('root');
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          // ignore moved to plugin
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
              language ? CODE_LANGUAGE_MAP[language] || language : ''
            );
            return;
          }
        }
      }
      // Handle buttons
      setFontSize(
        $getSelectionStyleValueForProperty(selection, 'font-size', '15px')
      );
      setFontFamily(
        $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial')
      );
      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          parentNode => $isElementNode(parentNode) && !parentNode.isInline()
        );
      }

      // If matchingParent is a valid node, pass it's format type
      setElementFormat(
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
            ? node.getFormatType()
            : parent?.getFormatType() || 'left'
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
          {/*<button*/}
          {/*  type='button'*/}
          {/*  onClick={() => {*/}
          {/*    showModal('Insert Table', onClose => (*/}
          {/*      <InsertTableDialog activeEditor={editor} onClose={onClose} />*/}
          {/*    ));*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <i className='format element-format'>*/}
          {/*    <Plus size={14} />*/}
          {/*  </i>{' '}*/}
          {/*  Table*/}
          {/*</button>{' '}*/}
        </>
      )}
    </div>
  );
}
