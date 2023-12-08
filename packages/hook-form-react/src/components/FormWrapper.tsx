import { PropsWithChildren, useCallback, useState } from 'react';
import { get, set } from 'lodash';

import { FormContext } from '../provider/FormContext';
import { DataTypeSingle } from '../types/types';

export interface Props<DataType> extends PropsWithChildren {
  defaultValues?: Partial<DataType>;
  name?: string;
}

const FormWrapper = <DataType extends object>({
  children,
  defaultValues = {},
  name = 'form',
}: Props<DataType>) => {
  const [data, setData] = useState<DataType>(defaultValues as DataType);

  const getData = useCallback(() => {
    return data;
  }, [data]);

  // This function updates a specific field in the form data.
  // It takes a field key and a new value as parameters.
  const updateField = useCallback(
    (fieldKey: string, value: never) => {
      // Create a copy of the current form data.
      const newData = { ...getData() };
      // Use the 'set' function to update the value of the specified field in the copied data.
      set(newData, fieldKey, value);
      // Update the form data with the modified copy.
      setData(newData);
    },
    [data, setData, getData]
  );

  const getFieldValue = useCallback(
    (fieldKey: string) => {
      return get(data, fieldKey) as DataTypeSingle;
    },
    [data]
  );

  return (
    <FormContext.Provider
      value={{ name, getFieldValue, getData, updateField, data, setData }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormWrapper;
