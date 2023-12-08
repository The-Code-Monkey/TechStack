import { useState, ChangeEvent, useContext } from 'react';

import { FormContext } from '../provider/FormContext';
import debounce from '../helpers/debounce';

// Define the properties for the useField hook.
// 'DataType' is a generic type representing the type of the field data.
interface Props<DataType> {
  // 'defaultData' is the initial state of the field data.
  defaultData?: DataType;
  // 'name' is the name of the field.
  name: string;
}

// Define the return type for the useField hook.
type useFieldReturnType<DataType> = {
  // 'value' is the current value of the field.
  value: DataType | undefined;
  // 'reset' is a function that resets the field data to its default state.
  reset: (value?: DataType) => void;
  // 'clean' is a function that clears the field data.
  clean: () => void;
  // 'register' is a function that returns an object with the field name, value, and onChange handler.
  register: () => {
    name: string;
    value: DataType | undefined;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
};

// Define the useField hook.
const useField = <DataType>({
  defaultData,
  name,
}: Props<DataType>): useFieldReturnType<DataType> => {
  // Get the form context.
  const context = useContext(FormContext);
  // Initialize the field value state.
  const [value, setValue] = useState<DataType | undefined>(defaultData);

  // Define the onChange handler for the field.
  const onChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;

    // Update the field value state and the form data in the context.
    setValue(target.value as DataType);
    context.updateField(name, target.value);
  }, 300); // 300ms delay

  // Define the register function.
  const register = () => {
    return {
      name,
      value,
      onChange,
    };
  };

  // Define the reset function.
  const reset = (value?: DataType) => {
    setValue(value || defaultData);
  };

  // Define the clean function.
  const clean = () => {
    setValue(undefined);
  };

  // Return the field value, reset, clean, and register functions.
  return {
    value,
    reset,
    clean,
    register,
  };
};

export default useField;
