import { lazy } from "react";

const OrderEntryTemplate = lazy(() => import("../pages/units/orderEntry"));

const unitsRoutes = {
  path: "units",
  children: [
    {
      path: "order-entry",
      element: <OrderEntryTemplate />,
    },
  ],
};

export default unitsRoutes;
