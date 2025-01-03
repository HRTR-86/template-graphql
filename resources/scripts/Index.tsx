import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { IndexProvider } from '@/scripts/Provider/IndexProvider';
import NotFoundPage from '@/scripts/Pages/NotFound/NotFoundPage';
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
          path={'/not-found'}
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  </IndexProvider>,
);
