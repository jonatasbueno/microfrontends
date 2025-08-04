declare module 'routing/Router' {
  import { ComponentType } from 'react';
  const Router: ComponentType;
  export default Router;
}

declare module 'state/store' {
  import { Store } from 'redux';

  const store: Store<unknown>;

  export default store;
}

declare module 'design-system/Theme' {
  import { ComponentType } from 'react';

  const Theme: ComponentType;
  
  export default Theme;
}