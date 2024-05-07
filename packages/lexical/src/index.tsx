import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { useEffect, useState } from 'react';

import OnChangePlugin from './plugins/OnChangePlugin';
import TableCellResizer from './plugins/TableCellResizer';
import { defaultConfig } from './utils/configs';
import Editor, { EditorInterface } from './editor';
import {
  AlignPlugin,
  LinkPlugin,
  ListPlugin,
  TextColorPlugin,
  BgColorPlugin,
} from './plugins';
import Toolbar from './components/Toolbar';
import { Divider } from './components';

function EditorContainer({
  value,
  onChange,
  name,
  config = defaultConfig,
  placeholder,
}: EditorInterface) {
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window?.matchMedia) return;
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport = window.matchMedia(
        '(max-width: 1025px)'
      ).matches;

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

  return (
    <Editor
      name={name}
      value={value}
      onChange={onChange}
      config={config}
      placeholder={placeholder}
    >
      {/* toolbar plugins */}
      <Toolbar>
        <TextColorPlugin />
        <BgColorPlugin />
        <Divider />
        <LinkPlugin />
        <ListPlugin />
        <AlignPlugin />
      </Toolbar>

      {/* non toolbar plugins */}
      <OnChangePlugin onChange={onChangeFn} />
      {/* Old Plugins */}
      <HistoryPlugin />
      <MarkdownShortcutPlugin />
      <TablePlugin hasCellMerge hasCellBackgroundColor />
      <TableCellResizer />
      {/*{floatingAnchorElem && !isSmallWidthViewport && (*/}
      {/*  <>*/}
      {/*    <TableCellActionMenuPlugin anchorElement={floatingAnchorElem} />*/}
      {/*  </>*/}
      {/*)}*/}
    </Editor>
  );
}

export default EditorContainer;
