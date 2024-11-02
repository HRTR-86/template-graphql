import { IndexProvider } from '@/scripts/Provider/IndexProvider';
import HomePage from '@/scripts/Pages/Home/HomePage';

const HomeIndex = (props: any) => {
  return (
    <IndexProvider {...props}>
      <HomePage {...props} />
    </IndexProvider>
  );
};

export default HomeIndex;
