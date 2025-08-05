import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider value={defaultSystem}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="details" element={<App />} />
          <Route path="dashboard" element={<App />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
