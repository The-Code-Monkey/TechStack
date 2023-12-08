/* eslint-disable react/display-name */
import { createContext, PropsWithChildren } from 'react';

export type FormContextType = {
  name: string;
  data: object;
  updateField?: (field: string, value: unknown) => void;
};

export const FormContext = createContext<FormContextType>({
  name: '',
  data: {},
});

interface Props<DataType> {
  name: string;
  data: DataType;
  updateField: (field: string, value: unknown) => void;
}

const Provider =
  <DataType extends object>({ name, data, updateField }: Props<DataType>) =>
  ({ children }: PropsWithChildren) => {
    return (
      <FormContext.Provider value={{ name, data, updateField }}>
        {children}
      </FormContext.Provider>
    );
  };

export default Provider;
