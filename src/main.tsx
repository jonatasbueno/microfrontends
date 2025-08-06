import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";
import { systemTheme } from "./styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { store } from "@/store/GlobalStore.ts";
import { HomePage } from "@/pages/HomePage/HomePage";
import { DetailsPage } from "@/pages/DetailsPage";
import { Layout } from "@/components/container/Layout";
import { DashboardPage } from "@/pages/DashboardPage";

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
                <Route path="dashboard" element={<DashboardPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
