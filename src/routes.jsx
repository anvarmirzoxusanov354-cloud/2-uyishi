
import { Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Students from './pages/Students';
import Gifts from './pages/Gifts';
import Management from './pages/Management';

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'teachers',
            element: <Teachers />,
          },
          {
            path: 'classes',
            element: <Classes />,
          },
          {
            path: 'students',
            element: <Students />,
          },
          {
            path: 'gifts',
            element: <Gifts />,
          },
          {
            path: 'management',
            element: <Management />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
