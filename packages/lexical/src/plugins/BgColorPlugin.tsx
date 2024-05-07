import { BgColor } from '@techstack/react-feather';
import { useCallback, useEffect, useState } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { LowPriority } from '../utils/priorities';
import DropdownColorPicker from '../ui/DropdownColorPicker';
import applyStyleText from '../utils/applyStyleText';

const BgColorPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [bgColor, setBgColor] = useState<string>('#fff');

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText(editor)({ 'background-color': value });
    },
    [applyStyleText, editor]
  );

  const update = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setBgColor(
        $getSelectionStyleValueForProperty(selection, 'backgroundColor', '#fff')
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
      buttonAriaLabel='Formatting background color'
      buttonIconClassName='format bg-color'
      buttonIcon={<BgColor size={14} />}
      color={bgColor}
      onChange={onBgColorSelect}
      title='bg color'
    />
  );
};

export default BgColorPlugin;
