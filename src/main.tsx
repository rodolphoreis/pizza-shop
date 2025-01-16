import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@/globals.css";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query.js";
import { ThemeProvider } from "./components/theme/theme-provider.js";
import { router } from "./routes.js";
import { enableMSW } from "./api/mocks/index.js";

enableMSW().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
        <HelmetProvider>
          <Helmet titleTemplate="%s | pizza.shop" />
          <Toaster richColors />
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </HelmetProvider>
      </ThemeProvider>
    </StrictMode>
  );
});
