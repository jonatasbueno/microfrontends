import React from 'react';

const Providers = React.lazy(() => import('providers/Providers'));

const Shell = () => (
  <React.Suspense fallback={<div>Loading Providers remote...</div>}>
    <Providers />
  </React.Suspense>
);

export default Shell;
