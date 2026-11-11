import React from "react";
import DriverReferralsMainPage from "./DriverReferralsMainPage";

function DriverReferralsTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DriverReferralsMainPage />
      </div>
    </div>
  );
}

export default DriverReferralsTemplate;
