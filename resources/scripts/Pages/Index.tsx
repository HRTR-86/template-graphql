import { IndexProvider } from '@/scripts/Provider/IndexProvider';
import { Route, Routes } from 'react-router-dom';
import HomePage from '@/scripts/Pages/Home/HomePage';
import ProfilePage from '@/scripts/Pages/Profile/ProfilePage';
import SampleCreatePage from '@/scripts/Pages/Sample/Create/SampleCreatePage';
import SampleDetailPage from '@/scripts/Pages/Sample/Detail/SampleDetailPage';
import SampleEditPage from '@/scripts/Pages/Sample/Edit/SampleEditPage';
import NotFoundPage from '@/scripts/Pages/NotFound/NotFoundPage';

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
          path={'/sample/create'}
          element={<SampleCreatePage {...props} />}
        />
        <Route
          path={'/sample/edit/:parentId'}
          element={<SampleEditPage {...props} />}
        />
        <Route
          path={'/profile'}
          element={<ProfilePage {...props} />}
        />
        <Route
          path={'/not-found'}
          element={<NotFoundPage {...props} />}
        />
      </Routes>
    </IndexProvider>
  );
};

export default Index;
