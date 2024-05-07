const positionEditorElement = (
  editor: HTMLDivElement,
  rect: DOMRect | undefined | null
) => {
  if (rect === null) {
    editor.style.opacity = '0';
    editor.style.top = '-1000px';
    editor.style.left = '-1000px';
  } else {
    editor.style.opacity = '1';
    editor.style.top = `${
      (rect?.top ?? 1) + (rect?.height ?? 1) + window.scrollY + 10
    }px`;
    editor.style.left = `${
      (rect?.left ?? 1) +
      window.scrollX -
      editor.offsetWidth / 2 +
      (rect?.width ?? 1) / 2
    }px`;
  }
};

export default positionEditorElement;
