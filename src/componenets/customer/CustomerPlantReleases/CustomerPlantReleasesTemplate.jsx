import React from "react";
import { Outlet } from "react-router-dom";

const CustomerPlantReleasesTemplate = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerPlantReleasesTemplate;
