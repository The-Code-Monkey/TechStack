import { useEffect } from 'react';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface OnChangePluginProps {
  onChange: (a: string) => void;
}

function OnChangePlugin({ onChange }: OnChangePluginProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(
    () =>
      editor.registerUpdateListener(() => {
        editor.update(() => {
          onChange($generateHtmlFromNodes(editor));
        });
      }),
    [editor, onChange]
  );

  return null;
}

export default OnChangePlugin;
