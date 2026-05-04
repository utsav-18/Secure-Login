import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);