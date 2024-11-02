import { createContext, useContext, useState } from 'react';
import { AlertColor } from '@mui/material/Alert/Alert';

export interface TSnackbar {
  type?: AlertColor;
  autoHideDuration?: number;
  message: string;
}

interface SnackbarContext {
  snackbar: TSnackbar;
  handleChange: (snackbar: TSnackbar) => void;
  handleClose: () => void;
}

export const defaultValue = {
  type: 'success' as AlertColor,
  autoHideDuration: 5000,
  message: '',
};

const SnackbarContext = createContext<SnackbarContext>({
  snackbar: defaultValue,
  handleChange: () => {},
  handleClose: () => {},
});

export const SnackbarProvider = (props: any) => {
  const [snackbar, setSnackbar] = useState<TSnackbar>({ ...defaultValue });

  const handleChange = (newValues: Partial<TSnackbar>): void => {
    setSnackbar({ ...snackbar, ...newValues });
  };

  const handleClose = (): void => {
    setSnackbar({ ...defaultValue });
  };

  return (
    <SnackbarContext.Provider value={{ snackbar, handleChange, handleClose }}>
      {props.children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => useContext(SnackbarContext);
