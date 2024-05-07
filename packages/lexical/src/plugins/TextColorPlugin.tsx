import { FontColor } from '@techstack/react-feather';
import { useCallback, useEffect, useState } from 'react';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';

import { LowPriority } from '../utils/priorities';
import DropdownColorPicker from '../ui/DropdownColorPicker';
import applyStyleText from '../utils/applyStyleText';

const TextColorPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [fontColor, setFontColor] = useState<string>('#000');

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText(editor)({ color: value });
    },
    [applyStyleText, editor]
  );

  const update = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setFontColor(
        $getSelectionStyleValueForProperty(selection, 'color', '#000')
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
    <DropdownColorPicker
      buttonClassName='toolbar-item color-picker'
      buttonAriaLabel='Formatting text color'
      buttonIconClassName='format font-color'
      buttonIcon={<FontColor size={14} />}
      color={fontColor}
      onChange={onFontColorSelect}
      title='text color'
    />
  );
};

export default TextColorPlugin;
