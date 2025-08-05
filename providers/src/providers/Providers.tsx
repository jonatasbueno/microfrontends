import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';

import store from 'state/Store';
import theme from 'theme/Theme';
import router from 'routing/Router';

const queryClient = new QueryClient();

const Providers = () => {
  const methods = useForm();

  return (
    
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <FormProvider {...methods}>
            <RouterProvider router={router}/>
          </FormProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default Providers;
