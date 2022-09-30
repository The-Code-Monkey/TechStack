import { Interactable, Icon } from '../../../primal';
import { generateAutomationId } from '../../../utils';

import { disabledStyles, checkedStyles } from './styled';

export interface Props {
  testid?: string;
  onClick?: (p1: boolean, p2: MouseEvent) => void;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  name?: string;
}

const Checkbox = ({
  indeterminate,
  checked,
  onClick,
  disabled,
  testid,
  name,
}: Props) => {
  const handleOnClick = (event: MouseEvent) => {
    const status = indeterminate || !checked;

    if (onClick) {
      onClick(status, event);
    }
  };

  return (
    <Interactable
      name={name}
      display='flex'
      size={7}
      alignItems='center'
      justifyContent='center'
      bgColor='neutrals.0'
      border='1'
      borderRadius='1'
      borderColor='neutrals.10'
      testid={testid ? generateAutomationId(`${testid}_checkbox`) : 'checkbox'}
      data-checked={checked}
      data-indeterminate={indeterminate}
      data-disabled={disabled}
      onClick={handleOnClick}
      {...(disabled ? disabledStyles : {})}
      {...(checked ? checkedStyles : {})}
    >
      {(indeterminate || checked) && (
        <Icon
          testid={
            testid
              ? `${testid}_checkbox_icon`
              : indeterminate
              ? 'minus'
              : 'check'
          }
          name={indeterminate ? 'minus' : 'check'}
          size='full'
        />
      )}
    </Interactable>
  );
};

export default Checkbox;
