import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

