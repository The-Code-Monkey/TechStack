import { ChangeEvent, useContext, useEffect } from 'react';

import { FormContext } from '../provider/FormContext';
import { DataTypeArray } from '../types/types';

export interface useFieldsProps {
  // 'name' is the name of the field.
  name: string;
}

export type useFieldsReturnType<DataType> = {
  fields: {
    // 'value' is the current value of the field.
    value: DataType | undefined;
    // 'reset' is a function that resets the field data to its default state.
    reset: (value?: DataType) => void;
    // 'clean' is a function that clears the field data.
    clean: () => void;
    // 'register' is a function that returns an object with the field name, value, and onChange handler.
    name: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }
};

// Define the useFields hook.
const useFields = <DataType extends DataTypeArray>({
  name,
}: useFieldsProps): useFieldsReturnType<DataType> => {
  // Get the form context.
  const context = useContext(FormContext);
  
  const { updateField, getFieldValue, data } = context;

  const [fieldsRaw, setFieldsRaw] = useState<DataType>(getFieldValue(name) as DataType);

  const fields = fieldsRaw.map((field, index: number) => ({ ...field, name: `${name}.${index}` })

  return {
    fields
  };
};

export default useFields;
