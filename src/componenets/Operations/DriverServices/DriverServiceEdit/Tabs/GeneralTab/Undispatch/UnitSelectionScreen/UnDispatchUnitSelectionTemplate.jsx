import React from "react";
import UndispatchHeader from "../UndispatchHeader";
import UnitSelectionContent from "./UnitSelectionContent";
import UndispatchSelectionFooter from "./UndispatchSelectionFooter";

const UnDispatchUnitSelectionTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <UndispatchHeader />
        <UnitSelectionContent />
        <UndispatchSelectionFooter />
      </div>
    </div>
  );
};

export default UnDispatchUnitSelectionTemplate;
