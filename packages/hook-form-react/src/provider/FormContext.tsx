/* eslint-disable react/display-name */
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
} from 'react';

export type FormContextType = {
  name: string;
  data: object;
  updateField?: (field: string, value: unknown) => void;
  getFieldValue: (
    field: string
  ) =>
    | string
    | boolean
    | number
    | [unknown]
    | Record<string, unknown>
    | undefined;
  getData: () => object;
  setData?: Dispatch<SetStateAction<object>>;
};

export const FormContext = createContext<FormContextType>({
  name: '',
  data: {},
  getFieldValue: () => undefined,
  getData: () => ({}),
});

export interface Props<DataType> extends PropsWithChildren {
  name: string;
  getData: () => DataType;
  getFieldValue: (
    field: string
  ) =>
    | string
    | boolean
    | number
    | [unknown]
    | Record<string, unknown>
    | undefined;
  updateField: (field: string, value: never) => void;
  data: Partial<DataType>;
  setData: Dispatch<SetStateAction<DataType>>;
}

const Provider = <DataType extends object>({
  children,
  name,
  getData,
  updateField,
  getFieldValue,
  data,
  setData,
}: Props<DataType>) => {
  return (
    <FormContext.Provider
      value={{ name, getFieldValue, getData, updateField, data, setData }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default Provider;
