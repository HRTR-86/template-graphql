import { IndexProvider } from '@/scripts/Provider/IndexProvider';
import SampleCreatePage from '@/scripts/Pages/Sample/Create/SampleCreatePage';

const SampleCreateIndex = (props: any) => {
  return (
    <IndexProvider {...props}>
      <SampleCreatePage {...props} />
    </IndexProvider>
  );
};

export default SampleCreateIndex;
