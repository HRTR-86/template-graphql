import { IndexProvider } from '@/scripts/Provider/IndexProvider';
import TopPage from '@/scripts/Pages/Top/TopPage';

const TopIndex = (props: any) => {
  return (
    <IndexProvider {...props}>
      <TopPage {...props} />
    </IndexProvider>
  );
};

export default TopIndex;
