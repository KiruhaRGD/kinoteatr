import { createBrowserRouter } from 'react-router';

// Импорт страниц
import Login from './pages/Login';
import CashierMenu from './pages/Cashier/CashierMenu';
import Hall from './pages/Cashier/Hall';

import AdminMenu from './pages/Admin/AdminMenu';
import AdminStat from './pages/Admin/AdminStat';
import AdminFilms from './pages/Admin/AdminFilms';
import AdminHalls from './pages/Admin/AdminHalls';
import AdminSessions from './pages/Admin/AdminSessions';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },




  {
    path: '/CashierMenu',
    element: <CashierMenu />,
  },
  { 
    path: '/cashier/hall/:sessionId', 
    element: <Hall /> 
  },


  {
    path: '/admin',
    element: <AdminMenu />,
    children: [
      { 
        index: true, 
        element: <AdminStat /> 
      },
      { 
        path: 'films', 
        element: <AdminFilms /> 
      },
      { 
        path: 'sessions', 
        element: <AdminSessions /> 
      },
      { 
        path: 'halls', 
        element: <AdminHalls /> 
      },
    ]
  }
])