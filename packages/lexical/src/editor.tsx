import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import {
  Children,
  cloneElement,
  PropsWithChildren,
  ReactElement,
  useState,
} from 'react';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import getEditorState from './utils/editorState';
import { defaultConfig } from './utils/configs';
import OnChangePlugin from './plugins/OnChangePlugin';
import useModal from './hooks/useModal';

export interface EditorInterface {
  name: string;
  value: string;
  onChange: (a: string) => void;
  config?: InitialConfigType;
  placeholder?: string;
}

const Placeholder = ({ placeholder }: { placeholder?: string }) => {
  return (
    <div className='editor-placeholder'>
      {placeholder ?? 'Enter some rich text...'}
    </div>
  );
};

const Editor = ({
  value,
  onChange,
  name,
  config = defaultConfig,
  children,
  placeholder,
}: PropsWithChildren<EditorInterface>) => {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [modal, showModal] = useModal();

  const onChangeFn = (v: string) => {
    onChange(v);
  };

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer
      initialConfig={{
        ...config,
        editorState: getEditorState(value),
        namespace: `Editor-${name}`,
      }}
    >
      {Children.map(children, (child: ReactElement) =>
        cloneElement(child, { floatingAnchorElem, showModal })
      )}
      <div className='editor-container'>
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={
              <div className={'editor'} ref={onRef}>
                <ContentEditable className='editor-input' />
              </div>
            }
            placeholder={<Placeholder placeholder={placeholder} />}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      <OnChangePlugin onChange={onChangeFn} />
      {modal}
    </LexicalComposer>
  );
};

export default Editor;
