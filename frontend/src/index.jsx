import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Login from './pages/auth/Login';
import Dashboard from './pages/app/Dashboard';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/admin/users',
    element: <Dashboard />
  },
  {
    path: '/chatbot',
    element: <Dashboard />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

