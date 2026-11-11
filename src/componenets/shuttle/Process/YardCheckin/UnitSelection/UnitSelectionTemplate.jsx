import React from "react";
import UnitSelectionContent from "./UnitSelectionContent";
import UnitSelectionFooter from "./UnitSelectionFooter";
import UnitSelectionHeader from "./UnitSelectionHeader";

function UnitSelectionTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <UnitSelectionHeader />
        <UnitSelectionContent />
        <UnitSelectionFooter />
      </div>
    </div>
  );
}

export default UnitSelectionTemplate;
