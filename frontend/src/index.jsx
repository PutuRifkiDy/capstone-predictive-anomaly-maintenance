import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/sonner";

import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider defaultTheme="light" storageKey="theme">
    <Toaster richColors={true} position="top-center" />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
