import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { AuthUserProvider } from '@/scripts/Provider/AuthUserProvider';
import { ErrorProvider } from '@/scripts/Provider/ErrorProvider';
import { LoadingProvider } from '@/scripts/Provider/LoadingProvider';
import { PropsBase } from '@/scripts/Common/System';
import { SnackbarProvider } from '@/scripts/Provider/SnackbarProvider';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/scripts/Common/Theme';

const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql',
  }),
  cache: new InMemoryCache(),
});

export const IndexProvider = ({ children, ...props }: PropsBase) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <AuthUserProvider {...props}>
          <LoadingProvider>
            <SnackbarProvider>
              <ErrorProvider>{children}</ErrorProvider>
            </SnackbarProvider>
          </LoadingProvider>
        </AuthUserProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};
