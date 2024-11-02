import { createContext, useContext, useState } from 'react';

interface LoadingContext {
  isLoading: boolean;
  handleStart: () => void;
  handleFinish: () => void;
}

const LoadingContext = createContext<LoadingContext>({
  isLoading: false,
  handleStart: () => {},
  handleFinish: () => {},
});

export const LoadingProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStart = (): void => {
    setIsLoading(true);
  };

  const handleFinish = (): void => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, handleStart, handleFinish }}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);
