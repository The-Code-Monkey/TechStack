import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { TextNode } from 'lexical';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';

import ExtendedTextNode from '../nodes/ExtendedTextNode';
import { Default } from '../themes';

const defaultConfig: InitialConfigType = {
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

export { defaultConfig };
