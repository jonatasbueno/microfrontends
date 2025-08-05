declare module 'state/store' {
  import { Store } from 'redux';

  const store: Store<unknown>;

  export default store;
}

declare module 'theme/Theme' {
  import { ComponentType } from 'react';

  const Theme: ComponentType;
  
  export default Theme;
}