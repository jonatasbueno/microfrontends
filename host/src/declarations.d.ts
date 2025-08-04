declare module 'providers/Providers' {
  import { ReactNode } from 'react';

  interface ProvidersProps {
    children?: ReactNode;
  }

  const Providers: (props: ProvidersProps) => JSX.Element;
  export default Providers;
}

declare module 'routing/Router' {
  import { ComponentType } from 'react';
  const Router: ComponentType;
  export default Router;
}

