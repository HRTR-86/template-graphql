import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IndexProvider } from '@/scripts/Provider/IndexProvider';
import HomePage from '@/scripts/Pages/Home/HomePage';
import NotFoundPage from '@/scripts/Pages/NotFound/NotFoundPage';
import ProfilePage from '@/scripts/Pages/Profile/ProfilePage';
import SampleCreatePage from '@/scripts/Pages/Sample/Create/SampleCreatePage';
import SampleDetailPage from '@/scripts/Pages/Sample/Detail/SampleDetailPage';
import SampleEditPage from '@/scripts/Pages/Sample/Edit/SampleEditPage';
import TopPage from '@/scripts/Pages/Top/TopPage';

const element = document.getElementById('index');
const root = createRoot(element!);

root.render(
  <IndexProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={<TopPage />}
        />
        <Route
          path={'/home'}
          element={<HomePage />}
        />
        <Route
          path={'/sample/detail/:parentId'}
          element={<SampleDetailPage />}
        />
        <Route
          path={'/sample/create'}
          element={<SampleCreatePage />}
        />
        <Route
          path={'/sample/edit/:parentId'}
          element={<SampleEditPage />}
        />
        <Route
          path={'/profile'}
          element={<ProfilePage />}
        />
        <Route
          path={'/not-found'}
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  </IndexProvider>,
);
