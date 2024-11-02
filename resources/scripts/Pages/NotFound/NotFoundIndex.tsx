import { IndexProvider } from '@/scripts/Provider/IndexProvider';
import NotFoundPage from '@/scripts/Pages/NotFound/NotFoundPage';

const NotFoundIndex = (props: any) => {
  return (
    <IndexProvider {...props}>
      <NotFoundPage {...props} />
    </IndexProvider>
  );
};

export default NotFoundIndex;
