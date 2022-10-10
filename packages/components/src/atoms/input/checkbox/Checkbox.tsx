import { Interactable, Icon } from '../../../primal';
import { generateAutomationId } from '../../../utils';

import { disabledStyles, checkedStyles } from './styled';

export interface Props {
  testid?: string;
  onChange?: (p1: boolean) => void;
  value?: 'checked' | 'indeterminate' | unknown;
  indeterminate?: boolean;
  disabled?: boolean;
  name?: string;
}

const Checkbox = ({ value, onChange, disabled, testid, name }: Props) => {
  const checked = value === 'checked';
  const indeterminate = value === 'indeterminate';

  const handleOnClick = () => {
    const status = indeterminate || !checked;

    if (onChange) {
      onChange(status);
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
