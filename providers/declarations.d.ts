declare module 'state/Store' {
  import { Store } from 'redux';

  const store: Store;

  export default store;
}

declare module 'design-system/Theme' {
  import { ComponentType } from 'react';

  const Theme: ComponentType;
  
  export default Theme;
}