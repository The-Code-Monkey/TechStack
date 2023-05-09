import { ReactNode, useRef, MouseEvent, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

type ButtonType = {
  label: string;
  onClick: () => void;
  className: string | null;
};

type CustomUIProps = {
  title: Props['title'];
  message: Props['message'];
  buttons: Props['buttons'];
  onClose: () => void;
};

interface Props {
  title?: string;
  message?: string;
  buttons: Array<ButtonType>;
  childrenElement: () => ReactNode;
  customUI?: (obj: CustomUIProps) => ReactNode;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  keyCodeForClose?: Array<number>;
  willUnmount?: () => void;
  afterClose?: () => void;
  onClickOutside?: () => void;
  onKeypressEscape?: (event: KeyboardEvent) => void;
  onKeyPress?: () => void;
  overlayClassName?: string;
  targetId: string;
}

const defaultButtons = [
  {
    label: 'Cancel',
    onClick: () => null,
    className: null,
  },
  {
    label: 'Confirm',
    onClick: () => null,
    className: null,
  },
];

let root = null;
const targetId = 'react-confirm-alert';

const addBodyClass = () => {
  document.body.classList.add('react-confirm-alert-body-element');
};

const removeBodyClass = () => {
  document.body.classList.remove('react-confirm-alert-body-element');
};

const removeElementReconfirm = props => {
  const target = document.getElementById(props.targetId || targetId);
  if (target) {
    root.unmount(target);
  }
};

const removeSVGBlurReconfirm = afterClose => {
  const svg = document.getElementById('react-confirm-alert-firm-svg');
  if (svg) {
    svg.parentNode.removeChild(svg);
  }
  document.body.children[0].classList.remove('react-confirm-alert-blur');
  afterClose();
};

const ReactConfirmAlert = (props: Props) => {
  const {
    buttons = defaultButtons,
    childrenElement = () => null,
    closeOnClickOutside = true,
    closeOnEscape = true,
    keyCodeForClose = [],
    willUnmount = () => null,
    afterClose = () => null,
    onClickOutside = () => null,
    onKeypressEscape = () => null,
    overlayClassName,
    title,
    customUI,
    message,
    onKeyPress,
  } = props;

  const overlay = useRef<HTMLDivElement>(null);

  const close = () => {
    removeBodyClass();
    removeElementReconfirm(props);
    removeSVGBlurReconfirm(afterClose);
  };

  const handleClickOverlay = (e: MouseEvent<HTMLDivElement>) => {
    const isClickOutside = e.target === overlay.current;

    if (closeOnClickOutside && isClickOutside) {
      onClickOutside();
      close();
    }

    e.stopPropagation();
  };

  const renderCustomUI = () => {
    const dataCustomUI: CustomUIProps = {
      title,
      message,
      buttons,
      onClose: close,
    };

    return customUI(dataCustomUI);
  };

  const handleClickButton = (button: ButtonType) => {
    if (button.onClick) button.onClick();
    close();
  };

  const keyboard = (event: KeyboardEvent) => {
    const keyCode = event.keyCode;
    const isKeyCodeEscape = keyCode === 27;

    if (keyCodeForClose.includes(keyCode)) {
      close();
    }

    if (closeOnEscape && isKeyCodeEscape) {
      onKeypressEscape(event);
      close();
    }

    if (onKeyPress) {
      onKeyPress();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyboard, false);

    return () => {
      document.removeEventListener('keydown', keyboard, false);
      willUnmount();
    };
  }, []);

  return (
    <div
      className={`react-confirm-alert-overlay ${overlayClassName}`}
      ref={overlay}
      onClick={handleClickOverlay}
    >
      <div className='react-confirm-alert'>
        {customUI ? (
          renderCustomUI()
        ) : (
          <div className='react-confirm-alert-body'>
            {title && <h1>{title}</h1>}
            {message}
            {childrenElement()}
            <div className='react-confirm-alert-button-group'>
              {buttons.map((button, i) => (
                <button
                  key={i}
                  className={button.className}
                  {...button}
                  onClick={() => handleClickButton(button)}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const createSVGBlurReconfirm = () => {
  const svg = document.getElementById('react-confirm-alert=firm-svg');
  if (svg) return;
  const svgNS = 'http://www.w3.org/2000/svg';
  const feGaussianBlur = document.createElementNS(svgNS, 'feGaussianBlur');
  feGaussianBlur.setAttribute('stdDeviation', '0.3');

  const filter = document.createElementNS(svgNS, 'filter');
  filter.setAttribute('id', 'gaussian-blur');
  filter.appendChild(feGaussianBlur);

  const svgElem = document.createElementNS(svgNS, 'svg');
  svgElem.setAttribute('id', 'react-confirm-alert-firm-svg');
  svgElem.setAttribute('class', 'react-confirm-alert-svg');
  svgElem.appendChild(filter);

  document.body.appendChild(svgElem);
};

const createElementReconfirm = (props: Props) => {
  let divTarget = document.getElementById(props.targetId || targetId);

  if (props.targetId && !divTarget) {
    console.error(
      'React Confirm Alert:',
      `Can not get element id (#${props.targetId})`
    );
  }

  if (divTarget) {
    root = createRoot(divTarget);
    root.render(<ReactConfirmAlert {...props} />);
  } else {
    document.body.children[0].classList.add('react-confirm-alert-blur');
    divTarget = document.createElement('div');
    divTarget.id = targetId;
    document.body.appendChild(divTarget);
    root = createRoot(divTarget);
    root.render(<ReactConfirmAlert {...props} />);
  }
};

const confirmAlert = (props: Props) => {
  addBodyClass();
  createSVGBlurReconfirm();
  createElementReconfirm(props);
};

export { confirmAlert };

export default ReactConfirmAlert;
