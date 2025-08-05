import React from 'react';
import { createRootRoute, createRoute, createRouter,  } from '@tanstack/react-router';

const CrudPage = React.lazy(() => import('crud/CrudApp'));
const DashboardPage = React.lazy(() => import('dashboard/Dashboard'));

const rootRoute = createRootRoute({
  component: CrudPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'dashboard',
  component: DashboardPage,
});

const routeTree = rootRoute.addChildren([dashboardRoute]);

export const Router = createRouter({ routeTree });

export default Router;
