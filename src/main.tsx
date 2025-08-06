import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";
import { systemTheme } from "./styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { store } from "@/store/GlobalStore.ts";
import App from "@/App.tsx";
import HomePage from "@/pages/HomePage.tsx";
import DetailsPage from "@/pages/DetailsPage";
import Layout from "@/components/container/Layout";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ChakraProvider value={systemTheme}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="details/:id" element={<DetailsPage />} />
                <Route path="dashboard" element={<App />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
