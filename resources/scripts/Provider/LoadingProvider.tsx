import { createContext, useContext, useState } from 'react';

interface LoadingContext {
  isLoading: boolean;
  handleStart: () => void;
  handleFinish: () => void;
  handleChange: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContext>({
  isLoading: false,
  handleStart: () => {},
  handleFinish: () => {},
  handleChange: () => {},
});

export const LoadingProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStart = (): void => {
    setIsLoading(true);
  };

  const handleFinish = (): void => {
    setIsLoading(false);
  };

  const handleChange = (isLoading: boolean): void => {
    setIsLoading(isLoading);
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, handleStart, handleFinish, handleChange }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);
