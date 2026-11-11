import React from "react";
import DriverServiceContent from "./DriverServiceContent";
import DriverServiceFooter from "./DriverServiceFooter";
import DriverServiceHeader from "./DriverServiceHeader";

function DriverServiceTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <DriverServiceHeader />
        <DriverServiceContent />
        <DriverServiceFooter />
      </div>
    </div>
  );
}

export default DriverServiceTemplate;
