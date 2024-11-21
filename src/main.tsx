import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@/globals.css";
import { router } from "./routes.tsx";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
      <HelmetProvider>
        <Helmet titleTemplate="%s | pizza.shop" />
        <Toaster richColors />
        <RouterProvider router={router} />
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>
);
