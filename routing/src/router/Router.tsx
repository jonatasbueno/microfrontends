import React from 'react';
import { createRouter, RouterProvider } from '@tanstack/react-router';

const CrudPage = React.lazy(() => import('crud/CrudApp'));
const DashboardPage = React.lazy(() => import('dashboard/Dashboard'));

const routeTree = {
  component: CrudPage,
  path: '/',
  children: [
    {
      path: 'dashboard',
      component: DashboardPage,
    },
  ],
};

const router = createRouter({ routeTree });

const Router = () => <RouterProvider router={router} />;

export default Router;
