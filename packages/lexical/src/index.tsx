import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { $generateNodesFromDOM } from '@lexical/html';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { $getRoot, $insertNodes, LexicalEditor, TextNode } from 'lexical';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';

import ToolbarPlugin from './plugins/ToolbarPlugin';
import OnChangePlugin from './plugins/OnChangePlugin';
import { Default } from './themes';
import ExtendedTextNode from './nodes/ExtendedTextNode';
import { TableContext } from './plugins/TablePlugin';
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
import TableCellResizer from './plugins/TableCellResizer';
import {useEffect, useState} from "react";

function Placeholder() {
  return <div className='editor-placeholder'>Enter some rich text...</div>;
}

const editorConfig: InitialConfigType = {
  namespace: 'Editor',
  // The editor theme
  theme: Default,
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    HorizontalRuleNode,
    ExtendedTextNode,
    {
      replace: TextNode,
      with: node => new ExtendedTextNode(node.__text),
    },
  ],
};

export interface EditorProps {
  value: string;
  onChange: (a: string) => void;
  name: string;
}

function EditorContainer({ value, onChange, name }: EditorProps) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
      useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
      useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
          window.matchMedia('(max-width: 1025px)').matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener('resize', updateViewPortWidth);

    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport, window]);

  if (typeof window === 'undefined') return null;

  const onChangeFn = (v: string) => {
    onChange(v);
  };

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const getEditorState = (editor: LexicalEditor) => {
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(value, 'text/html');

      // Once you have the DOM instance it's easy to generate LexicalNodes.
      const nodes = $generateNodesFromDOM(editor, dom);

      // Select the root
      $getRoot().select();

      // Insert them at a selection.
      $insertNodes(nodes);
    });
  };

  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        editorState: getEditorState,
        namespace: `Editor-${name}`,
      }}
    >
      <TableContext>
        <>
          <div className='editor-container'>
            <ToolbarPlugin />
            <div className='editor-inner'>
              <RichTextPlugin
                  contentEditable={<div className={"editor"} ref={onRef}><ContentEditable className='editor-input' /></div>}
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
            </div>
          </div>
          <LinkPlugin />
          <ListPlugin />
          <HistoryPlugin />
          <MarkdownShortcutPlugin />
          <TablePlugin hasCellMerge hasCellBackgroundColor />
          <TableCellResizer />
          <OnChangePlugin onChange={onChangeFn} />
          {floatingAnchorElem && !isSmallWidthViewport && (
              <>
                <TableCellActionMenuPlugin
                    anchorElem={floatingAnchorElem}
                    cellMerge={true}
                />
                </>
              )}
        </>
      </TableContext>
    </LexicalComposer>
  );
}

export default EditorContainer;
