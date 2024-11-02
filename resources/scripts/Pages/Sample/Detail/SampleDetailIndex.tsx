import { IndexProvider } from '@/scripts/Provider/IndexProvider';
import SampleDetailPage from '@/scripts/Pages/Sample/Detail/SampleDetailPage';

const SampleDetailIndex = (props: any) => {
  return (
    <IndexProvider {...props}>
      <SampleDetailPage {...props} />
    </IndexProvider>
  );
};

export default SampleDetailIndex;
