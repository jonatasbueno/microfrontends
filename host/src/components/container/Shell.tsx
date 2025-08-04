import React from 'react';

const Providers = React.lazy(() => import('providers/Providers'));
const Router = React.lazy(() => import('routing/Router'));

const Shell = () => (
  <React.Suspense fallback={<div>Loading Providers remote...</div>}>
    <Providers>
      <Router />
    </Providers>
  </React.Suspense>
);

export default Shell;
