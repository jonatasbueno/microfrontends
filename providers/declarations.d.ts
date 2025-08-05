declare module 'state/Store' {
  import { Store } from 'redux';

  const store: Store;

  export default store;
}

declare module 'theme/Theme' {
  import { ComponentType } from 'react';

  const Theme: ComponentType;
  
  export default Theme;
}

declare module 'routing/Router' {
  import { AnyRouter } from '@tanstack/react-router';

  const router: AnyRouter;

  export default router;
}