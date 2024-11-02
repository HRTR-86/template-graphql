import { createContext, useContext, useState } from 'react';
import { TError } from '@/scripts/Parser/Common/parseErrorProps';

interface ErrorContext {
  error: TError;
  handleInit: () => void;
  handleChange: (error: TError) => void;
}

export const defaultValue = {
  code: '',
  title: '',
  message: '',
};

const ErrorContext = createContext<ErrorContext>({
  error: defaultValue,
  handleInit: () => {},
  handleChange: () => {},
});

export const ErrorProvider = (props: any) => {
  const [error, setError] = useState<TError>({ ...defaultValue });

  const handleInit = (): void => {
    setError({ ...defaultValue });
  };

  const handleChange = (error: TError): void => {
    setError({ ...error });
  };

  return (
    <ErrorContext.Provider value={{ error, handleInit, handleChange }}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => useContext(ErrorContext);
