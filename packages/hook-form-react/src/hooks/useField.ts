import { ChangeEvent, useContext, useEffect, useState } from 'react';

import { FormContext } from '../provider/FormContext';
import {DataTypeSingle} from "../types/types";

// Define the properties for the useField hook.
// 'DataType' is a generic type representing the type of the field data.
export interface useFieldProps {
  // 'name' is the name of the field.
  name: string;
}

// Define the return type for the useField hook.
export type useFieldReturnType<DataType> = {
  // 'value' is the current value of the field.
  value: DataType | undefined;
  // 'reset' is a function that resets the field data to its default state.
  reset: (value?: DataType) => void;
  // 'clean' is a function that clears the field data.
  clean: () => void;
  // 'register' is a function that returns an object with the field name, value, and onChange handler.
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

// Define the useField hook.
const useField = <DataType extends DataTypeSingle>({
  name,
}: useFieldProps): useFieldReturnType<DataType> => {
  // Get the form context.
  const context = useContext(FormContext);

  const { updateField, getFieldValue, data } = context;

  // Initialize the field value state.
  const [value, setValue] = useState<DataType>(getFieldValue(name) as DataType);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as DataType);
    updateField(name, e.target.value);
  };

  // Define the reset function.
  const reset = async (value?: DataType) => {
    updateField(name, value);
  };

  // Define the clean function.
  const clean = async () => {
    updateField(name, '');
  };

  useEffect(() => {
    if (value !== getFieldValue(name)) {
      setValue(getFieldValue(name) as DataType);
    }
  }, [data]);

  // Return the field value, reset, clean, and register functions.
  return {
    value,
    reset,
    clean,
    name,
    onChange,
  };
};

export default useField;
