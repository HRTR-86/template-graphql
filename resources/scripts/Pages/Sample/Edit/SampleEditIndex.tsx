import { IndexProvider } from '@/scripts/Provider/IndexProvider';
import SampleEditPage from '@/scripts/Pages/Sample/Edit/SampleEditPage';

const SampleEditIndex = (props: any) => {
  return (
    <IndexProvider {...props}>
      <SampleEditPage {...props} />
    </IndexProvider>
  );
};

export default SampleEditIndex;
