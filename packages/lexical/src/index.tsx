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
import { $getRoot, $insertNodes, LexicalEditor } from 'lexical';

import ToolbarPlugin from './plugins/ToolbarPlugin';
import OnChangePlugin from './plugins/OnChangePlugin';
import { Default } from './themes';

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
  ],
};

export interface EditorProps {
  value: string;
  onChange: (a: string) => void;
  name: string;
}

function EditorContainer({ value, onChange, name }: EditorProps) {
  const onChangeFn = (v: string) => {
    onChange(v);
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
      <div className='editor-container'>
        <ToolbarPlugin />
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      <LinkPlugin />
      <ListPlugin />
      <HistoryPlugin />
      <MarkdownShortcutPlugin />
      <OnChangePlugin onChange={onChangeFn} />
    </LexicalComposer>
  );
}

export default EditorContainer;
