import { useState, FormEvent, FC } from 'react';

import {
  SchemaValidationType,
  SchemaValidationTypeString,
  SchemaValidationTypeNumber,
  SchemaValidationTypeObject,
  SchemaValidationTypeArray,
} from '../types/schema';
import set from '../helpers/set';
import Provider from '../provider/FormContext';

// Define the properties for the useForm hook.
// 'DataType' is a generic type representing the shape of the form data.
interface useFormProps<DataType> {
  // 'defaultData' is the initial state of the form data.
  defaultData: DataType;
  // 'onSubmit' is a function that is called when the form is submitted and the data is valid.
  onSubmit: (data: DataType) => void;
  // 'schema' is an object that defines the validation rules for each field in the form data.
  schema: Record<keyof DataType, SchemaValidationType>;
  // 'name' is an optional name for the form.
  name?: string;
}

// Define the return type for the useForm hook.
type useFormReturnType<DataType> = {
  // 'reset' is a function that resets the form data to its default state.
  reset: (data?: DataType) => void;
  // 'handleSubmit' is a function that handles form submission.
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  // 'validate' is a function that validates the form data and returns any errors.
  validate: () => Promise<Record<keyof DataType, string>>;
  // 'errors' is an object that contains any validation errors.
  errors: Record<keyof DataType, string> | undefined;
  // 'Provider' is a React component that provides the form state to its children.
  Provider: FC;
};

const useForm = <DataType extends object>({
  defaultData,
  onSubmit,
  schema,
  name = 'form',
}: useFormProps<DataType>): useFormReturnType<DataType> => {
  const [data, setData] = useState<DataType>(defaultData);
  const [errorState, setErrorState] =
    useState<Record<keyof DataType, string>>();

  // This function validates a value against a set of rules.
  // It takes a value and an array of rules as parameters.
  // Each rule is an object with a 'validate' function and an 'errorMessage' string.
  const validateValue = (
    value: unknown,
    rules: Array<{
      validate: (value: unknown) => boolean;
      errorMessage: string;
    }>
  ): string | null => {
    // Iterate over each rule.
    for (const rule of rules) {
      // If the value does not pass the validation function of the rule,
      // return the error message of the rule.
      if (!rule.validate(value)) {
        return rule.errorMessage;
      }
    }
    // If the value passes all the rules, return null.
    return null;
  };

  // This function validates the data according to the schema
  const validate = async () => {
    // Initialize an empty object to store any validation errors
    // @ts-expect-error - This is a hack to get around TypeScript's type checking
    const errors: Record<keyof DataType, string> = {};

    // Get the keys of the data object
    const keys = Object.keys(data);

    // Iterate over each key in parallel using Promise.all
    await Promise.all(
      keys.map(async key => {
        // Get the validation rules for this key from the schema
        const validationType = schema[key];

        // Get the value for this key from the data
        const value = data[key];

        // Depending on the type of the validation, perform different checks
        switch (validationType.type) {
          // If the type is 'string', perform string-specific checks
          case 'string': {
            // Cast the validationType to SchemaValidationTypeString for TypeScript type safety
            const stringValidation =
              validationType as SchemaValidationTypeString;

            // Define the validation rules for strings
            const rules = [
              // The value must be a string
              {
                validate: (value: unknown) => typeof value === 'string',
                errorMessage: 'Expected a string',
              },
              // If the field is required, the string must not be empty
              {
                validate: (value: string) =>
                  !(stringValidation.required && value.length === 0),
                errorMessage: 'This field is required',
              },
              // If a minimum length is specified, the string must be at least that long
              {
                validate: (value: string) =>
                  !(
                    stringValidation.minLength &&
                    value.length < stringValidation.minLength
                  ),
                errorMessage: `Minimum length is ${stringValidation.minLength}`,
              },
              // If a maximum length is specified, the string must not be longer than that
              {
                validate: (value: string) =>
                  !(
                    stringValidation.maxLength &&
                    value.length > stringValidation.maxLength
                  ),
                errorMessage: `Maximum length is ${stringValidation.maxLength}`,
              },
              // If a pattern is specified, the string must match that pattern
              {
                validate: (value: string) =>
                  !(
                    stringValidation.pattern &&
                    !new RegExp(stringValidation.pattern).test(value)
                  ),
                errorMessage: 'Does not match pattern',
              },
            ];

            // Get the error message from the validateValue function
            const errorMessage = validateValue(value, rules);

            // If there's an error message, add it to the errors object
            if (errorMessage !== null) {
              errors[key] = errorMessage;
            }
            break;
          }
          // If the validation type is 'number', perform number-specific checks
          case 'number': {
            // Cast the validationType to SchemaValidationTypeNumber for TypeScript type safety
            const numberValidation =
              validationType as SchemaValidationTypeNumber;

            // Define the validation rules for numbers
            const rules = [
              // The value must be a number
              {
                validate: (value: unknown) => typeof value === 'number',
                errorMessage: 'Expected a number',
              },
              // If the field is required, the value must not be zero
              {
                validate: (value: number) =>
                  !(numberValidation.required && !value),
                errorMessage: 'This field is required',
              },
              // If a minimum value is specified, the number must be at least that
              {
                validate: (value: number) =>
                  !(
                    numberValidation.minimum && value < numberValidation.minimum
                  ),
                errorMessage: `Minimum value is ${numberValidation.minimum}`,
              },
              // If a maximum value is specified, the number must not be greater than that
              {
                validate: (value: number) =>
                  !(
                    numberValidation.maximum && value > numberValidation.maximum
                  ),
                errorMessage: `Maximum value is ${numberValidation.maximum}`,
              },
            ];

            // Get the error message from the validateValue function
            const errorMessage = validateValue(value, rules);

            // If there's an error message, add it to the errors object
            if (errorMessage !== null) {
              errors[key] = errorMessage;
            }
            break;
          }
          // If the validation type is 'array', perform array-specific checks
          case 'array': {
            // Cast the validationType to SchemaValidationTypeArray for TypeScript type safety
            const arrayValidation = validationType as SchemaValidationTypeArray;

            // Define the validation rules for arrays
            const rules = [
              // The value must be an array
              {
                validate: (value: unknown) => Array.isArray(value),
                errorMessage: 'Expected an array',
              },
              // If the field is required, the array must not be empty
              {
                validate: (value: unknown[]) =>
                  !(arrayValidation.required && value.length === 0),
                errorMessage: 'This field is required',
              },
            ];

            // Get the error message from the validateValue function
            const errorMessage = validateValue(value, rules);

            // If there's an error message, add it to the errors object
            if (errorMessage !== null) {
              errors[key] = errorMessage;
            }
            break;
          }
          // If the validation type is 'object', perform object-specific checks
          case 'object': {
            // Cast the validationType to SchemaValidationTypeObject for TypeScript type safety
            const objectValidation =
              validationType as SchemaValidationTypeObject;

            // Define the validation rules for objects
            const rules = [
              // The value must be an object and not an array
              {
                validate: (value: unknown) =>
                  typeof value === 'object' && !Array.isArray(value),
                errorMessage: 'Expected an object',
              },
              // If the field is required, the object must not be empty
              {
                validate: (value: Record<string, unknown>) =>
                  !(
                    objectValidation.required && Object.keys(value).length === 0
                  ),
                errorMessage: 'This field is required',
              },
            ];

            // Get the error message from the validateValue function
            const errorMessage = validateValue(value, rules);

            // If there's an error message, add it to the errors object
            if (errorMessage !== null) {
              errors[key] = errorMessage;
            }
            break;
          }
        }

        // Check for required fields that haven't been set
        if (
          validationType.required &&
          (value === undefined || value === null)
        ) {
          errors[key] = 'This field is required';
        }
      })
    );

    return errors;
  };

  // This function handles the form submission.
  // It takes an event object as a parameter.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior.
    event.preventDefault();
    // Validate the form data and get any errors.
    const errors = await validate();
    // If there are no errors (i.e., the errors object is empty),
    // call the 'onSubmit' function with the form data.
    if (Object.keys(errors).length > 0) {
      onSubmit(data);
    } else {
      // If there are errors, set the error state with the errors.
      setErrorState(errors);
    }
  };

  // This function resets the form data to its default state.
  // It takes an optional parameter 'data'. If 'data' is provided, the form data is set to 'data'.
  // If 'data' is not provided, the form data is reset to 'defaultData'.
  const reset = (data?: DataType) => {
    setData(data || defaultData);
  };

  // This function updates a specific field in the form data.
  // It takes a field key and a new value as parameters.
  const updateField = (fieldKey: string, value: never) => {
    // Create a copy of the current form data.
    const newData = { ...data };
    // Use the 'set' function to update the value of the specified field in the copied data.
    set(newData, fieldKey, value);
    // Update the form data with the modified copy.
    setData(newData);
  };

  return {
    reset,
    handleSubmit,
    validate,
    errors: errorState,
    Provider: Provider<DataType>({ name, data, updateField }),
  };
};

export default useForm;
