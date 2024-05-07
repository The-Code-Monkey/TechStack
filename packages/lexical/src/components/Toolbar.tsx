import {
  Children,
  PropsWithChildren,
  useRef,
  cloneElement,
  ReactElement,
  JSX,
} from 'react';

interface ToolbarProps {
  /** @internal */
  floatingAnchorElem?: HTMLDivElement | null;
  /** @internal */
  showModal?: (onClose: () => void) => JSX.Element;
}

const Toolbar = ({
  children,
  floatingAnchorElem,
  showModal,
}: PropsWithChildren<ToolbarProps>) => {
  const toolbarRef = useRef<HTMLDivElement>(null);

  return (
    <div className='toolbar' ref={toolbarRef}>
      {Children.map(children, (child: ReactElement) =>
        cloneElement(child, {
          toolbarRef,
          showModal,
          floatingAnchorElem,
        })
      )}
    </div>
  );
};

export default Toolbar;
