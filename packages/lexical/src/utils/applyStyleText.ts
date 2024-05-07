import { $getSelection, $isRangeSelection, LexicalEditor } from 'lexical';
import { $isTableSelection } from '@lexical/table';
import { $patchStyleText } from '@lexical/selection';

const applyStyleText =
  (editor: LexicalEditor) => (styles: Record<string, string>) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) || $isTableSelection(selection)) {
        $patchStyleText(selection, styles);
      }
    });
  };

export default applyStyleText;
