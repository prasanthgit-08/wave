import React from "react";
import DriverSelectionContent from "./DriverSelectionContent";
import DriverSelectionFooter from "./DriverSelectionFooter";
import DriverSelectionHeader from "./DriverSelectionHeader";

function DriverSelectionTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DriverSelectionHeader />
        <DriverSelectionContent />
        <DriverSelectionFooter />
      </div>
    </div>
  );
}

export default DriverSelectionTemplate;
