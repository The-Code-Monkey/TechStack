/*
React-Quill
https://github.com/zenoamaro/react-quill
*/

import isEqual from 'lodash/isEqual';
import Quill, {
  QuillOptionsStatic,
  RangeStatic,
  BoundsStatic,
  StringMap,
  Sources,
} from 'quill';
import QuillBetterTable from 'quill-better-table';
import Delta from 'quill-delta';
import React, { useEffect, useRef, useState } from 'react';

import 'quill/dist/quill.core.css';
import 'quill-better-table/dist/quill-better-table.css';

import Toolbar from './toolbar';

export type Value = string | Delta;
export type Range = RangeStatic | null;

export interface QuillOptions extends QuillOptionsStatic {
  tabIndex?: number;
}

export interface ReactQuillProps {
  bounds?: string | HTMLElement;
  children?: React.ReactElement;
  className?: string;
  defaultValue?: Value;
  formats?: string[];
  id?: string;
  modules?: StringMap;
  onChange?(
    value: string,
    delta: Delta,
    source: Sources,
    editor: UnprivilegedEditor
  ): void;
  onChangeSelection?(
    selection: Range,
    source: Sources,
    editor: UnprivilegedEditor
  ): void;
  onFocus?(selection: Range, source: Sources, editor: UnprivilegedEditor): void;
  onBlur?(
    previousSelection: Range,
    source: Sources,
    editor: UnprivilegedEditor
  ): void;
  onKeyDown?: React.EventHandler<never>;
  onKeyPress?: React.EventHandler<never>;
  onKeyUp?: React.EventHandler<never>;
  placeholder?: string;
  preserveWhitespace?: boolean;
  readOnly?: boolean;
  scrollingContainer?: string | HTMLElement;
  style?: React.CSSProperties;
  tabIndex?: number;
  theme?: string;
  value?: Value;
}

export interface UnprivilegedEditor {
  getLength(): number;
  getText(index?: number, length?: number): string;
  getHTML(): string;
  getBounds(index: number, length?: number): BoundsStatic;
  getSelection(focus?: boolean): RangeStatic;
  getContents(index?: number, length?: number): Delta;
}

/*
Small helper to execute a function in the next micro-tick.
*/
const postpone = (fn: (value: void) => void) => {
  Promise.resolve().then(fn);
};

const ReactQuill = ({
  theme = 'snow',
  readOnly = false,
  value: V,
  defaultValue,
  bounds,
  formats,
  modules = {},
  placeholder,
  scrollingContainer,
  tabIndex,
  onChange,
  onFocus,
  onBlur,
  onChangeSelection,
  id,
  style,
  className,
  onKeyUp,
  onKeyPress,
  onKeyDown,
  children,
  preserveWhitespace,
}: ReactQuillProps) => {
  const [generation] = useState(0);
  const editorRef = useRef<Quill | null>(null);
  const editingArea = useRef(null);
  const unprivilegedEditor = useRef(null);
  const [innerValue, setValue] = useState(V ?? defaultValue ?? '');
  const [_, setLastDeltaChangeSet] = useState(null);
  const [selection, setSelection] = useState(null);

  const setEditorTabIndex = (editor: Quill, tabIndex: number) => {
    if (editor.scroll.domNode) {
      (editor.scroll.domNode as HTMLElement).tabIndex = tabIndex;
    }
  };

  const makeUnprivilegedEditor = (editor: Quill) => {
    const e = editor;
    return {
      getHTML: () => e.root.innerHTML,
      getLength: e.getLength.bind(e),
      getText: e.getText.bind(e),
      getContents: e.getContents.bind(e),
      getSelection: e.getSelection.bind(e),
      getBounds: e.getBounds.bind(e),
    };
  };

  const getEditingArea = (): Element => {
    const element = editingArea.current;
    if (!element) {
      throw new Error('Cannot find element for editing area');
    }
    return element;
  };

  const getEditorConfig = (): QuillOptions => {
    return {
      bounds,
      formats,
      modules: {
        ...modules,
        table: true,
        'better-table': {
          operationMenu: {
            color: {
              colors: ['green', 'red', 'yellow', 'blue', 'white'],
              text: 'Background Colors:',
            },
          },
        },
        toolbar: '#toolbar',
      },
      placeholder,
      readOnly,
      scrollingContainer,
      tabIndex,
      theme,
    };
  };

  const isDelta = (value): boolean => {
    return value && value.ops;
  };

  const getEditorContents = () => {
    return innerValue;
  };

  const onEditorChangeText = (
    value: string,
    delta: Delta,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    if (!editorRef.current) return;

    const nextContents = isDelta(innerValue)
      ? editor.getContents()
      : editor.getHTML();

    if (nextContents !== getEditorContents()) {
      setLastDeltaChangeSet(delta);

      setValue(nextContents);
      onChange?.(value, delta, source, editor);
    }
  };

  const getEditorSelection = (): Range => {
    return selection;
  };

  const onEditorChangeSelection = (
    nextSelection: RangeStatic,
    source: Sources,
    editor: UnprivilegedEditor
  ): void => {
    if (!editorRef.current) return null;
    const currentSelection = getEditorSelection();
    const hasGainedFocus = !currentSelection && nextSelection;
    const hasLostFocus = currentSelection && !nextSelection;

    if (isEqual(nextSelection, currentSelection)) return;

    setSelection(nextSelection);
    onChangeSelection?.(nextSelection, source, editor);

    if (hasGainedFocus) {
      onFocus?.(nextSelection, source, editor);
    } else if (hasLostFocus) {
      onBlur?.(currentSelection, source, editor);
    }
  };

  const onEditorChange = (
    eventName: 'text-change' | 'selection-change',
    rangeOrDelta: Range | Delta,
    oldRangeOrDelta: Range | Delta,
    source: Sources
  ) => {
    if (eventName === 'text-change') {
      onEditorChangeText(
        editorRef.current.root.innerHTML,
        rangeOrDelta as Delta,
        source,
        unprivilegedEditor.current
      );
    } else if (eventName === 'selection-change') {
      onEditorChangeSelection(
        rangeOrDelta as RangeStatic,
        source,
        unprivilegedEditor.current
      );
    }
  };

  const hookEditor = (editor: Quill) => {
    unprivilegedEditor.current = makeUnprivilegedEditor(editor);
    editor.on('editor-change', onEditorChange);
  };

  const createEditor = (element: Element, config: QuillOptions) => {
    const editor = new Quill(element, config);

    const tableModule = editor.getModule('better-table');

    editor.root.parentElement.parentElement.querySelector<HTMLButtonElement>(
      '#insert-table'
    ).onclick = () => {
      tableModule.insertTable(3, 3);
    };

    if (config.tabIndex != null) {
      setEditorTabIndex(editor, config.tabIndex);
    }

    hookEditor(editor);
    return editor;
  };

  const instantiateEditor = (): void => {
    if (editorRef.current) {
      hookEditor(editorRef.current);
    } else {
      editorRef.current = createEditor(getEditingArea(), getEditorConfig());
    }
  };

  const setEditorSelection = (editor: Quill, range: Range) => {
    setSelection(range);
    if (range) {
      const length = editor.getLength();
      range.index = Math.max(0, Math.min(range.index, length - 1));
      range.length = Math.max(
        0,
        Math.min(range.length, length - 1 - range.index)
      );
      editor.setSelection(range);
    }
  };

  const setEditorContents = (editor: Quill, value: Value) => {
    setValue(value);
    const sel = getEditorSelection();
    if (typeof value === 'string') {
      editor.setContents(editor.clipboard.convert({ text: value }));
    } else {
      editor.setContents(value);
    }

    postpone(() => setEditorSelection(editor, sel));
  };

  const renderEditingArea = () => {
    const properties = {
      key: generation,
      ref: editingArea,
    };

    if (React.Children.count(children)) {
      return React.cloneElement(React.Children.only(children), properties);
    }

    return preserveWhitespace ? (
      <pre {...properties} />
    ) : (
      <div {...properties} />
    );
  };

  const unhookEditor = (editor: Quill) => {
    editor.off('editor-change', onEditorChange);
  };

  const destroyEditor = () => {
    if (!editorRef.current) return;
    unhookEditor(editorRef.current);
  };

  useEffect(() => {
    Quill.register(
      {
        'modules/better-table': QuillBetterTable,
      },
      true
    );

    instantiateEditor();
    setEditorContents(editorRef.current, getEditorContents());

    return () => {
      destroyEditor();
    };
  }, []);

  return (
    <div
      id={id}
      style={style}
      key={generation}
      className={`quill ${className ?? ''}`}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      <Toolbar />
      {renderEditingArea()}
    </div>
  );
};

// class ReactQuill extends React.Component<ReactQuillProps, ReactQuillState> {
//   static displayName = 'React Quill';
//
//   /*
//   Export Quill to be able to call `register`
//   */
//   static Quill = Quill;
//
//   /*
//   Changing one of these props should cause a full re-render and a
//   re-instantiation of the Quill editor.
//   */
//   dirtyProps: (keyof ReactQuillProps)[] = [
//     'modules',
//     'formats',
//     'bounds',
//     'theme',
//     'children',
//   ];
//
//   /*
//   Changing one of these props should cause a regular update. These are mostly
//   props that act on the container, rather than the quillized editing area.
//   */
//   cleanProps: (keyof ReactQuillProps)[] = [
//     'id',
//     'className',
//     'style',
//     'placeholder',
//     'tabIndex',
//     'onChange',
//     'onChangeSelection',
//     'onFocus',
//     'onBlur',
//     'onKeyPress',
//     'onKeyDown',
//     'onKeyUp',
//   ];
//
//   static defaultProps = {
//     theme: 'snow',
//     modules: {},
//     readOnly: false,
//   };
//
//   state: ReactQuillState = {
//     generation: 0,
//   };
//
//   /*
//   The Quill Editor instance.
//   */
//         'The Quill editing area can only be composed of a single React element.'
//       );
//
//   editor?: Quill;
//
//   /*
//   Reference to the element holding the Quill editing area.
//   */
//   editingArea?: React.ReactInstance | null;
//
//   /*
//   Tracks the internal value of the Quill editor
//   */
//   value: Value;
//
//   /*
//   Tracks the internal selection of the Quill editor
//   */
//   selection: Range = null;
//
//   /*
//   Used to compare whether deltas from `onChange` are being used as `value`.
//   */
//   lastDeltaChangeSet?: Delta;
//
//   /*
//   Stores the contents of the editor to be restored after regeneration.
//   */
//   regenerationSnapshot?: {
//     delta: Delta;
//     selection: Range;
//   };
//
//   /*
//   A weaker, unprivileged proxy for the editor that does not allow accidentally
//   modifying editor state.
//   */
//   unprivilegedEditor?: UnprivilegedEditor;
//
//   constructor(props: ReactQuillProps) {
//     super(props);
//     const value = this.isControlled() ? props.value : props.defaultValue;
//     this.value = value ?? '';
//   }
//
//   validateProps(props: ReactQuillProps): void {
//     if (React.Children.count(props.children) > 1)
//       throw new Error(
//     if (React.Children.count(props.children)) {
//     const child = React.Children.only(props.children);
//       if (child?.type === 'textarea')
//         throw new Error(
//           'Quill does not support editing on a <textarea>. Use a <div> instead.'
//         );
//     }
//
//     if (this.lastDeltaChangeSet && props.value === this.lastDeltaChangeSet)
//       throw new Error(
//         'You are passing the `delta` object from the `onChange` event back ' +
//           'as `value`. You most probably want `editor.getContents()` instead. ' +
//           'See: https://github.com/zenoamaro/react-quill#using-deltas'
//       );
//   }
//
//   shouldComponentUpdate(
//     nextProps: ReactQuillProps,
//     nextState: ReactQuillState
//   ) {
//     this.validateProps(nextProps);
//
//     // If the editor hasn't been instantiated yet, or the component has been
//     // regenerated, we already know we should update.
//     if (!this.editor || this.state.generation !== nextState.generation) {
//       return true;
//     }
//
//     // Handle value changes in-place
//     if ('value' in nextProps) {
//       const prevContents = this.getEditorContents();
//       const nextContents = nextProps.value ?? '';
//
//       // NOTE: Seeing that Quill is missing a way to prevent edits, we have to
//       //       settle for a hybrid between controlled and uncontrolled mode. We
//       //       can't prevent the change, but we'll still override content
//       //       whenever `value` differs from current state.
//       // NOTE: Comparing an HTML string and a Quill Delta will always trigger a
//       //       change, regardless of whether they represent the same document.
//       if (!this.isEqualValue(nextContents, prevContents)) {
//         this.setEditorContents(this.editor, nextContents);
//       }
//     }
//
//     // Handle read-only changes in-place
//     if (nextProps.readOnly !== this.props.readOnly) {
//       this.setEditorReadOnly(this.editor, nextProps.readOnly);
//     }
//
//     // Clean and Dirty props require a render
//     return [...this.cleanProps, ...this.dirtyProps].some(prop => {
//       return !isEqual(nextProps[prop], this.props[prop]);
//     });
//   }
//
//   shouldComponentRegenerate(nextProps: ReactQuillProps): boolean {
//     // Whenever a `dirtyProp` changes, the editor needs reinstantiation.
//     return this.dirtyProps.some(prop => {
//       return !isEqual(nextProps[prop], this.props[prop]);
//     });
//   }
//
//   componentDidMount() {
//     this.instantiateEditor();
//     this.setEditorContents(this.editor, this.getEditorContents());
//   }
//
//   componentWillUnmount() {
//     this.destroyEditor();
//   }
//
//   componentDidUpdate(prevProps: ReactQuillProps, prevState: ReactQuillState) {
//     // If we're changing one of the `dirtyProps`, the entire Quill Editor needs
//     // to be re-instantiated. Regenerating the editor will cause the whole tree,
//     // including the container, to be cleaned up and re-rendered from scratch.
//     // Store the contents so they can be restored later.
//     if (this.editor && this.shouldComponentRegenerate(prevProps)) {
//       const delta = this.editor.getContents();
//       const selection = this.editor.getSelection();
//       this.regenerationSnapshot = { delta, selection };
//       this.setState({ generation: this.state.generation + 1 });
//       this.destroyEditor();
//     }
//
//     // The component has been regenerated, so it must be re-instantiated, and
//     // its content must be restored to the previous values from the snapshot.
//     if (this.state.generation !== prevState.generation) {
//       const { delta, selection } = this.regenerationSnapshot;
//       delete this.regenerationSnapshot;
//       this.instantiateEditor();
//       const editor = this.editor;
//       editor.setContents(delta);
//       postpone(() => this.setEditorSelection(editor, selection));
//     }
//   }
//
//   /*
//   We consider the component to be controlled if `value` is being sent in props.
//   */
//   isControlled(): boolean {
//     return 'value' in this.props;
//   }
//
//   getEditor(): Quill {
//     if (!this.editor) throw new Error('Accessing non-instantiated editor');
//     return this.editor;
//   }
//
//   /*
//   Special comparison function that knows how to compare Deltas.
//   */
//   isEqualValue(value: any, nextValue: any): boolean {
//     if (this.isDelta(value) && this.isDelta(nextValue)) {
//       return isEqual(value.ops, nextValue.ops);
//     } else {
//       return isEqual(value, nextValue);
//     }
//   }
//
//   setEditorReadOnly(editor: Quill, value: boolean) {
//     if (value) {
//       editor.disable();
//     } else {
//       editor.enable();
//     }
//   }
//
//   focus(): void {
//     if (!this.editor) return;
//     this.editor.focus();
//   }
//
//   blur(): void {
//     if (!this.editor) return;
//     this.selection = null;
//     this.editor.blur();
//   }
// }

export default ReactQuill;
