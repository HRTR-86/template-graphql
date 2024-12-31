import { IndexProvider } from '@/scripts/Provider/IndexProvider';
import SampleDetailPage from '@/scripts/Pages/Sample/Detail/SampleDetailPage';
import { Route, Routes } from 'react-router-dom';
import HomePage from '@/scripts/Pages/Home/HomePage';
import SampleEditPage from '@/scripts/Pages/Sample/Edit/SampleEditPage';

const Index = (props: any) => {
  return (
    <IndexProvider {...props}>
      <Routes>
        <Route
          path={'/home'}
          element={<HomePage {...props} />}
        />
        <Route
          path={'/sample/detail/:parentId'}
          element={<SampleDetailPage {...props} />}
        />
        <Route
          path={'/sample/edit/:parentId'}
          element={<SampleEditPage {...props} />}
        />
      </Routes>
    </IndexProvider>
  );
};

export default Index;
