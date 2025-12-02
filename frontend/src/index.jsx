import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/app/Dashboard";

import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Create from "./pages/app/users/Create";
import Update from "./pages/app/users/Update";
import { Toaster } from "./components/ui/sonner";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/users",
    element: <Dashboard />,
  },
  {
    path: "/admin/users/create",
    element: <Create />,
  },
  {
    path: "/admin/users/update",
    element: <Update />,
  },
  {
    path: "/chatbot",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider defaultTheme="light" storageKey="theme">
    <Toaster richColors position="top-center" />
    <RouterProvider router={router} />
  </ThemeProvider>
);
