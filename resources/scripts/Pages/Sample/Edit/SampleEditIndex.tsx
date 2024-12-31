import { IndexProvider } from '@/scripts/Provider/IndexProvider';
import SampleEditPage from '@/scripts/Pages/Sample/Edit/SampleEditPage';
import { Route, Routes } from 'react-router-dom';

const SampleEditIndex = (props: any) => {
  return (
    <Routes>
      <Route
        path={'/sample/edit/:parentId'}
        element={
          <IndexProvider {...props}>
            <SampleEditPage {...props} />
          </IndexProvider>
        }
      />
    </Routes>
  );
};

export default SampleEditIndex;
