import ErrorPage from '@/scripts/Pages/Error/ErrorPage';
import { IndexProvider } from '@/scripts/Provider/IndexProvider';

const ErrorIndex = (props: any) => {
  return (
    <IndexProvider {...props}>
      <ErrorPage {...props} />
    </IndexProvider>
  );
};

export default ErrorIndex;
