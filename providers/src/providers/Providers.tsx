import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import store from 'state/store';
import theme from 'design-system/theme';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <FormProvider {...methods}>{children}</FormProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default Providers;
