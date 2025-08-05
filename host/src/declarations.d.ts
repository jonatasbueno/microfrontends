declare module 'providers/Providers' {
  import { ReactNode } from 'react';

  interface ProvidersProps {
    children?: ReactNode;
  }

  const Providers: (props: ProvidersProps) => JSX.Element;
  
  export default Providers;
}
