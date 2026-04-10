import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  // Добавляй новые маршруты сюда
]);