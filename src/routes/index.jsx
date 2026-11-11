import React, { lazy } from "react";
import PublicRoute from "../layouts/PublicRoute";
import { Navigate, useRoutes } from "react-router-dom";
import unitsRoutes from "./units.routes";
import NotFound from "../componenets/common/NotFound";

const PrivateRoute = lazy(() => import("../layouts/PrivateRoute"));
const HorizonTransport = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/auth/login"));

const routes = [
  {
    path: "/auth",
    element: <PublicRoute />,
    children: [{ path: "login", element: <Login /> }],
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [{ index: true, element: <HorizonTransport /> }, unitsRoutes],
  },
  { path: "*", element: <NotFound /> },
];

export const MainRoutes = () => {
  return useRoutes(routes);
};
