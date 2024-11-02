import { AuthUserProvider } from '@/scripts/Provider/AuthUserProvider';
import { ErrorProvider } from '@/scripts/Provider/ErrorProvider';
import { LoadingProvider } from '@/scripts/Provider/LoadingProvider';
import { PropsBase } from '@/scripts/Common/System';
import { SnackbarProvider } from '@/scripts/Provider/SnackbarProvider';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/scripts/Common/Theme';

export const IndexProvider = ({ children, ...props }: PropsBase) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthUserProvider {...props}>
        <LoadingProvider>
          <SnackbarProvider>
            <ErrorProvider>{children}</ErrorProvider>
          </SnackbarProvider>
        </LoadingProvider>
      </AuthUserProvider>
    </ThemeProvider>
  );
};
