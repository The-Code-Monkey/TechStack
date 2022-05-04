import { Interactable, Icon } from '../../primatives';
import { generateAutomationId } from '../../utils';

import { disabledStyles, checkedStyles } from './styled';

export interface Props {
  autoid?: string;
  onClick?: (p1: boolean, p2: MouseEvent) => void;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
}

const Checkbox = ({
  indeterminate,
  checked,
  onClick,
  disabled,
  autoid,
}: Props) => {
  const handleOnClick = (event: MouseEvent) => {
    const status = indeterminate || !checked;

    if (onClick) {
      onClick(status, event);
    }
  };

  return (
    <Interactable
      display='flex'
      size={7}
      alignItems='center'
      justifyContent='center'
      cursor='pointer'
      bgColor='neutrals.0'
      border='1'
      borderRadius='1'
      borderColor='neutrals.10'
      autoid={autoid ? generateAutomationId(`${autoid}_checkbox`) : 'checkbox'}
      data-checked={checked}
      data-indeterminate={indeterminate}
      data-disabled={disabled}
      onClick={handleOnClick}
      {...(disabled ? disabledStyles : {})}
      {...(checked ? checkedStyles : {})}
    >
      {(indeterminate || checked) && (
        <Icon
          autoid={`${autoid && `${autoid}_`}checkbox_icon`}
          name={indeterminate ? 'minus' : 'check'}
          noFill
          size='full'
        />
      )}
    </Interactable>
  );
};

export default Checkbox;
